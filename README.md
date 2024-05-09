# Union-Backend

## Descripción

Union-Backend es la base de datos y servidor central para "Union", una plataforma de gestión de finanzas diseñada para ofrecer una experiencia integral en la administración de finanzas personales y de negocios. Este backend facilita una interfaz API robusta y segura para la gestión de usuarios, cuentas, transacciones y análisis predictivo sobre gastos e ingresos.

## Tecnologías Utilizadas

El proyecto está construido utilizando las siguientes tecnologías y librerías:

- **Node.js**: Plataforma de ejecución para JavaScript.
- **Express.js**: Framework de Node.js para construir aplicaciones de servidor.
- **MySQL2**: Driver de MySQL para Node.js que soporta promesas y callbacks.
- **JWT (JSON Web Tokens)**: Para la autenticación y transmisión segura de información.
- **Bcrypt**: Librería para hashing de contraseñas.
- **Dotenv**: Para manejar variables de entorno.
- **Joi**: Para la validación de datos.
- **Nodemailer y SendGrid**: Para el envío de correos electrónicos.
- **Prettier y ESLint**: Para el formateo de código y asegurar la calidad del código.
- **Vitest**: Para pruebas unitarias y de integración.
- **Python**: Para scripts de Machine Learning

## Configuración y Ejecución

Para configurar y ejecutar la aplicación Union, sigue los siguientes pasos:

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/Hackathon-HBA/backend
```

2. Crea un archivo `.env` en el directorio raíz basado en el archivo `.env.example` proporcionado:

```bash
cp .env.example .env
```

3. Abre el archivo `.env` y reemplaza con tus propias claves de API.

4. Instala las dependencias del proyecto:

```bash
npm install
```

5. Inicia la aplicación:

```bash
npm run start
```

Esto iniciará la aplicación y podrás acceder a ella a través de la URL proporcionada en la línea de comandos.

## Ejecutar migraciones

1. npm run migrate

## Endpoints de la API

### Usuarios

- **Registro de Usuario**: `POST /user/register`
- **Login de Usuario**: `POST /user/login`
- **Obtener Usuario por ID**: `GET /user/:id`
- **Activar Cuenta de Usuario**: `GET /user/activate/:token`

### Cuentas

- **Crear Cuenta**: `POST /accounts`
- **Obtener Cuenta por ID de Usuario**: `GET /accounts/:user_id`

### Transacciones

- **Crear Transacción**: `POST /transactions`
- **Obtener Transacción por ID**: `GET /transactions/:id`
- **Actualizar Transacción**: `PUT /transactions/:id`
- **Eliminar Transacción**: `DELETE /transactions/:id`
- **Listar Transacciones por Categoría**: `GET /transactions/category/:category`
- **Gastos por Cuenta**: `GET /accounts/:cc_num/expenses`
- **Ingresos por Cuenta**: `GET /accounts/:cc_num/incomes`
- **Gastos Totales por Cuenta**: `GET /accounts/:cc_num/expenses/total`
- **Ingresos Totales por Cuenta**: `GET /accounts/:cc_num/incomes/total`
- **Listar Transacciones por Rango de Fechas y Cuenta**: `GET /transactions/daterange`

### Prevenciones (Machine Learning)

- **Previsiones de Gastos**: `GET /preventions/expenses`
- **Previsiones de Ingresos**: `GET /preventions/incomes`

## Documentación de la API
