/**
 * Component Loader Utility
 * Dynamically loads HTML components into the page
 */
(function() {
    'use strict';

    /**
     * Loads an HTML component and inserts it into the target element
     * @param {string} componentPath - Path to the component HTML file
     * @param {string} targetSelector - CSS selector for the target element
     * @param {string} insertMethod - 'replace' (default) or 'append'
     */
    async function loadComponent(componentPath, targetSelector, insertMethod = 'replace') {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }
            const html = await response.text();

            // Handle special cases for head and body tags
            let targetElement;
            if (targetSelector === 'head') {
                targetElement = document.head;
            } else if (targetSelector === 'body') {
                targetElement = document.body;
            } else {
                targetElement = document.querySelector(targetSelector);
            }

            if (!targetElement) {
                console.warn(`Target element not found: ${targetSelector}`);
                return;
            }

            if (insertMethod === 'append') {
                targetElement.insertAdjacentHTML('beforeend', html);
            } else {
                targetElement.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    /**
     * Loads multiple components in parallel
     * @param {Array} components - Array of {path, target, method} objects
     */
    async function loadComponents(components) {
        const promises = components.map(comp =>
            loadComponent(comp.path, comp.target, comp.method || 'replace')
        );
        await Promise.all(promises);
    }

    // Export to window for global access
    window.ComponentLoader = {
        load: loadComponent,
        loadMultiple: loadComponents
    };
})();

