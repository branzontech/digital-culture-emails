
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://tu-dominio-frontend.com'] // Reemplaza con tu dominio de producción
    : ['http://localhost:8080', 'http://localhost:5173'],  // Permitir desde los orígenes de desarrollo
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configurar transportador de correo
let transporter;
let mailgunClient;

// Inicialización asíncrona del transportador
const initializeTransporter = async () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    // Usar configuración SMTP si está disponible
    console.log('Configurando servicio de correo con SMTP...');
    
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
    // Usar Mailgun como respaldo si está configurado
    console.log('Configurando servicio de correo con Mailgun...');
    
    mailgunClient = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN
    });
  } else {
    // Usar Ethereal para pruebas si no hay otra configuración
    console.log('Configurando servicio de correo de prueba (Ethereal)...');
    
    // Crear cuenta de prueba en Ethereal
    const testAccount = await nodemailer.createTestAccount();
    console.log('Cuenta de prueba Ethereal creada:', testAccount.user);
    
    // Configurar transportador con la cuenta de prueba
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  }
};

// Inicializar el transportador al inicio
initializeTransporter().catch(err => {
  console.error('Error al inicializar el transportador de correo:', err);
});

// Función para enviar correo con Nodemailer
const sendWithNodemailer = async (mailOptions) => {
  const info = await transporter.sendMail(mailOptions);
  console.log('Mensaje enviado: %s', info.messageId);
  
  // Si es una cuenta Ethereal, proporcionar URL para ver el correo
  if (info.messageId && info.messageId.includes('ethereal')) {
    console.log('URL de vista previa: %s', nodemailer.getTestMessageUrl(info));
    return {
      success: true,
      message: 'Correo de prueba enviado exitosamente',
      previewUrl: nodemailer.getTestMessageUrl(info)
    };
  }
  
  return {
    success: true,
    message: 'Correo enviado exitosamente',
    id: info.messageId
  };
};

// Función para enviar correo con Mailgun
const sendWithMailgun = async (data) => {
  const response = await mailgunClient.messages().send(data);
  console.log('Correo enviado exitosamente con Mailgun:', response);
  
  return {
    success: true,
    message: 'Correo enviado exitosamente con Mailgun',
    id: response.id
  };
};

// Ruta para enviar correos
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, htmlContent, from } = req.body;
    
    if (!to || !subject || !htmlContent) {
      return res.status(400).json({ 
        success: false, 
        message: 'Faltan campos requeridos (to, subject, htmlContent)' 
      });
    }
    
    // Dirección de remitente predeterminada
    const defaultFromEmail = process.env.DEFAULT_FROM_EMAIL || 'noreply@example.com';
    
    // Formatear el remitente
    const formattedFrom = from?.name 
      ? `${from.name} <${from.email || defaultFromEmail}>` 
      : defaultFromEmail;
    
    // Intentar enviar el correo con el método disponible
    let result;
    
    if (transporter) {
      // Enviar con Nodemailer
      const mailOptions = {
        from: formattedFrom,
        subject: subject,
        html: htmlContent,
      };
      
      // Agregar destinatarios
      if (Array.isArray(to)) {
        // Para envíos masivos
        mailOptions.to = defaultFromEmail; // Dirección principal
        mailOptions.bcc = to.map(r => r.name ? `${r.name} <${r.email}>` : r.email);
      } else {
        // Para envío individual
        mailOptions.to = to.name ? `${to.name} <${to.email}>` : to.email;
      }
      
      result = await sendWithNodemailer(mailOptions);
    } else if (mailgunClient) {
      // Enviar con Mailgun como alternativa
      const data = {
        from: formattedFrom,
        subject: subject,
        html: htmlContent,
      };
      
      // Agregar destinatarios
      if (Array.isArray(to)) {
        data.to = defaultFromEmail;
        data.bcc = to.map(r => r.name ? `${r.name} <${r.email}>` : r.email).join(',');
      } else {
        data.to = to.name ? `${to.name} <${to.email}>` : to.email;
      }
      
      result = await sendWithMailgun(data);
    } else {
      throw new Error('No hay servicios de correo configurados');
    }
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al enviar correo:', error);
    
    res.status(500).json({
      success: false,
      message: `Error al enviar el correo: ${error.message}`,
    });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
