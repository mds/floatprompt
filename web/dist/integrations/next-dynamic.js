/**
 * FloatPrompt Dynamic Mode for Next.js
 *
 * Enables [url].md pattern for server-rendered Next.js sites.
 * Unlike the build-time integration (floatprompt/next), this works
 * with SSR sites that can't use static export.
 *
 * @example
 * ```typescript
 * // middleware.ts
 * import { floatMiddleware } from 'floatprompt/next-dynamic'
 * export const middleware = floatMiddleware
 * export const config = { matcher: ['/((?!_next|api).*)'] }
 *
 * // app/api/float/route.ts
 * import { floatHandler } from 'floatprompt/next-dynamic'
 * export const GET = floatHandler
 * ```
 */
// Import directly from pipeline to avoid Node.js imports in index.js
// This keeps the module Edge runtime compatible
import { processPipeline } from '../core/pipeline.js';
// ---------------------------------------------------------------------------
// NextResponse Helpers
// ---------------------------------------------------------------------------
// These replicate Next.js middleware response behavior without importing Next.js.
// Next.js middleware uses specific headers to control request flow.
/**
 * Create a "next" response that continues to the next middleware/route
 * Equivalent to NextResponse.next()
 */
function middlewareNext() {
    return new Response(null, {
        headers: {
            'x-middleware-next': '1',
        },
    });
}
/**
 * Create a rewrite response that internally rewrites to a different URL
 * Equivalent to NextResponse.rewrite(url)
 */
function middlewareRewrite(url) {
    const rewriteUrl = typeof url === 'string' ? url : url.toString();
    return new Response(null, {
        headers: {
            'x-middleware-rewrite': rewriteUrl,
        },
    });
}
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
/**
 * Check if a path matches an exclusion pattern
 * Supports exact match ('/admin') and prefix match ('/api/*')
 */
function isExcluded(pathname, patterns) {
    for (const pattern of patterns) {
        if (pattern.endsWith('/*')) {
            // Prefix match: '/api/*' matches '/api/anything'
            const prefix = pattern.slice(0, -1); // Remove '*', keep '/'
            if (pathname.startsWith(prefix))
                return true;
        }
        else {
            // Exact match or prefix without wildcard
            if (pathname === pattern || pathname.startsWith(pattern + '/'))
                return true;
        }
    }
    return false;
}
/**
 * Normalize a .md path to its HTML equivalent
 * - /about.md → /about
 * - /index.md → /
 * - /.md → /
 * - /blog/post.md → /blog/post
 * - /about/.md → /about
 */
function mdPathToHtmlPath(pathname) {
    // Remove .md extension
    let htmlPath = pathname.slice(0, -3);
    // Handle edge cases
    if (htmlPath === '' || htmlPath === '/index' || htmlPath === '/.') {
        return '/';
    }
    // Handle trailing slash before .md: /about/.md → /about
    if (htmlPath.endsWith('/.')) {
        htmlPath = htmlPath.slice(0, -2);
    }
    // Handle /index at end of path: /blog/index → /blog
    if (htmlPath.endsWith('/index')) {
        htmlPath = htmlPath.slice(0, -6) || '/';
    }
    return htmlPath;
}
// ---------------------------------------------------------------------------
// Internal Request Headers
// ---------------------------------------------------------------------------
const INTERNAL_HEADER = 'x-floatprompt-internal';
const PATH_HEADER = 'x-floatprompt-path';
// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
/**
 * Create middleware that intercepts *.md requests
 *
 * Rewrites /page.md → /api/float?path=/page
 */
export function createFloatMiddleware(config = {}) {
    const excludePatterns = config.exclude ?? ['/api/*', '/_next/*', '/static/*', '/favicon.ico'];
    const apiRoute = config.apiRoute ?? '/api/float';
    return function floatMiddleware(request) {
        const { pathname } = request.nextUrl;
        // Skip internal requests (prevents infinite loops)
        if (request.headers.get(INTERNAL_HEADER) === '1') {
            return middlewareNext();
        }
        // Skip excluded paths
        if (isExcluded(pathname, excludePatterns)) {
            return middlewareNext();
        }
        // Intercept .md requests
        if (pathname.endsWith('.md')) {
            const htmlPath = mdPathToHtmlPath(pathname);
            // Rewrite to API route (configurable path)
            const url = request.nextUrl.clone();
            url.pathname = apiRoute;
            // Note: Don't rely on searchParams for path - Next.js preserves original URL in rewrites
            // Instead, pass path via header which survives the rewrite
            url.searchParams.set('path', htmlPath); // Keep for backwards compat with direct API calls
            // Create rewrite response, then set path header
            // Next.js forwards headers set on rewrite responses to the internal request
            const response = middlewareRewrite(url);
            response.headers.set(PATH_HEADER, htmlPath);
            return response;
        }
        return middlewareNext();
    };
}
/**
 * Pre-configured middleware with sensible defaults
 * Use createFloatMiddleware() if you need custom configuration
 */
export const floatMiddleware = createFloatMiddleware();
// ---------------------------------------------------------------------------
// API Route Handler
// ---------------------------------------------------------------------------
/**
 * Check if HTML has noindex robots meta tag
 */
