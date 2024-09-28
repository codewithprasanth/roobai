import initWhatsapp from "./main";
import scrap from "./scraper";
import express from "express";


(async()=>{
    const whatsappClient = await initWhatsapp();
    whatsappClient.on('ready', async() => {
        console.log('client connected');
        await whatsappClient.sendMessage(
            "917200632341@c.us",
            'Scraping started'
          );
        await scrap(whatsappClient);
    });
})();

const app = express();
app.get('/status',(req,res,next)=>{
    res.send('Service is UP!')
})

app.listen(8080,()=>console.log('server is listening'));

// import qrcode from "qrcode-terminal"
// const qr = "";
// qrcode.generate(qr, {small: true});


