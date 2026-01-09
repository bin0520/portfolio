/**
 * Chat Widget Controller
 * Handles the toggle functionality for the chat widget
 */
(function() {
    'use strict';

    function initChatWidget() {
        const container = document.querySelector('.chat-widget-container');
        const button = document.querySelector('.chat-widget-button');
        const chatWindow = document.querySelector('.chat-widget-window');
        const deepChatElement = document.querySelector('deep-chat');

        if (!container || !button) {
            console.warn('Chat widget elements not found');
            return;
        }

        // Wait for deep-chat to be defined
        function waitForDeepChat(callback, maxAttempts = 50) {
            let attempts = 0;
            function check() {
                attempts++;
                if (customElements.get('deep-chat')) {
                    callback();
                } else if (attempts < maxAttempts) {
                    setTimeout(check, 100);
                } else {
                    console.error('deep-chat custom element not found after waiting');
                    // Show error message to user
                    if (chatWindow) {
                        chatWindow.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;"><p>Chat component failed to load.</p><p>Please check your internet connection and refresh the page.</p></div>';
                    }
                }
            }
            check();
        }

        button.addEventListener('click', function() {
            const isActive = container.classList.toggle('active');

            if (isActive && deepChatElement) {
                // Ensure deep-chat is properly initialized when window opens
                waitForDeepChat(() => {
                    console.log('Deep-chat component loaded');
                    // Check if element is defined
                    if (customElements.get('deep-chat')) {
                        console.log('deep-chat custom element is registered');
                    } else {
                        console.error('deep-chat custom element not found');
                    }
                    // Force re-render if needed
                    if (deepChatElement.shadowRoot) {
                        console.log('Deep-chat shadow root exists');
                    } else {
                        console.warn('Deep-chat shadow root not found yet');
                    }
                });
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && container.classList.contains('active')) {
                container.classList.remove('active');
            }
        });

        // Click outside to close
        document.addEventListener('click', function(e) {
            if (container.classList.contains('active') &&
                !container.contains(e.target) &&
                !chatWindow.contains(e.target)) {
                container.classList.remove('active');
            }
        });
    }

    // Initialize when DOM is ready and deep-chat script is loaded
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Wait a bit for deep-chat script to load
                setTimeout(initChatWidget, 500);
            });
        } else {
            setTimeout(initChatWidget, 500);
        }
    }

    init();
})();
