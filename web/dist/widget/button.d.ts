/**
 * FloatPrompt Widget Button
 *
 * A pre-built floating button for copying page markdown.
 * Works with vanilla JavaScript - no framework required.
 */
export interface FloatButtonOptions {
    /** Button position */
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Button label */
    label?: string;
    /** Show "View as Markdown" option */
    showView?: boolean;
    /** Custom CSS class */
    className?: string;
}
/**
 * Mount the FloatPrompt button to the page
 */
export declare function mount(options?: FloatButtonOptions): void;
/**
 * Unmount the FloatPrompt button
 */
export declare function unmount(): void;
//# sourceMappingURL=button.d.ts.map