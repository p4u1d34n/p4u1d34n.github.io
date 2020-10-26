const staticCacheName = 'static-v1';
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
    {'.png':'https://dummyimage.com/300/09f/fff.png&text=Placeholder'},
    {'.jpg':'https://dummyimage.com/300/09f/fff.jpg&text=Placeholder'},
    {'.html':'faiover.html'}
]

self.addEventListener('install', (e)=>{
    console.log("SW installed")

    

    e.waitUntil(
        caches.open(staticCacheName).then(static =>{
            static.addAll(staticAssets);
            failoverResources.forEach((key) => {
                console.log(key[0]);
                console.log(key[1]);
            })
        }).then(()=>{
            self.skipWaiting();
        })
    )
})

self.addEventListener('activate', (e)=>{
    console.log("SW activated")
})

self.addEventListener('fetch', (e)=>{
    console.log("SW fetch")

    failoverResources.forEach((key) => {
        console.log(key[0]);
        console.log(key[1]);
    });
    
})