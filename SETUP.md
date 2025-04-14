
# Configuración del Servicio de Correo Electrónico

Para que la aplicación funcione correctamente, necesitas ejecutar tanto el frontend como el backend:

## 1. Iniciar el servidor backend (servicio de correo)

En una terminal:

```bash
cd server
npm install
npm run dev
```

Deberías ver un mensaje similar a:
```
Servidor corriendo en http://localhost:3000
Configurando servicio de correo con Resend...
```

## 2. Iniciar el frontend

En otra terminal (distinta a la del servidor):

```bash
npm install
npm run dev
```

## Notas importantes

- **Si cambias el puerto del servidor**, debes actualizar también la URL de API en `src/utils/emailService.ts`
- Asegúrate de que ambos servidores (frontend y backend) estén ejecutándose al mismo tiempo.
- El archivo `.env` ya ha sido creado con la API key de Resend configurada.

## Solución de problemas

- Si ves errores de conexión, verifica que ambos servidores estén ejecutándose.
- Para depurar problemas, revisa las consolas de ambos servidores.
