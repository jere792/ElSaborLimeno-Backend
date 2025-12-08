# El Sabor Limeño – Backend (Node.js + TypeScript)

Este proyecto corresponde al backend del sistema web del restaurante **El Sabor Limeño**.  
Implementa una **API REST** estructurada bajo un enfoque **MVC**, utilizando **TypeScript**, **DAO**, **Repositories** y conexión a base de datos SQL/NoSQL (según tu implementación).

---

## 📌 Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

### ➡️ Node.js (versión recomendada)

- **Node.js 20.x LTS**

Verificar versión:

node -v

text

### ➡️ TypeScript

Instalar globalmente (si no lo tienes):

npm install -g typescript

text

Verificar versión:

tsc -v

text

### ➡️ Dependencias del proyecto

(Se instalarán más adelante con `npm install`)

---

## 🚀 Cómo iniciar el proyecto

1. **Clonar el repositorio**

git clone https://github.com/tuusuario/ElSaborLimeno-backend.git

text

2. **Entrar al proyecto**

cd ElSaborLimeno-backend

text

3. **Instalar dependencias**

npm install

text

4. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto:

PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASS=123456
DB_NAME=elsaborlimeño
JWT_SECRET=ClaveUltraSecreta123

text

5. **Compilar TypeScript**

npm run build

text

6. **Ejecutar el servidor**

Modo producción:

npm start

text

Modo desarrollo (con Nodemon):

npm run dev

text

API disponible en:  
👉 [http://localhost:8080/api](http://localhost:8080/api)

---

## 📁 Estructura del proyecto

ElSaborLimeno-backend/
│── src/
│ ├── controllers/
│ ├── services/
│ ├── repositories/
│ ├── dao/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── middlewares/
│ ├── utils/
│ └── index.ts
│
├── dist/ # Código compilado
├── node_modules/
├── package.json
├── tsconfig.json
├── .env
└── README.md

text

---

## 🧩 Tecnologías utilizadas

- Node.js 20
- TypeScript
- Express.js
- MVC Architecture
- DAO + Repository Pattern
- JWT (Autenticación)
- bcrypt / crypto (encriptación)
- MySQL / PostgreSQL / MongoDB (dependiendo de tu implementación)
- Dotenv
- Nodemon (dev mode)

---

## 🔗 Endpoints principales

(Ejemplo, puedes expandirlo con tus rutas reales)

### Usuarios

- `POST /api/usuarios/login`
- `GET /api/usuarios`
- `POST /api/usuarios`

### Pedidos

- `GET /api/pedidos`
- `POST /api/pedidos`
- `PUT /api/pedidos/:id`
- `DELETE /api/pedidos/:id`

### Platos

- `GET /api/platos`
- `POST /api/platos`

### Mesas

- `GET /api/mesas`
- `POST /api/mesas`

---

## 🛠️ Scripts disponibles

### Compilar TypeScript

npm run build

text

### Ejecutar en modo producción

npm start

text

### Ejecutar en modo desarrollo

npm run dev

text

### Instalar un paquete

npm install nombre-paquete

text

---

## 🍽️ Descripción del proyecto – El Sabor Limeño

Este backend proporciona todos los servicios necesarios para gestionar:

- Registro y autenticación de usuarios
- Gestión de platos del menú
- Gestión de pedidos
- Control de mesas
- Registro de clientes
- Administración de reservas
- Panel administrativo para personal autorizado

La API está diseñada para ser consumida por el frontend en **Angular 19**.

---

## 👨‍💻 Autores

Proyecto desarrollado para **El Sabor Limeño**.  
Backend implementado con **Node.js + TypeScript**.

**Equipo de desarrollo / estudiantes:**

- Jeremy Anton
- Breider Catashunga
