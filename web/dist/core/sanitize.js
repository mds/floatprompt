/**
 * HTML Sanitization using DOMPurify
 *
 * Removes XSS vectors, malicious scripts, and dangerous content
 * before passing to Readability.
 */
import DOMPurify from 'dompurify';
import { parseHTML } from 'linkedom';
/**
 * Sanitize HTML to remove XSS vectors and malicious content
 */
export function sanitize(html) {
    // Create a DOM environment for DOMPurify
    const dom = parseHTML('<!DOCTYPE html><html><body></body></html>');
    // Create DOMPurify instance with the linkedom window
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const purify = DOMPurify(dom);
    // Configure DOMPurify to be strict but preserve content structure
    const clean = purify.sanitize(html, {
        // Remove dangerous elements
        FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form'],
        // Remove dangerous attributes
        FORBID_ATTR: ['onclick', 'onerror', 'onload', 'onmouseover', 'onfocus', 'onblur'],
        // Keep structure elements
        ALLOWED_TAGS: [
            'html', 'head', 'body', 'title', 'meta', 'link',
            'article', 'section', 'nav', 'aside', 'header', 'footer', 'main',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'div', 'span', 'br', 'hr',
            'ul', 'ol', 'li', 'dl', 'dt', 'dd',
            'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
            'a', 'img', 'figure', 'figcaption',
            'strong', 'em', 'b', 'i', 'u', 's', 'del', 'ins', 'mark',
            'code', 'pre', 'blockquote', 'q', 'cite',
            'abbr', 'time', 'address',
            'picture', 'source', 'video', 'audio',
        ],
        // Keep safe attributes
        ALLOWED_ATTR: [
            'href', 'src', 'alt', 'title', 'class', 'id', 'name',
            'width', 'height', 'rel', 'target', 'type',
            'datetime', 'cite', 'lang', 'dir',
            'colspan', 'rowspan', 'headers', 'scope',
            'srcset', 'sizes', 'media', 'loading', 'decoding',
            'content', 'property', 'charset', 'http-equiv',
        ],
        // Return full document
        WHOLE_DOCUMENT: true,
        // Preserve href values
        ALLOW_DATA_ATTR: false,
    });
    return clean;
}
//# sourceMappingURL=sanitize.js.map