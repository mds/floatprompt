/**
 * FloatPrompt Widget Button
 *
 * A pre-built floating button for copying page markdown.
 * Works with vanilla JavaScript - no framework required.
 */
import { copyPageMarkdown, viewPageMarkdown } from './core.js';
const DEFAULT_OPTIONS = {
    position: 'bottom-right',
    label: 'Copy as MD',
    showView: true,
};
const STYLES = `
.floatprompt-button {
  position: fixed;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 14px;
}

.floatprompt-button.bottom-right {
  bottom: 20px;
  right: 20px;
}

.floatprompt-button.bottom-left {
  bottom: 20px;
  left: 20px;
}

.floatprompt-button.top-right {
  top: 20px;
  right: 20px;
}

.floatprompt-button.top-left {
  top: 20px;
  left: 20px;
}

.floatprompt-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: background 0.15s, transform 0.15s;
}

.floatprompt-trigger:hover {
  background: #333;
  transform: translateY(-1px);
}

.floatprompt-trigger:active {
  transform: translateY(0);
}

.floatprompt-trigger.copied {
  background: #22c55e;
}

.floatprompt-trigger.error {
  background: #ef4444;
}

.floatprompt-icon {
  width: 16px;
  height: 16px;
}

.floatprompt-dropdown {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: opacity 0.15s, transform 0.15s, visibility 0.15s;
}

.floatprompt-button.open .floatprompt-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.floatprompt-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  background: none;
  border: none;
  color: #1a1a1a;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
}

.floatprompt-dropdown-item:hover {
  background: #f5f5f5;
}

.floatprompt-dropdown-item + .floatprompt-dropdown-item {
  border-top: 1px solid #e5e5e5;
}
`;
/**
 * Create an SVG icon element
 */
function createIcon(type) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'floatprompt-icon');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    if (type === 'copy') {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '9');
        rect.setAttribute('y', '9');
        rect.setAttribute('width', '13');
        rect.setAttribute('height', '13');
        rect.setAttribute('rx', '2');
        rect.setAttribute('ry', '2');
        svg.appendChild(rect);
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1');
        svg.appendChild(path);
    }
    else if (type === 'check') {
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '20 6 9 17 4 12');
        svg.appendChild(polyline);
    }
    else if (type === 'view') {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6');
        svg.appendChild(path);
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '15 3 21 3 21 9');
        svg.appendChild(polyline);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '10');
        line.setAttribute('y1', '14');
        line.setAttribute('x2', '21');
        line.setAttribute('y2', '3');
        svg.appendChild(line);
    }
    return svg;
}
/**
 * Create a button with icon and label
 */
function createButtonContent(iconType, label) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createIcon(iconType));
    const span = document.createElement('span');
    span.textContent = label;
    fragment.appendChild(span);
    return fragment;
}
let stylesInjected = false;
let buttonElement = null;
function injectStyles() {
    if (stylesInjected)
        return;
    const style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);
    stylesInjected = true;
}
/**
 * Mount the FloatPrompt button to the page
 */
export function mount(options = {}) {
    // Don't mount twice
    if (buttonElement) {
        console.warn('FloatPrompt: Button already mounted');
        return;
    }
    const opts = { ...DEFAULT_OPTIONS, ...options };
    injectStyles();
    // Create container
    const container = document.createElement('div');
    container.className = `floatprompt-button ${opts.position} ${opts.className || ''}`.trim();
    // Create trigger button
    const trigger = document.createElement('button');
    trigger.className = 'floatprompt-trigger';
    trigger.appendChild(createButtonContent('copy', opts.label || 'Copy as MD'));
    if (opts.showView) {
        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'floatprompt-dropdown';
        const copyItem = document.createElement('button');
        copyItem.className = 'floatprompt-dropdown-item';
        copyItem.appendChild(createButtonContent('copy', 'Copy as Markdown'));
        const viewItem = document.createElement('button');
        viewItem.className = 'floatprompt-dropdown-item';
        viewItem.appendChild(createButtonContent('view', 'View as Markdown'));
        dropdown.appendChild(copyItem);
        dropdown.appendChild(viewItem);
        container.appendChild(dropdown);
        // Toggle dropdown on trigger click
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            container.classList.toggle('open');
        });
        // Copy action
        copyItem.addEventListener('click', async () => {
            container.classList.remove('open');
            const success = await copyPageMarkdown();
            showFeedback(trigger, success, opts.label || 'Copy as MD');
        });
        // View action
        viewItem.addEventListener('click', () => {
            container.classList.remove('open');
            viewPageMarkdown();
        });
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            container.classList.remove('open');
        });
    }
    else {
        // Simple copy on click (no dropdown)
        trigger.addEventListener('click', async () => {
            const success = await copyPageMarkdown();
            showFeedback(trigger, success, opts.label || 'Copy as MD');
        });
    }
    container.appendChild(trigger);
    document.body.appendChild(container);
    buttonElement = container;
}
/**
 * Unmount the FloatPrompt button
 */
export function unmount() {
    if (buttonElement) {
        buttonElement.remove();
        buttonElement = null;
    }
}
/**
 * Show copy feedback on the button
 */
function showFeedback(trigger, success, originalLabel) {
    // Clear existing content
    trigger.textContent = '';
    if (success) {
        trigger.classList.add('copied');
        trigger.appendChild(createButtonContent('check', 'Copied!'));
    }
    else {
        trigger.classList.add('error');
        trigger.appendChild(createButtonContent('copy', 'Error'));
    }
    setTimeout(() => {
        trigger.classList.remove('copied', 'error');
        trigger.textContent = '';
        trigger.appendChild(createButtonContent('copy', originalLabel));
    }, 2000);
}
//# sourceMappingURL=button.js.map