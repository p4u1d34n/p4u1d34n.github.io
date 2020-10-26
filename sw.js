const staticCacheName = 'static-site-v1';
const dynamicCacheName = 'dynamic-site-v1';

const cacheNames = [
	staticCacheName,
	dynamicCacheName
];

const staticAssets = [
	'index.html',
	'/css/styles.css',
	'/js/main.js',
	'faiover.html'
];


self.addEventListener('install', (e) => {
	console.log("SW installed")

	e.waitUntil(
		caches.open(staticCacheName).then(static => {
			static.addAll(staticAssets);
		}).then(() => {
			self.skipWaiting();
		})
	)
})

self.addEventListener('activate', e => {s
	e.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(
				keys.forEach(key => {
					if(cacheNames.indexOf(key) == -1) {
						caches.delete(key)
					}
				})
			)
		})
	)
})

self.addEventListener('fetch', (e) => {
	console.log("SW fetching...", e.request.url)

	e.respondWith(
		fetch(e.request)
			.then(res => {
				const resClone = res.clone();
				caches.open(dynamicCacheName).then(cache => {
					cache.put(e.request, resClone);
				});
				return res;
			})
			.catch((err) => {

				caches.match(e.request).then(res => {
					res
				}).catch(err => {
					caches.match('failover.html');
				})

			})


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