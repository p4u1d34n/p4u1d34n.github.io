self.addEventListener('install', (e)=>{
    console.log("SW installed")
})

self.addEventListener('activate', (e)=>{
    console.log("SW activated")
})

self.addEventListener('fetch', (e)=>{
    console.log("SW fetch")
})