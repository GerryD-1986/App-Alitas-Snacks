el backend cuenta con una carpeta src ("aqui es donde estará todo el código del backend")
se crean archivos app.js donde se importa express
archivo db para crear una funcion de conexión para un servidor en mongodb
un archivo index.js
se añadiran archivos conforme se vaya avanzando en la API
se crearan las carpetas:
routes ->  definir todos los endpoints o rutas que el front end pueda pedir
controllers ->  crear funciones que se ejecuten en una URL
models -> guardar los modelos de datos en la base de datos
middlewares -> decidir que rutas estan protegidas para los autenticados, se crean funciones para la validacion de datos
schemas -> se utiliza para poder hacer uso de la libreria zod
libs -> escribir codigo para reinportar varias veces

