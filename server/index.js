
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://tu-dominio-frontend.com'] // Reemplaza con tu dominio de producción
    : ['http://localhost:8080'],  // Permitir solo desde el origen de desarrollo
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configurar Mailgun
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

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
    
    // Preparar los datos para Mailgun
    const data = {
      from: from?.name 
        ? `${from.name} <${from.email || process.env.DEFAULT_FROM_EMAIL}>` 
        : process.env.DEFAULT_FROM_EMAIL,
      subject: subject,
      html: htmlContent,
    };
    
    // Agregar destinatarios
    if (Array.isArray(to)) {
      // Para envíos masivos usamos to para BCC (copia oculta)
      data.to = process.env.DEFAULT_FROM_EMAIL; // El remitente como destinatario principal
      data.bcc = to.map(r => r.name ? `${r.name} <${r.email}>` : r.email).join(',');
    } else {
      // Para envío individual
      data.to = to.name ? `${to.name} <${to.email}>` : to.email;
    }
    
    // Enviar el correo a través de Mailgun
    const response = await mg.messages().send(data);
    
    console.log('Correo enviado exitosamente:', response);
    
    res.status(200).json({
      success: true,
      message: 'Correo enviado exitosamente',
      id: response.id
    });
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
