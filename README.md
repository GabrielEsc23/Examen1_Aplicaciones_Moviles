# 📍 App GPS con Ionic + Angular + Supabase

Aplicación móvil desarrollada con **Ionic + Angular** que permite iniciar sesión mediante **Supabase**, obtener la ubicación actual del dispositivo usando el GPS, guardar las coordenadas en **Firebase** y visualizar la ubicación en **Google Maps**.

---

## 🚀 Tecnologías utilizadas

- Ionic Framework
- Angular
- Supabase (Autenticación)
- Firebase
- Capacitor Geolocation
- Google Maps
- TypeScript

---

## 📱 Funcionalidades

✅ Inicio de sesión con Supabase  
✅ Obtención de coordenadas GPS  
✅ Solicitud de permisos de ubicación  
✅ Almacenamiento de coordenadas en Firebase  
✅ Visualización de latitud y longitud  
✅ Apertura de ubicación en Google Maps  
✅ Compatible con navegador y dispositivos móviles

---

## ⚙️ Instalación

Clonar repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar al proyecto:

```bash
cd nombre-proyecto
```

Instalar dependencias:

```bash
npm install
```

Ejecutar proyecto:

```bash
ionic serve
```

---

## 📂 Estructura principal

```bash
src/
│
├── app/
│   ├── home/
│   ├── login/
│   ├── services/
│   │     ├── supabase.service.ts
│   │     └── firebase.service.ts
│
├── assets/
```

---

## 🔐 Inicio de sesión

La aplicación utiliza Supabase para autenticar usuarios y obtener el usuario actualmente conectado.

---

## 📍 Funcionamiento del GPS

La aplicación:

1. Solicita permisos de ubicación
2. Obtiene latitud y longitud
3. Guarda los datos en Firebase
4. Muestra coordenadas
5. Abre la ubicación en Google Maps

---

# 📷 Capturas de pantalla

## Icono de la aplicación

![Icono](imagenes/icono.png)

---

## Splash Screen

![Splash](imagenes/splash.png)

---

## Inicio de sesión

![Login](imagenes/login.png)

---

## Pantalla principal

![Inicio](imagenes/inicio.png)

---

## Coordenadas obtenidas

![Coordenadas](imagenes/coordenadas.png)

---

## Ubicación en Google Maps

![Maps](imagenes/maps.png)

---

## 👨‍💻 Autor

Desarrollado por: Tu Nombre
