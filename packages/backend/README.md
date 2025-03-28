# Instalar dependencias principales y de desarrollo
```bash
npm install express firebase-admin pg cors dotenv joi node-cron winston morgan jsonwebtoken bcrypt multer moment haversine @prisma/client

npm install --save-dev jest nodemon @types/jest @types/express


## Dependencias

### Principales
- **express**: Framework web para crear la API REST
- **firebase-admin**: SDK para interactuar con Firebase Realtime Database
- **pg**: Cliente PostgreSQL para NeonTech
- **cors**: Middleware para habilitar CORS
- **dotenv**: Para manejo de variables de entorno
- **joi**: Validación de datos
- **node-cron**: Para programar tareas periódicas (migraciones)
- **winston**: Sistema de logs
- **morgan**: HTTP request logger middleware
- **jsonwebtoken**: Implementación de JWT para autenticación
- **bcrypt**: Para hash de contraseñas
- **multer**: Para manejo de formularios multipart/form-data
- **moment**: Biblioteca para manipulación de fechas
- **haversine**: Cálculo de distancias entre coordenadas geográficas
- **@prisma/client**: ORM para facilitar operaciones con PostgreSQL

### Desarrollo
- **jest**: Framework para testing
- **nodemon**: Reinicia el servidor automáticamente durante desarrollo
- **@types/jest** y **@types/express**: Type definitions para TypeScript
