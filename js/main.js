// SW INIT BEGIN
if ('serviceWorker' in navigator) {
    console.log("SW supported");
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register('./sw_cache_pages.js', {scope: './'}).then(function (registration) {
        console.log('Service worker registration succeeded:', registration);
    }, /*catch*/ function (error) {
        console.log('Service worker registration failed:', error);
    });
} else {
    console.log('Service workers are not supported.');
}
// SW INIT ENDED