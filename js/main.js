if('serviceWorker' in navigator) {
    console.log("SW supported");
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/sw_cache_pages.js').then( reg => {
            console.log("SW Registered")
        }).catch(e => {
            console.error(e);
        })
    })
}