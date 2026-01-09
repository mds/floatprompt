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
/**
 * Minimal NextURL interface compatible with Next.js
 */
interface NextURL {
    pathname: string;
    origin: string;
    searchParams: URLSearchParams;
    clone(): NextURL;
}
/**
 * Minimal NextRequest interface compatible with Next.js
 */
export interface NextRequest extends Request {
    nextUrl: NextURL;
    headers: Headers;
    ip?: string;
}
/**
 * NextResponse-compatible response type
 */
type NextResponse = Response;
export interface FloatDynamicConfig {
    /**
     * Base URL for the site (used in frontmatter)
     * @default Inferred from request
     */
    baseUrl?: string;
    /**
     * URL path patterns to exclude from .md processing
     * Supports exact paths ('/admin') and prefix patterns ('/api/*')
     * @default ['/api/*', '/_next/*', '/static/*']
     */
    exclude?: string[];
    /**
     * API route path for the float handler
     * Must match where you place the route.ts file
     * @default '/api/float'
     */
    apiRoute?: string;
    /**
     * Cache-Control header value for markdown responses
     * @default 'public, s-maxage=3600, stale-while-revalidate=86400'
     */
    cacheControl?: string;
    /**
     * Content-Type header for markdown responses
     * Use 'text/plain' for broader client compatibility
     * @default 'text/markdown; charset=utf-8'
     */
    contentType?: string;
    /**
     * Include JSON-LD schema in markdown frontmatter
     * @default true
     */
    includeSchema?: boolean;
    /**
     * Custom fetch function for retrieving HTML
     * Use this to handle authentication, custom headers, or non-HTTP sources
     * @default Internal fetch with cookie forwarding
     */
    fetchHtml?: (url: string, request: NextRequest) => Promise<string | null>;
}
/**
 * Create middleware that intercepts *.md requests
 *
 * Rewrites /page.md → /api/float?path=/page
 */
export declare function createFloatMiddleware(config?: FloatDynamicConfig): (request: NextRequest) => NextResponse;
/**
 * Pre-configured middleware with sensible defaults
 * Use createFloatMiddleware() if you need custom configuration
 */
export declare const floatMiddleware: (request: NextRequest) => NextResponse;
/**
 * Create API route handler that extracts and returns markdown
 *
 * Fetches the HTML page, runs extraction, returns markdown.
 */
export declare function createFloatHandler(config?: FloatDynamicConfig): (request: NextRequest) => Promise<Response>;
/**
 * Pre-configured handler with sensible defaults
 * Use createFloatHandler() if you need custom configuration
 */
export declare const floatHandler: (request: NextRequest) => Promise<Response>;
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
export declare function composeWithFloat(userMiddleware: (request: NextRequest) => NextResponse | Response | Promise<NextResponse | Response>, config?: FloatDynamicConfig): (request: NextRequest) => Promise<NextResponse | Response>;
export type { ExtractOptions, ExtractResult } from '../types.js';
//# sourceMappingURL=next-dynamic.d.ts.map