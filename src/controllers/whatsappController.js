const whatsappService = require('../services/whatsappService');

class WhatsAppController {
  async sendMessage(req, res) {
    try {
      const { to, message } = req.body;
      
      if (!to || !message) {
        return res.status(400).json({ error: 'Número de telefone e mensagem são obrigatórios' });
      }

      const result = await whatsappService.sendMessage(to, message);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async sendImage(req, res) {
    try {
      const { to, imageUrl, caption } = req.body;
      
      if (!to || !imageUrl) {
        return res.status(400).json({ error: 'Número de telefone e URL da imagem são obrigatórios' });
      }

      const result = await whatsappService.sendImage(to, imageUrl, caption);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async sendTemplate(req, res) {
    try {
      const { to, templateName, languageCode, components } = req.body;
      
      if (!to || !templateName) {
        return res.status(400).json({ error: 'Número de telefone e nome do template são obrigatórios' });
      }

      const result = await whatsappService.sendTemplate(to, templateName, languageCode, components);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async validatePhoneNumber(req, res) {
    try {
      const { phoneNumber } = req.params;
      
      if (!phoneNumber) {
        return res.status(400).json({ error: 'Número de telefone é obrigatório' });
      }

      const result = await whatsappService.validatePhoneNumber(phoneNumber);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new WhatsAppController(); 