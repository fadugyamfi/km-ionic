if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').then((resolve, reject) => {
        console.log('service worker registered', resolve)
    }).catch(() => {
        console.log('service worker not registered')
    })
}