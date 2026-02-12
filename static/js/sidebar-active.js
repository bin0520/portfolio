/**
 * Sidebar Component Loader and Active State Handler
 * Loads the sidebar component and automatically sets the active state based on the current page
 */
(function() {
    'use strict';

    async function loadSidebar() {
        const sidebarPlaceholder = document.querySelector('#sidebar-placeholder');
        if (!sidebarPlaceholder) {
            console.warn('Sidebar placeholder not found');
            return;
        }

        // Calculate correct path based on current location
        // All HTML files are in root, so path should be relative to root
        const currentPath = window.location.pathname;
        const isRoot = currentPath === '/' || currentPath.endsWith('/index.html') || currentPath.split('/').filter(p => p && p.endsWith('.html')).length <= 1;

        // Try multiple path options (relative to current page location)
        const paths = [
            'components/sidebar.html',           // Same directory (root)
            './components/sidebar.html',         // Explicit same directory
            '../components/sidebar.html',        // Parent directory (if in subdirectory)
            '/components/sidebar.html'           // Absolute from root
        ];

        let loaded = false;
        for (const path of paths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    const html = await response.text();
                    if (html && html.trim().length > 0) {
                        sidebarPlaceholder.outerHTML = html;
                        loaded = true;

                        // After loading, set the active state
                        // Use setTimeout to ensure DOM is updated
                        setTimeout(setActiveNavItem, 50);
                        break;
                    }
                }
            } catch (error) {
                // Try next path
                continue;
            }
        }

        if (!loaded) {
            console.error('Failed to load sidebar component from all attempted paths:', paths);
            // Keep placeholder visible so user knows something should be there
        }
    }

    function setActiveNavItem() {
        // Get the current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageName = currentPage.replace('.html', '').toLowerCase();

        // Map page names to data-page attributes
        const pageMap = {
            'index': 'index',
            'portfolio': 'portfolio',
            'portfolio-1': 'portfolio',
            'portfolio-2': 'portfolio',
            'portfolio-3': 'portfolio',
            'portfolio-4': 'portfolio',
            'brand-portal': 'portfolio',
            'bioby': 'portfolio',
            'social-growth': 'portfolio',
            'resume': 'resume',
            'contact': 'contact',
            'blog': 'blog',
            'plotjoys-gtm': 'portfolio',
            'little-witch': 'portfolio',
            'media-lab': 'portfolio'
        };

        // Get the page identifier for the current page
        const activePage = pageMap[pageName] || 'index';

        // Find all nav links (try both selectors)
        const navLinks = document.querySelectorAll('#sidebar-nav .nav-link, .navbar-nav-menu .nav-link');

        // Remove active class from all parent li elements
        navLinks.forEach(link => {
            const li = link.closest('li');
            if (li) {
                li.classList.remove('active');
            }
        });

        // Add active class to the matching nav item
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page') || link.getAttribute('href');
            if (linkPage) {
                // Check if this link matches the current page
                const linkPageName = linkPage.replace('.html', '').toLowerCase();
                const linkPageId = pageMap[linkPageName] || linkPageName;

                if (linkPageId === activePage ||
                    (activePage === 'portfolio' && linkPageId === 'portfolio') ||
                    (linkPage === 'index.html' && activePage === 'index') ||
                    (linkPage.includes(activePage) && activePage !== 'index')) {
                    const li = link.closest('li');
                    if (li) {
                        li.classList.add('active');
                    }
                }
            }
        });
    }

    // Run when DOM is ready - use multiple strategies to ensure it loads
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadSidebar);
        } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
            // DOM is already ready
            loadSidebar();
        } else {
            // Fallback
            window.addEventListener('load', loadSidebar);
            loadSidebar();
        }
    }

    // Start immediately
    init();

    // Also try after a short delay as fallback
    setTimeout(loadSidebar, 100);
})();

