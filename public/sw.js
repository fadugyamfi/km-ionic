self.addEventListener('install', (evt) => {
    console.log('installed')
})


self.addEventListener('activate', evt => {
    console.log('service worker has been activated')
})

self.addEventListener('fetch', evt => {
    console.log('fetch event', evt)
})