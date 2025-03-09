// This script gets loaded after React has rendered the components
(function($) {
    // Safely initialize jQuery plugins
    function initializeJQueryPlugins() {
        try {
            // Only proceed if elements exist in the DOM
            if ($("h1.responsive-headline").length > 0) {
                $("h1.responsive-headline").fitText(1, {
                    minFontSize: "40px",
                    maxFontSize: "90px",
                });
            }

            // Initialize flexslider if it exists
            if ($(".flexslider").length > 0 && typeof $.fn.flexslider === 'function') {
                $(".flexslider").flexslider({
                    namespace: "flex-",
                    controlsContainer: ".flex-container",
                    animation: "slide",
                    controlNav: true,
                    directionNav: false,
                    smoothHeight: false,
                    slideshowSpeed: 7000,
                    animationSpeed: 300,
                    randomize: false,
                    pauseOnHover: true,
                });
            }

            console.log("jQuery plugins initialized successfully");
        } catch (error) {
            console.error("Error initializing jQuery plugins:", error);
        }
    }

    // Wait for React to render before initializing jQuery plugins
    document.addEventListener('DOMContentLoaded', function() {
        // Check if React has finished rendering
        const reactInterval = setInterval(() => {
            if (document.querySelector('.react-component-loaded')) {
                clearInterval(reactInterval);
                
                // Initialize jQuery plugins now
                initializeJQueryPlugins();
            }
        }, 100);
    });
})(jQuery); 