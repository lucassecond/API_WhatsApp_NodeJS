const whatsappService = require('../services/whatsapp');

// Array para armazenar contatos (em memória - você pode mudar para um banco de dados depois)
let contacts = [
  {
    phoneNumber: '5511999999999',
    name: 'João Silva',
    unreadCount: 2
  },
  {
    phoneNumber: '5511888888888',
    name: 'Maria Oliveira',
    unreadCount: 0
  }
];

const contactController = {
  list: (req, res) => {
    res.json(contacts);
  },

  add: async (req, res) => {
    const { name, phoneNumber } = req.body;

    // Validação básica
    if (!name || !phoneNumber) {
      return res.status(400).json({ error: 'Nome e número de telefone são obrigatórios' });
    }

    // Formata o número de telefone (remove caracteres especiais)
    const formattedPhone = phoneNumber.replace(/\D/g, '');

    // Verifica se o número está no formato correto
    if (!/^55\d{10,11}$/.test(formattedPhone)) {
      return res.status(400).json({ 
        error: 'Formato de número inválido. Use: 55 + DDD + número (ex: 5511912345678)' 
      });
    }

    // Verifica se o contato já existe
    const existingContact = contacts.find(c => c.phoneNumber === formattedPhone);
    if (existingContact) {
      return res.status(400).json({ error: 'Contato já existe' });
    }

    try {
      // Valida se o número existe no WhatsApp
      const isValidWhatsApp = await whatsappService.validateNumber(formattedPhone);
      if (!isValidWhatsApp) {
        return res.status(400).json({ error: 'Este número não está registrado no WhatsApp' });
      }

      // Cria novo contato
      const newContact = {
        name,
        phoneNumber: formattedPhone,
        unreadCount: 0
      };

      contacts.push(newContact);
      res.status(201).json(newContact);
    } catch (error) {
      console.error('Erro ao validar número:', error);
      res.status(500).json({ 
        error: 'Erro ao validar número do WhatsApp',
        details: error.response?.data?.error?.message || error.message 
      });
    }
  }
};

module.exports = contactController; 