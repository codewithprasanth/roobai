import initWhatsapp from "./main";
import scrap from "./scraper";


(async()=>{
    const whatsappClient = await initWhatsapp();
    whatsappClient.on('ready', () => {
        scrap(whatsappClient);
    });
})();


