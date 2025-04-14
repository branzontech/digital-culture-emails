
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

## Verificación del funcionamiento

Para comprobar que todo está correctamente configurado:

1. Abre tu navegador y navega a `http://localhost:3000` - deberías ver un mensaje: "Servidor de correo electrónico funcionando correctamente"
2. Luego navega a `http://localhost:8080` para acceder a la aplicación frontend

## Solución de problemas comunes

### Errores de CORS
Si ves errores de CORS en la consola del navegador:
- **Asegúrate que el servidor backend esté ejecutándose**
- Verifica que estás accediendo a la aplicación frontend a través de `http://localhost:8080` o uno de los orígenes permitidos
- Si continúas teniendo problemas, reinicia tanto el servidor backend como el frontend

### Problemas de conectividad:
- **Verifica que estés utilizando la URL correcta:** Usa `http://localhost:8080` para el frontend y `http://localhost:3000` para el backend
- **Asegúrate de que ambos servidores estén ejecutándose** en terminales separadas
- Si estás usando una red corporativa o VPN, verifica que no estén bloqueando las conexiones locales

### Errores de conexión
Si aparecen errores como "No se pudo conectar al servidor de correo":
- Verifica que el servidor backend esté en ejecución
- Asegúrate de que no hay ningún firewall o software que esté bloqueando las conexiones al puerto 3000
- Prueba reiniciando ambos servidores (frontend y backend)

### Errores en el envío de correos
Si el correo no se envía correctamente:
- Verifica que el archivo `.env` en la carpeta `server` tiene la API key correcta de Resend
- Comprueba los logs del servidor backend para ver mensajes de error específicos
- Si ves errores de "JSON parse", verifica que el servidor está devolviendo respuestas JSON válidas

## Notas importantes
- El archivo `.env` ya ha sido creado con la API key de Resend configurada.
- Si necesitas cambiar el puerto del servidor, debes actualizar también la URL de API en `src/utils/emailService.ts`
- Si estás desplegando la aplicación, asegúrate de configurar correctamente las variables de entorno en el servidor.

## Reinicio limpio
Si continúas teniendo problemas, intenta un reinicio limpio:
1. Detén ambos servidores (frontend y backend) presionando Ctrl+C en cada terminal
2. Vuelve a iniciar el servidor backend: `cd server && npm run dev`
3. En otra terminal, vuelve a iniciar el frontend: `npm run dev`
4. Accede a la aplicación usando `http://localhost:8080` en tu navegador
