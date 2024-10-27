# taller-playwright-postman-api-testing

Este repositorio resuelve el taller de automatización de pruebas y test en APIs utilizando Playwright, para completar la actividad asignada en las sesión 5 del curso de Testing en EAFIT, el cual tiene dos retos

## Reto planteado 1 (Carpeta Challenge1 en el repositorio)

El propósito de este proyecto es utilizar las capacidades de Playwright para automatizar un flujo en donde previamente se han realizado request a un API para generar un usuario y realizar una prueba de Login, Delete de la cuenta y reintento de Login con las credenciales ya inválidas, luego de haberlas borrado. El reto es garantizar la ejecución del API antes de la ejecución de la prueba, utilizan los hooks disponibles para el ciclo de vida de la ejecución de las pruebas. Utilizamos en la prueba el sitio web [Demo QA](https://demoqa.com/login) y las definiciones su API en [Swagger](https://demoqa.com/swagger)

### Estructura del proyecto

- *Configuración de Playwright*:
  - [playwright.config.ts](challenge1/playwright.config.ts)
- *Datos del equipo a conformar*:
  - [test.data.ts](challenge1/data/test-data.ts) 
- *Tipado de la datos*:
  - [types/user-credentials.type.ts](challenge1/types/user-credentials.type.ts)
- *Consumo de API, para la generación de la cuenta de usuario aleatoria*:
  - [api/create-user.request.ts](challenge1/api/create-user.request.ts)
- *Páginas, en conformidad con el patrón POM*:
  - [pages/login.page.ts](challenge1/pages/login.page.ts)
  - [pages/profile.page.ts](challenge1/pages/profile.page.ts)
- *Especificación del caso de pruebas - Crear un equipo*:
  - [tests/create-user.spec.ts](challenge1/tests/create-user.spec.ts)

### Orden de la ejecución del caso de prueba

Se realizaron los siguientes pasos en la especificación de la prueba:

I. En el *hook* `BeforeEach`, se ejecuta el llamado al API para generar el usuario.

Luego en el caso de prueba, se ejecuta:

1. Hacer uso de las credenciales de la cuenta aleatoria recién creada
2. _Tomar la evidencia en imagen_
3. Ingresar a la app con las credenciales generadas
4. _Tomar la evidencia en imagen_
5. Eliminar la cuenta y aceptar los *prompts* de validación en el DOM y como Alert
6. _Tomar la evidencia en imagen_
7. Reintentar el ingreso a la app con las credenciales de la cuenta recién borrada
8. **Realizar la aserción para verificar el mensaje de error presente por credenciales inválidas**
9. _Tomar la evidencia en imagen_

### Presentación de evidencias de ejecución exitosa

<div style="display: flex; justify-content: space-between; margin-bottom:2em">
  <div style="flex: 1; margin-right: 10px;">
    <p>Uso de cuenta generada</b></p>
    <img src="challenge1/evidences/01-use-credentials.png">
  </div>
  <div style="flex: 1; margin-left: 10px;">
    <p>Login exitoso</b></p>
    <img src="challenge1/evidences/02-login-successful.png">
  </div>
</div>

<div style="display: flex; justify-content: space-between; margin-bottom:2em">
  <div style="flex: 1; margin-right: 10px;">
    <p>Borrado de cuenta</b></p>
    <img src="challenge1/evidences/03-delete-user-confirmation.png">
  </div>
  <div style="flex: 1; margin-left: 10px;">
    <p>Mensaje de error</b></p>
    <img src="challenge1/evidences/04-login-invalid-credentials.png">
  </div>
</div>

### Instalación y ejecución de la prueba

Para ejecutar el caso de prueba, realiza los siguientes pasos:
1. *Clona el proyecto*:
   `git clone <repo_url>`

2. *Ingresa a la carpeta del reto 1*:
   `cd /challenge1`


3. *Instala las dependencias*:
   `npm install`

4. *Ejecuta las pruebas*:
   `npx playwright test` (Opcional el flag `--ui`)

5. *Verifica los resultados*:
   En cada ejecución de las pruebas, el reporte se genera en el directorio `playwright-report/.` Al interior de este, el archivo `index.html` se puede abrir para ver un informe detallado de las pruebas.

   Cada ejecución regenera las imágenes de evidencia en la carpeta `./evidences`

### Requisitos

- Node.js (versión 16 o superior)

## Reto planteado 2 (Carpeta Challenge2 en el repositorio)

El propósito de este proyecto es utilizar las capacidades de Postman, especialmente de API Testing, para realizar la ejecución de pruebas a diferentes endpoints del API pública de la Nasa. El reto es utilizar las secciones de Pre-Request y Post-Response para los scripts de test y realizar diferentes *assertions* sobre el desempeño del API o contenido de la respuesta que retorna el request. Para ejecutar los llamados al API de la NASA fue necesario solicitar un API_KEY, aunque no todos los endpoints lo requirieron. El API_KEY del API de NASA se solicitó en el [NASA API Portal](https://api.nasa.gov/)

### Estructura del proyecto

- *Colección de Postman con las pruebas realizadas*:
  - [nasa_api.postman_collection.json](challenge2/nasa_api.postman_collection.json)
- *Código de los scripts en Postman para fácil revisión*:
  - [01-apodAstronomyPictureOfTheDay.js](challenge2/code/01-apodAstronomyPictureOfTheDay.js) 
  - [02-marsRoverPhotos.js](challenge2/code/02-marsRoverPhotos.js) 
  - [03-nearEarthObjectsFeed.js](challenge2/code/03-nearEarthObjectsFeed.js) 
  - [04-openScienceDataRepositoryMissionsSpaceX12.js](challenge2/code/04-openScienceDataRepositoryMissionsSpaceX12.js) 

### Presentación de evidencias de ejecución exitosa

<div style="display: flex; justify-content: space-between; margin-bottom:2em">
  <div style="flex: 1; margin-right: 10px;">
    <p>Ejecución del runner completo con las pruebas</b></p>
    <img src="challenge2/evidences/postman-api-test-results.png">
  </div>
</div>

## Autores

Todo el trabajo fue realizado con prácticas de *pair programming*, aprovechando el plugin [Live Share de VSCode](https://visualstudio.microsoft.com/services/live-share/) y los *commits* del proyecto han sido realizados usando la coautores de Github.

- Andrés Ayala <amayalac@eafit.edu.co>
- Santiago Patiño <spatinob1@eafit.edu.co>

## Licencia

Este proyecto es un trabajo académico y está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.