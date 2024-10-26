# Car company landing page
## Tabla de Contenidos
* [General info](#general-info)
* [Demo](#demo)
* [App](#app)
* [Technologies](#technologies)
* [Setup](#setup)

---

## General info
Este proyecto es una aplicación web para gestionar la participación en un sorteo, permitiendo a los usuarios registrarse, consultar su código de participación y revisar los detalles del evento. La aplicación se despliega en Firebase y está diseñada para ofrecer una experiencia de usuario ágil y optimizada para dispositivos móviles y de escritorio.

### Objective
El objetivo principal de la aplicación es ofrecer una interfaz intuitiva para que los usuarios puedan participar en un sorteo de forma sencilla y rápida. Además, se enfoca en asegurar una experiencia de usuario fluida desde el registro hasta la consulta de su código de participación, mejorando la accesibilidad y el rendimiento.

### Criteria
Registro de Usuario: Los usuarios deben poder registrarse ingresando sus datos personales y recibir un código único para participar en el sorteo.
Consulta de Código: La aplicación permite a los usuarios verificar su participación ingresando su código único, sin necesidad de recargar la página.
Despliegue en Firebase: La aplicación utiliza Firebase para hosting, y base de datos, aprovechando su infraestructura escalable.

### Development
La aplicación se desarrolla utilizando Next.js para los componentes y la interfaz, con un enfoque en componentes reutilizables y modales para una interacción dinámica. Para el backend, Firebase maneja la funcionalidad y almacenamiento de datos en una DB. La gestión de estado y validaciones se realizan en React, asegurando una experiencia de usuario consistente y sin fricciones.

### Possible improvements.

Optimización del rendimiento: Mejoras en la carga de imágenes y el manejo de eventos en componentes de alta interacción.
Validaciones adicionales: Añadir validaciones más avanzadas para los campos de entrada.
Ampliación de funcionalidad: Agregar la posibilidad de notificar a los usuarios sobre los resultados del sorteo o próximos eventos.

## URL Pública
Auí está desplegada la app : https://car-app-8ce47.web.app/


## App
![](app/assets/firstView.png)
![](app/assets/landingPage.png)
![](app/assets/registerModal.png)
![](app/assets/searchModal.png)

## Technologies
Este proyecto está creado con:
* Next.js
* React
* JavaScript
* HTML
* MaterialUI
* CSS
* Firebase (DB, firestore, hosting)

## Setup
Para correr este proyecto, después de clonar mi repositorio, inslalo localmente usando npm:

```
$ cd car-landing-page
$ npm install
$ npm run dev
```
---
Gracias por tu visita.

## Author
* **Martin Corredor** - [martincorredor](https://github.com/martincorredor)

## [License]

MIT © [Martin Corredor](https://github.com/martincorredor)