const staticCacheName = 'static-v1';
const dynamicCacheName = 'dynamic-v1';

const cacheNames = [
    staticCacheName,
    dynamicCacheName
];

const staticAssets = [
    
]

self.addEventListener('install', (e)=>{
    console.log("SW installed")

    e.waitUntil(
        caches.open(staticCacheName).then(static =>{
            static.addAll(staticAssets)
        })
    )
})

self.addEventListener('activate', (e)=>{
    console.log("SW activated")
})

self.addEventListener('fetch', (e)=>{
    console.log("SW fetch")
})