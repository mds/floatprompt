import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * FloatPrompt React Component
 *
 * A React component for the FloatPrompt copy button.
 */
import * as React from 'react';
import { copyPageMarkdown, viewPageMarkdown } from './core.js';
const styles = {
    container: {
        position: 'fixed',
        zIndex: 9999,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSize: 14,
    },
    'bottom-right': { bottom: 20, right: 20 },
    'bottom-left': { bottom: 20, left: 20 },
    'top-right': { top: 20, right: 20 },
    'top-left': { top: 20, left: 20 },
    trigger: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 12px',
        background: '#1a1a1a',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        transition: 'background 0.15s, transform 0.15s',
    },
    triggerCopied: {
        background: '#22c55e',
    },
    triggerError: {
        background: '#ef4444',
    },
    icon: {
        width: 16,
        height: 16,
    },
    dropdown: {
        position: 'absolute',
        bottom: '100%',
        right: 0,
        marginBottom: 8,
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },
    dropdownItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '10px 14px',
        background: 'none',
        border: 'none',
        color: '#1a1a1a',
        fontSize: 14,
        textAlign: 'left',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
};
function CopyIcon({ style }) {
    return (_jsxs("svg", { style: { ...styles.icon, ...style }, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }), _jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })] }));
}
function CheckIcon({ style }) {
    return (_jsx("svg", { style: { ...styles.icon, ...style }, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polyline", { points: "20 6 9 17 4 12" }) }));
}
function ViewIcon({ style }) {
    return (_jsxs("svg", { style: { ...styles.icon, ...style }, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }), _jsx("polyline", { points: "15 3 21 3 21 9" }), _jsx("line", { x1: "10", y1: "14", x2: "21", y2: "3" })] }));
}
/**
 * FloatPrompt copy button component
 */
export function FloatButton({ position = 'bottom-right', label = 'Copy as MD', showView = true, className, }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [copyState, setCopyState] = React.useState('idle');
    const handleCopy = React.useCallback(async () => {
        setIsOpen(false);
        const success = await copyPageMarkdown();
        setCopyState(success ? 'copied' : 'error');
        setTimeout(() => {
            setCopyState('idle');
        }, 2000);
    }, []);
    const handleView = React.useCallback(() => {
        setIsOpen(false);
        viewPageMarkdown();
    }, []);
    // Close dropdown when clicking outside
    React.useEffect(() => {
        if (!isOpen)
            return;
        const handleClick = () => setIsOpen(false);
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [isOpen]);
    const containerStyle = {
        ...styles.container,
        ...styles[position],
    };
    const triggerStyle = {
        ...styles.trigger,
        ...(copyState === 'copied' ? styles.triggerCopied : {}),
        ...(copyState === 'error' ? styles.triggerError : {}),
    };
    const buttonLabel = copyState === 'copied' ? 'Copied!' : copyState === 'error' ? 'Error' : label;
    const ButtonIcon = copyState === 'copied' ? CheckIcon : CopyIcon;
    if (showView) {
        return (_jsxs("div", { style: containerStyle, className: className, children: [isOpen && (_jsxs("div", { style: styles.dropdown, children: [_jsxs("button", { style: styles.dropdownItem, onClick: handleCopy, onMouseEnter: (e) => (e.currentTarget.style.background = '#f5f5f5'), onMouseLeave: (e) => (e.currentTarget.style.background = 'none'), children: [_jsx(CopyIcon, {}), _jsx("span", { children: "Copy as Markdown" })] }), _jsxs("button", { style: { ...styles.dropdownItem, borderTop: '1px solid #e5e5e5' }, onClick: handleView, onMouseEnter: (e) => (e.currentTarget.style.background = '#f5f5f5'), onMouseLeave: (e) => (e.currentTarget.style.background = 'none'), children: [_jsx(ViewIcon, {}), _jsx("span", { children: "View as Markdown" })] })] })), _jsxs("button", { style: triggerStyle, onClick: (e) => {
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }, onMouseEnter: (e) => (e.currentTarget.style.background = copyState === 'idle' ? '#333' : triggerStyle.background), onMouseLeave: (e) => (e.currentTarget.style.background = triggerStyle.background), children: [_jsx(ButtonIcon, {}), _jsx("span", { children: buttonLabel })] })] }));
    }
    return (_jsx("div", { style: containerStyle, className: className, children: _jsxs("button", { style: triggerStyle, onClick: handleCopy, onMouseEnter: (e) => (e.currentTarget.style.background = copyState === 'idle' ? '#333' : triggerStyle.background), onMouseLeave: (e) => (e.currentTarget.style.background = triggerStyle.background), children: [_jsx(ButtonIcon, {}), _jsx("span", { children: buttonLabel })] }) }));
}
export default FloatButton;
//# sourceMappingURL=react.js.map