
const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');


router.post('/gpdf', async (req, res) => {
    const {nombre, url } = req.body
     
        //pool.query('INSERT INTO documentos set ?', [nuevo_doc]);
        //-----la linea de abajo genera el pdf
        try {
           // const direfile =  path.join('./documentos/plantillas/'+ plantilla);
       
       // let archivo = fs.readFileSync(direfile, 'utf-8');
        //console.log(archivo);
            const browser = await puppeteer.launch();
            const page = await browser.newPage();  
          //generar pdf por contenido
           // await page.setContent(archivo);
          //generar pdf por url;
          await page.goto(url , { waitUntil: 'networkidle0' });
            await page.emulateMedia('screen');
            await page.pdf({
                path: './' + nombre + '.pdf',
                format: 'A4',
                printBackground: true
            });
            console.log('documento creado');
            await browser.close();
           // process.exit();
           console.log('el documento se genero')

            res.json({'url': './' + nombre });

        } catch (error) {
            console.log('ocurrio un error'+ error);
           console.log('el documento no se puedo generar');
            res.json({'error': './' + nombre });
        }
});


router.get('/hola', (req, res) => {
    
    
   res.send('hola');
});

module.exports = router;