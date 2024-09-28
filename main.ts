
import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal"


const initWhatsapp = async ()=>{
const whatsappClient = new Client({});

whatsappClient.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});

whatsappClient.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

whatsappClient.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

await whatsappClient.initialize();

return whatsappClient;

}

export default initWhatsapp;