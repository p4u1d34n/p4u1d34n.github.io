const staticCacheName = 'static-v2';
const dynamicCacheName = 'dynamic-v1';

const cacheNames = [
    staticCacheName,
    dynamicCacheName
];

const staticAssets = [
    'index.html',
    '/css/styles.css',
    '/js/main.js'
];

const failoverResources = [
    ['.png', '/static/images/placeholder.png'],
    ['.jpg', '/static/images/placeholder.jpg'],
    ['.html', 'faiover.html']
]

const clearCaches = (event) => {
    caches.keys().then(cacheNameKeys => {
        console.log("SW cacheNameKeys", cacheNameKeys)
        return Promise.all(
            cacheNameKeys.map(cacheName => {
                console.log("SW cacheName", cacheName)
                console.log("SW includes?", cacheNames.indexOf(cacheName))
                if (cacheNames.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
            })
        )
    })
}

self.addEventListener('install', (e) => {
    console.log("SW installed")

    e.waitUntil(
        caches.open(staticCacheName).then(static => {
            failoverResources.forEach((key) => {
                staticAssets.push(key[1]);
            });
            console.log('staticAssets', staticAssets);
            static.addAll(staticAssets);
        }).then(() => {
            self.skipWaiting();
        })
    )
})

self.addEventListener('activate', e => {
    console.log("SW activated")
    e.waitUntil(
        caches.keys().then(cacheNameKeys => {
            console.log("SW cacheNameKeys", cacheNameKeys)
            return Promise.all(
                cacheNameKeys.map(cacheName => {
                    console.log("SW cacheName", cacheName)
                    console.log("SW includes?", cacheNames.indexOf(cacheName))
                    if (cacheNames.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', (e) => {
    console.log("SW fetching...",e.request)

    clearCaches(e);

    e.respondWith(
        fetch(e.request)
            .then(res => {
                const resClone = res.clone();
                caches.open(dynamicCacheName).then(cache => {
                    cache.put(e.request, resClone);
                });
                return res;
            })
            .catch((err) => caches.match(e.request).then(res => res))


    )


    /* failoverResources.forEach(failover => {
        if( e.request.indexOf(failover[0]) === -1 ) {
            caches.match(e.request)
        } else {
            caches.match(failover[1])
        }
    }) */

    /*  failoverResources.forEach((key) => {
         console.log(key[0]);
         console.log(key[1]);
     }); */

})