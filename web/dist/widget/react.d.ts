/**
 * FloatPrompt React Component
 *
 * A React component for the FloatPrompt copy button.
 */
export interface FloatButtonProps {
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
 * FloatPrompt copy button component
 */
export declare function FloatButton({ position, label, showView, className, }: FloatButtonProps): import("react/jsx-runtime").JSX.Element;
export default FloatButton;
//# sourceMappingURL=react.d.ts.map