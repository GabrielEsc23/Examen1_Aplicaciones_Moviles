# 🎮 Game Survey Campus

Aplicación móvil desarrollada con Ionic + Angular para registrar encuestas sobre videojuegos favoritos dentro del campus universitario.

---

# 📱 Descripción

Game Survey Campus es una aplicación móvil que permite realizar encuestas a estudiantes, docentes y personal administrativo sobre sus videojuegos favoritos.

La aplicación integra:

* autenticación,
* consumo de API,
* geolocalización GPS,
* cámara,
* almacenamiento en Firebase/Supabase,
* y visualización de registros.

---

# 🖼️ Logo de la Aplicación

Agregar aquí el logo oficial de la app.


![Logo](https://raw.githubusercontent.com/GabrielEsc23/Examen1_Aplicaciones_Moviles/main/Capturas_APP_Examen/logo2.png)


---

# 🚀 Tecnologías utilizadas

* Ionic Framework
* Angular
* TypeScript
* Capacitor
* Firebase
* Supabase
* FreeToGame API

---

# 🎯 Funcionalidades principales

## 🔐 Sistema de autenticación

* Registro de usuarios
* Inicio de sesión
* Persistencia de sesión
* Cierre de sesión

---

## 🎮 API de videojuegos

Consumo de FreeToGame API para obtener:

* nombre del videojuego,
* descripción,
* género,
* plataforma,
* imágenes,
* información adicional.

---

## 📝 Formulario de encuestas

Registro de:

* Alias o nombre
* Edad
* Rol
* Comentario
* Videojuego favorito

---

## 📍 GPS y Geolocalización

La aplicación permite:

* obtener latitud y longitud,
* registrar ubicación actual,
* mostrar coordenadas del usuario.

---

## 📸 Cámara

La app permite:

* tomar fotografías,
* seleccionar imágenes desde galería,
* guardar evidencias visuales.

---

## 📊 Registro de publicaciones

Visualización de:

* encuestas registradas,
* videojuegos seleccionados,
* imágenes y comentarios.

---

# 🌐 API utilizada

## FreeToGame API

https://www.freetogame.com/api-doc

### Endpoint utilizado

```bash
https://www.freetogame.com/api/games
```

---

# 📂 Estructura del proyecto

```bash
src/app/
│
├── home/
│
├── pages/
│   ├── games/
│   ├── encuesta/
│   ├── login/
│   ├── registros/
│   ├── camara/
│   └── ubicacion/
│
├── services/
│   ├── firebase.service.ts
│   ├── game.service.ts
│   ├── game.service.spec.ts
│   ├── location.ts
│   ├── photo.ts
│   ├── photo.spec.ts
│   ├── supabase.service.ts
│   └── supabase.service.spec.ts
│
├── app.routes.ts
├── app.config.ts
│
└── environments/
```

---

# ⚙️ Instalación

## Clonar repositorio

```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar proyecto

```bash
ionic serve
```

---

# 📦 Generar APK

```bash
ionic build
npx cap sync android
```

---

## Abrir Android Studio

```bash
npx cap open android
```

---

# 📷 Capturas del proyecto

---

# 🚀 Splash Screen

Agregar captura del Splash Screen.

![Splash Screen](https://raw.githubusercontent.com/GabrielEsc23/Examen1_Aplicaciones_Moviles/main/Capturas_APP_Examen/splash-screen.jpg)

---

# 🔐 Pantalla de Login

Agregar captura de la pantalla de login.

![Autenticacion](https://raw.githubusercontent.com/GabrielEsc23/Examen1_Aplicaciones_Moviles/main/Capturas_APP_Examen/autenticacion.jpg)

---

# 🏠 Pantalla Principal

Agregar captura de la pantalla principal.

![Pantalla Principal](https://raw.githubusercontent.com/GabrielEsc23/Examen1_Aplicaciones_Moviles/main/Capturas_APP_Examen/pantalla-principal.jpg)

---

# 📍 Pantalla GPS

Agregar captura de geolocalización.

![GPS](https://raw.githubusercontent.com/GabrielEsc23/Examen1_Aplicaciones_Moviles/main/Capturas_APP_Examen/gps.jpg)

---

# 📝 Formulario de Encuesta

Agregar captura del formulario.

![Formulario](https://raw.githubusercontent.com/GabrielEsc23/Examen1_Aplicaciones_Moviles/main/Capturas_APP_Examen/formulario.jpg)

---

# 📸 Pantalla de Cámara

Agregar captura de cámara.



---

# 🎮 Pantalla de Videojuegos

Agregar captura del consumo de API.

![Videojuegos](https://raw.githubusercontent.com/GabrielEsc23/Examen1_Aplicaciones_Moviles/main/Capturas_APP_Examen/videojuegos.jpg)

---

# 📊 Pantalla de Registros

Agregar captura de publicaciones o registros.

![Registros](https://raw.githubusercontent.com/GabrielEsc23/Examen1_Aplicaciones_Moviles/main/Capturas_APP_Examen/registrojpg.jpg)

---

# 👥 Integrantes

* Gabriel Escobar
* Nicolás Chiguano

---

# 📄 Licencia

Proyecto académico desarrollado para la materia Desarrollo de Aplicaciones Móviles.

Escuela de Formación de Tecnólogos.
