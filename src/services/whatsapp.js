const axios = require('axios');

class WhatsAppService {
  constructor() {
    this.apiUrl = process.env.WHATSAPP_API_URL;
    this.phoneNumberId = process.env.PHONE_NUMBER_ID;
    this.token = process.env.WHATSAPP_TOKEN;
  }

  async sendMessage(to, message) {
    try {
      const response = await axios({
        method: 'POST',
        url: `${this.apiUrl}/${this.phoneNumberId}/messages`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        data: {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to,
          type: "text",
          text: {
            body: message
          }
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        return this.sendTemplate(to, message);
      }
      throw error;
    }
  }

  async sendTemplate(to, message) {
    const response = await axios({
      method: 'POST',
      url: `${this.apiUrl}/${this.phoneNumberId}/messages`,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      data: {
        messaging_product: "whatsapp",
        to: to,
        type: "template",
        template: {
          name: "template1",
          language: {
            code: "pt_BR"
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: message
                }
              ]
            }
          ]
        }
      }
    });
    return response.data;
  }

  async validateNumber(phoneNumber) {
    try {
      await this.sendMessage(phoneNumber, "Validação de número");
      return true;
    } catch (error) {
      if (error.response?.data?.error?.message?.includes('not a valid WhatsApp')) {
        return false;
      }
      if (error.response?.data?.error?.message?.includes('24 hour window')) {
        return true;
      }
      throw error;
    }
  }
}

module.exports = new WhatsAppService(); 