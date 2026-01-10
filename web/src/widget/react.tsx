/**
 * FloatPrompt React Component
 *
 * A React component for the FloatPrompt copy button.
 */

import * as React from 'react';
import { copyPageMarkdown, viewPageMarkdown } from './core.js';

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

const styles: Record<string, React.CSSProperties> = {
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
    textAlign: 'left' as const,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
};

function CopyIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={{ ...styles.icon, ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={{ ...styles.icon, ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ViewIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={{ ...styles.icon, ...style }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

type CopyState = 'idle' | 'copied' | 'error';

/**
 * FloatPrompt copy button component
 */
export function FloatButton({
  position = 'bottom-right',
  label = 'Copy as MD',
  showView = true,
  className,
}: FloatButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copyState, setCopyState] = React.useState<CopyState>('idle');

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
    if (!isOpen) return;

    const handleClick = () => setIsOpen(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  const containerStyle: React.CSSProperties = {
    ...styles.container,
    ...styles[position],
  };

  const triggerStyle: React.CSSProperties = {
    ...styles.trigger,
    ...(copyState === 'copied' ? styles.triggerCopied : {}),
    ...(copyState === 'error' ? styles.triggerError : {}),
  };

  const buttonLabel = copyState === 'copied' ? 'Copied!' : copyState === 'error' ? 'Error' : label;
  const ButtonIcon = copyState === 'copied' ? CheckIcon : CopyIcon;

  if (showView) {
    return (
      <div style={containerStyle} className={className}>
        {isOpen && (
          <div style={styles.dropdown}>
            <button
              style={styles.dropdownItem}
              onClick={handleCopy}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <CopyIcon />
              <span>Copy as Markdown</span>
            </button>
            <button
              style={{ ...styles.dropdownItem, borderTop: '1px solid #e5e5e5' }}
              onClick={handleView}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <ViewIcon />
              <span>View as Markdown</span>
            </button>
          </div>
        )}
        <button
          style={triggerStyle}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = copyState === 'idle' ? '#333' : triggerStyle.background as string)}
          onMouseLeave={(e) => (e.currentTarget.style.background = triggerStyle.background as string)}
        >
          <ButtonIcon />
          <span>{buttonLabel}</span>
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle} className={className}>
      <button
        style={triggerStyle}
        onClick={handleCopy}
        onMouseEnter={(e) => (e.currentTarget.style.background = copyState === 'idle' ? '#333' : triggerStyle.background as string)}
        onMouseLeave={(e) => (e.currentTarget.style.background = triggerStyle.background as string)}
      >
        <ButtonIcon />
        <span>{buttonLabel}</span>
      </button>
    </div>
  );
}

export default FloatButton;
