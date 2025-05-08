const whatsappService = require('../services/whatsapp');

const webhookController = {
  verify: (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token && challenge) {
      if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
        res.set('Content-Type', 'text/plain');
        res.status(200).send(String(challenge));
      } else {
        res.status(403).send('Forbidden');
      }
    } else {
      res.status(400).send('Missing parameters');
    }
  },

  receive: (req, res) => {
    const { body } = req;
    
    if (body.object) {
      if (
        body.entry &&
        body.entry[0].changes &&
        body.entry[0].changes[0] &&
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]
      ) {
        const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
        const from = body.entry[0].changes[0].value.messages[0].from;
        const msg_body = body.entry[0].changes[0].value.messages[0].text.body;

        // Aqui você pode adicionar lógica para processar a mensagem
        console.log('Mensagem recebida:', { from, msg_body });
      }
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }
  }
};

module.exports = webhookController; 