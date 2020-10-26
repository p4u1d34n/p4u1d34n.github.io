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
    ['.png','/static/images/placeholder.png'],
    ['.jpg','/static/images/placeholder.jpg'],
    ['.html','faiover.html']
]

self.addEventListener('install', (e)=>{
    console.log("SW installed")

    e.waitUntil(
        caches.open(staticCacheName).then(static =>{
            failoverResources.forEach((key) => {
                staticAssets.push(key[1]);
            });
            console.log('staticAssets',staticAssets);
            static.addAll(staticAssets);
        }).then(()=>{
            self.skipWaiting();
        })
    )
})

self.addEventListener('activate', (e)=>{
    console.log("SW activated")
    e.waitUntil(
        caches.keys().then((cachNames)=>{
            return Promise.all(
                cacheNames.map(cache => {
                    if(!cacheNames.includes(cache)) {
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', (e)=>{
    console.log("SW fetching...")

    failoverResources.forEach((key) => {
        console.log(key[0]);
        console.log(key[1]);
    });

})