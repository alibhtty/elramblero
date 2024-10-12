;
//asiganr un nombre y versión al cache
const CACHE_NAME = 'cache_cyborg',
urlToCache = [
    './',
    'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap',
    'https://alibhtty.github.io/elramblero'
]

//durante la fase de instalación, generalmente se almacena en cache los activos estáticos
self.addEventListener('install',e=>{
 e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
        return cache.addAll(urlsToCache)
        .then(() => self.skipWaiting())
    })
    .catch(err => console.log('Falló registro de cache', err))
 )
})



//una ves instalado SW, se activa y busca los recursos para que funcionen sin conexión
self.addEventListener('activate',e=>{
 const cacheWhitelist = [CACHE_NAME]

 e.waitUntil(
    caches.keys()
    .then(cachesNames => {
        cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1){
                return caches.delete(cacheName)
            }
        })
    })
    //Le indica al SW activar el cache actual
    .then(() => self.clients.claim())
 )
})



//cuando el navegador recupera la url
self.addEventListener('fetch',e => {
 //Responder ya sea con el objeto en cache o continuar, y busca la url real
 e.respondWith(
    caches.match(e.request)
    .then(res => {
        if (res) {
            //recuperando del cache
            return res
        }

        //recuperar de la peticion a la url
        return fetch(e.request)

    })
 )
})




/* other */


/* // Inicializa deferredPrompt para su uso más tarde.
let deferredPrompt;
var div = document.querySelector('.add-to');
var button = document.querySelector('.add-to-btn');
div.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Previene a la mini barra de información que aparezca en smartphones
  e.preventDefault();
  // Guarda el evento para que se dispare más tarde
  deferredPrompt = e;
  div.style.display = 'block';

  button.addEventListener('click', async () => {
    // Esconde la información promotora de la instalación
    hideInstallPromotion();
    // Muestre el mensaje de instalación
    deferredPrompt.prompt();
    // Espera a que el usuario responda al mensaje
    const { outcome } = await deferredPrompt.userChoice;
    // De manera opcional, envía analíticos del resultado que eligió el usuario
    console.log(`User response to the install prompt: ${outcome}`);
    // Como ya usamos el mensaje, no lo podemos usar de nuevo, este es descartado
    deferredPrompt = null;
  });


  // Actualizar la IU para notificarle al usuario que se puede instalar tu PWA
  showInstallPromotion();
  // De manera opcional, envía el evento de analíticos para saber si se mostró la promoción a a instalación del PWA
  console.log(`'beforeinstallprompt' event was fired.`);
}); */