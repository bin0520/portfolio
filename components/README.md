# Components Directory

This directory contains reusable HTML components for the portfolio website.

## Structure

- `head.html` - Meta tags, CSS links, and page title
- `analytics.html` - Google Analytics tracking code
- `photoswipe-modal.html` - PhotoSwipe modal component
- `navigation.html` - Sidebar navigation component
- `footer-section.html` - Footer section with links and copyright
- `footer.html` - Back to top button and settings toggle
- `experience-section.html` - Resume experience section (job history)
- `projects-section.html` - Resume projects section
- `scripts.html` - JavaScript library includes

## Usage

Components are loaded dynamically using the `component-loader.js` utility.

**Note:** For the component loader to work, the site must be served via HTTP (not file:// protocol). Use a local server like:
- Python: `python -m http.server 8000`
- Node.js: `npx http-server`
- VS Code: Live Server extension

## Loading Components

Components are loaded in `index.html` using:

```javascript
ComponentLoader.load('components/head.html', 'head', 'append');
```

