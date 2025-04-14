
# Servidor de Envío de Correos

Este es un servidor backend para manejar el envío seguro de correos electrónicos con múltiples opciones:

1. Nodemailer con SMTP (gratuito con servicios como Gmail)
2. Mailgun (como opción de respaldo)
3. Ethereal Email (para pruebas sin necesidad de cuenta real)

## Requisitos previos

- Node.js y npm instalados

## Instalación

1. Clonar este repositorio o copiar estos archivos
2. Navegar al directorio `server`
3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` basado en `.env.example` y configurar según tu preferencia:

```
PORT=3000
NODE_ENV=development

# Opción 1: SMTP (recomendado para servicios gratuitos)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-correo@gmail.com
SMTP_PASS=tu-contraseña-o-contraseña-de-aplicación
SMTP_SECURE=false

# Opción 2: Mailgun (alternativa)
MAILGUN_API_KEY=tu-api-key-de-mailgun
MAILGUN_DOMAIN=tu-dominio-verificado-en-mailgun.com

DEFAULT_FROM_EMAIL=noreply@tu-dominio.com
```

> **Nota**: Si no configuras ninguna de las dos opciones, el sistema usará automáticamente Ethereal Email para pruebas, que te permite ver los correos enviados en una interfaz web sin necesidad de una cuenta real.

## Ejecución

Para desarrollo:

```bash
npm run dev
```

Para producción:

```bash
npm start
```

## Uso

El servidor expone un endpoint POST en `/api/send-email` que acepta los siguientes parámetros en formato JSON:

```json
{
  "to": { "email": "destinatario@ejemplo.com", "name": "Nombre Destinatario" },
  "subject": "Asunto del correo",
  "htmlContent": "Contenido HTML del correo",
  "from": { "email": "remitente@ejemplo.com", "name": "Nombre Remitente" }
}
```

El campo `to` también puede ser un array de objetos para envíos masivos.

## Seguridad

Este servidor implementa:

- CORS configurado para permitir solo orígenes específicos
- Manejo seguro de credenciales con variables de entorno
- Validación de datos de entrada

## Producción

Para producción, asegúrate de:

1. Cambiar NODE_ENV a 'production'
2. Actualizar los orígenes permitidos en la configuración CORS
3. Usar un servicio como PM2 para gestionar el proceso de Node.js
4. Configurar un proxy inverso como Nginx
