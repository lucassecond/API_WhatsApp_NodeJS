const whatsappService = require('../services/whatsapp');

const messageController = {
  send: async (req, res) => {
    const { to, message } = req.body;
    try {
      const result = await whatsappService.sendMessage(to, message);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ 
        error: 'Erro ao enviar mensagem', 
        details: error.response?.data?.error?.message || error.message 
      });
    }
  },

  getByPhone: (req, res) => {
    const { phoneNumber } = req.params;
    // Por enquanto, retornando dados mockados
    const messages = [
      {
        type: 'received',
        content: 'Olá! Como posso ajudar?',
        timestamp: new Date(Date.now() - 60000).toISOString()
      },
      {
        type: 'sent',
        content: 'Oi! Preciso de informações sobre o produto.',
        timestamp: new Date(Date.now() - 30000).toISOString()
      }
    ];
    res.json(messages);
  }
};

module.exports = messageController; 