function hasNoIndexMeta(html) {
    // Check for <meta name="robots" content="noindex">
    const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
    if (robotsMatch && robotsMatch[1].toLowerCase().includes('noindex')) {
        return true;
    }
    // Also check reverse attribute order
    const robotsMatchAlt = html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["']/i);
    if (robotsMatchAlt && robotsMatchAlt[1].toLowerCase().includes('noindex')) {
        return true;
    }
    return false;
}
/**
 * Default HTML fetcher that forwards cookies and handles internal requests
 */
async function defaultFetchHtml(url, request) {
    try {
        const response = await fetch(url, {
            headers: {
                // Forward cookies for authenticated pages
                'Cookie': request.headers.get('cookie') || '',
                // Forward user agent
                'User-Agent': request.headers.get('user-agent') || 'FloatPrompt/1.0',
                'Accept': 'text/html',
                // Mark as internal to prevent middleware loops
                [INTERNAL_HEADER]: '1',
            },
            // Don't follow redirects automatically - let us handle them
            redirect: 'manual',
        });
        // Handle redirects
        if (response.status >= 300 && response.status < 400) {
            const location = response.headers.get('location');
            if (location) {
                // Could recursively fetch, but for safety just return null
                // User should request the canonical .md URL
                return null;
            }
        }
        if (!response.ok) {
            return null;
        }
        const html = await response.text();
        // Respect noindex meta tag — don't expose pages marked as noindex
        if (hasNoIndexMeta(html)) {
            return null;
        }
        return html;
    }
    catch {
        return null;
    }
}
/**
 * Create API route handler that extracts and returns markdown
 *
 * Fetches the HTML page, runs extraction, returns markdown.
 */
export function createFloatHandler(config = {}) {
    const { cacheControl = 'public, s-maxage=3600, stale-while-revalidate=86400', contentType = 'text/markdown; charset=utf-8', includeSchema = true, fetchHtml = defaultFetchHtml, } = config;
    return async function floatHandler(request) {
        // Read path from header (set by middleware rewrite) or query param (direct API call)
        // Headers survive Next.js rewrites, query params on rewrite URL do not
        const path = request.headers.get(PATH_HEADER)
            ?? request.nextUrl?.searchParams.get('path')
            ?? new URL(request.url).searchParams.get('path');
        if (!path) {
            return new Response('Missing path parameter', {
                status: 400,
                headers: { 'Content-Type': 'text/plain' },
            });
        }
        // Determine origin for fetching
        // In production, use configured baseUrl or request origin
        // On Vercel, request.nextUrl.origin works correctly
        const origin = config.baseUrl || request.nextUrl.origin;
        const htmlUrl = new URL(path, origin).toString();
        try {
            // Fetch HTML
            const html = await fetchHtml(htmlUrl, request);
            if (!html) {
                return new Response(`Page not found: ${path}`, {
                    status: 404,
                    headers: { 'Content-Type': 'text/plain' },
                });
            }
            // Extract markdown using core pipeline (Edge-compatible)
            const result = processPipeline(html, {
                url: path,
                baseUrl: origin,
                includeSchema,
            });
            if (!result || !result.markdown) {
                return new Response(`Could not extract content from: ${path}`, {
                    status: 422,
                    headers: { 'Content-Type': 'text/plain' },
                });
            }
            // Return markdown
            return new Response(result.markdown, {
                status: 200,
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': cacheControl,
                    // Include metadata in headers for programmatic access
                    'X-FloatPrompt-Title': encodeURIComponent(result.title || ''),
                    'X-FloatPrompt-Source': encodeURIComponent(path),
                },
            });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            console.error(`FloatPrompt extraction failed for ${path}:`, message);
            return new Response(`Extraction failed: ${message}`, {
                status: 500,
                headers: { 'Content-Type': 'text/plain' },
            });
        }
    };
}
/**
 * Pre-configured handler with sensible defaults
 * Use createFloatHandler() if you need custom configuration
 */
export const floatHandler = createFloatHandler();
// ---------------------------------------------------------------------------
// Middleware Composition Helper
// ---------------------------------------------------------------------------
/**
 * Compose FloatPrompt middleware with your existing middleware
 *
 * @example
 * ```typescript
 * import { composeWithFloat } from 'floatprompt/next-dynamic'
 *
 * function myMiddleware(request: NextRequest) {
 *   // Your existing logic
 *   return NextResponse.next()
 * }
 *
 * export const middleware = composeWithFloat(myMiddleware)
 * ```
 */
export function composeWithFloat(userMiddleware, config = {}) {
    const floatMw = createFloatMiddleware(config);
    return async function composedMiddleware(request) {
        // Check for .md requests first
        const { pathname } = request.nextUrl;
        if (pathname.endsWith('.md') && !request.headers.get(INTERNAL_HEADER)) {
            const floatResult = floatMw(request);
            // If float middleware rewrote the request, use that
            if (floatResult.headers.get('x-middleware-rewrite')) {
                return floatResult;
            }
        }
        // Otherwise, run user middleware
        return userMiddleware(request);
    };
}
//# sourceMappingURL=next-dynamic.js.map