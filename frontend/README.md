# Aplicación de Chat Frontend

## Descripción
Esta es una aplicación de chat construida con tecnologías web modernas, que incluye módulos de exámenes, autenticación de usuarios y funcionalidad de salas de chat. La aplicación está diseñada para funcionar tanto como aplicación web como aplicación móvil utilizando Capacitor.

## Tecnologías Utilizadas

- **React**: Biblioteca frontend para construir interfaces de usuario
- **Vite**: Herramienta de construcción frontend de próxima generación
- **Capacitor**: Runtime multiplataforma nativo para aplicaciones web
- **CSS Modules**: Para estilos específicos de componentes
- **Soporte Android**: Capacidades de implementación de aplicaciones móviles

## Características

- Autenticación de Usuarios (Inicio de sesión/Registro)
- Creación y Gestión de Salas de Chat
- Mensajería en Tiempo Real
- Sistema de Exámenes
- Seguimiento de Progreso
- Registro de Estudiantes y Profesores
- Guías de Estudio
- Perfiles de Usuario
- Sistema de Calificación

## Configuración del Proyecto

### Configuración para Desarrollo Web

1. Instalar Dependencias
```bash
npm install
```

2. Ejecutar Servidor de Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://192.168.18.40:5173` (o en otro puerto si el 5173 está ocupado)

### Configuración para Android

Para ejecutar la aplicación en Android:

1. Asegúrate de tener Android Studio instalado
2. Sincroniza el proyecto con Capacitor
```bash
npx cap sync android
```
3. Abre el proyecto en Android Studio
```bash
npx cap open android
```

## Estructura del Proyecto

- `/src`: Contiene todos los componentes de React y la lógica de la aplicación
- `/public`: Archivos estáticos y manifiestos
- `/android`: Código específico de la plataforma Android
- `/assets`: Recursos de la aplicación como imágenes e iconos

## Desarrollo

El proyecto utiliza varios componentes clave:
- `App.jsx`: Componente principal de la aplicación
- `Chat.jsx`: Funcionalidad de chat
- `Exams.jsx`: Sistema de exámenes
- `Login.jsx` y `RegisterPage.jsx`: Componentes de autenticación
- `MenuPage.jsx`: Sistema de navegación y menú