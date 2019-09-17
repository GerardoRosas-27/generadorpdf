
const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/', (req, res) => {
    res.render('inicio/inicio');
});

router.post('/gpdf', async (req, res) => {
    const {nombre, url } = req.body;
    console.log('nombre :' + nombre);
    console.log('url :' + url);
       
        try {
          
            const browser = await puppeteer.launch();
            const page = await browser.newPage();  
          
            await page.goto(url , { waitUntil: 'networkidle0' });
            await page.emulateMedia('screen');
           var pagina = await page.pdf({
                path: './documentos/' + nombre + '.pdf',
                format: 'A4',
                printBackground: true
            });
            
            console.log('documento creado: '+ pagina);
            await browser.close();
         
           console.log('el documento se genero')

            res.json({'urlgenerada': './documentos/' + nombre, 'urlmandad': url });

        } catch (error) {
            console.log('ocurrio un error'+ error);
           
	res.json({'error': error,'urlgenerada': './documentos/' + nombre, 'urlmandad': url });
        }
});


router.get('/hola', (req, res) => {
    
    
   res.send('hola');
});

module.exports = router;