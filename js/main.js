// SW INIT BEGIN
if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the
    navigator.serviceWorker.register('../sw.js').then(function (registration) {
        console.log('Service worker registration succeeded:', registration);
    }, /*catch*/ function (error) {
        console.log('Service worker registration failed:', error);
    });
} else {
    console.log('Service workers are not supported.');
}
// SW INIT ENDED