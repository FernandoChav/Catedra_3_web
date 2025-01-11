# 📝 PostMaster - Gestión de Posts Web

## 📜Descripción
PostMaster es una aplicación web creada con Angular 19 que permite a los usuarios autenticados crear, visualizar y gestionar posts con imágenes. El proyecto incluye autenticación mediante Identity y seguridad basada en JWT, con integración de Cloudinary para la gestión de imágenes. Diseñada para facilitar la publicación de contenido, esta aplicación combina funcionalidad y diseño moderno utilizando TailwindCSS y Flowbite.

## 🚀Funcionalidades
- 🖋️ Creación de Posts: Los usuarios pueden crear posts con un título y una imagen asociada.
- 📜 Listado de Posts: Visualización de los posts creados por el usuario, con detalles como título e imagen.
- 🌐 Carga de Imágenes: Las imágenes son gestionadas mediante integración con Cloudinary.
- 🔒 Autenticación: Inicio de sesión seguro mediante JWT, con validaciones en cliente y servidor.
- 🛡️ Validaciones Avanzadas: Validación reactiva de formularios para garantizar la integridad de los datos enviados.

## 🛠️ Tecnologías Utilizadas

- **Angular 18**: Framework para el desarrollo del frontend.
- **Tailwind CSS**: Framework CSS para el diseño estilizado y responsivo 🎨.
- **Flowbite**: Biblioteca de componentes preconstruidos basada en Tailwind.
- **RxJS**: Programación reactiva para la gestión de datos y suscripciones.
- **API REST**: Backend que sirve como fuente de datos para los usuarios y productos.
- **Autenticación**: JWT (JSON Web Tokens) 🔐 

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)
- [Angular CLI](https://angular.io/cli) (versión 18 o superior)
- [Tailwind CLI](https://tailwindcss.com/docs/installation)

---

## 📥 Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local:

1. **Clona el Repositorio**

   ```bash
   git clone https://github.com/FernandoChav/Catedra_3_web
   cd Catedra_3_web
   ```

2. **Restaura las Dependencias**

   Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   npm install
   ```

3. **Configura Tailwind CSS**

   Asegúrate de que el archivo `tailwind.config.js` esté configurado correctamente. Tailwind CSS ya debería estar instalado con el comando anterior.

   Si necesitas verificar la configuración, revisa:

   ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "./node_modules/flowbite/**/*.js" // add this line
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ],
    }
   ```

4. **Verifica la API REST**

   Asegúrate de que el backend esté funcionando en la URL correcta. Por defecto, el proyecto espera que la API esté en: `http://localhost:5028/`.

---

## ⚡ Levantar el Servidor de Desarrollo

Para iniciar la aplicación, ejecuta:

```bash
ng serve
```

Luego, navega a [http://localhost:4200](http://localhost:4200) en tu navegador. El servidor recargará automáticamente los cambios en el código fuente.

---



## 🔧 Problemas Comunes

### Error: "Cannot find module 'tailwindcss'"

Asegúrate de haber ejecutado `npm install` correctamente. Si persiste, instala Tailwind manualmente:

```bash
npm install tailwindcss --save-dev
npx tailwindcss init