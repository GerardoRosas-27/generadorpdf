

function cargarPDF() {
    var nombre = 'ejemploPDF';
    var urlpdf = 'https://developers.google.com/chart/';
	var data = new URLSearchParams("nombre=" + nombre  + "&url=" + urlpdf);
	var url = './gpdf/';
	ajaxgGenerarPDF(data, url);
}

async function ajaxgGenerarPDF(data, url) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: data
		});
		
		var respuesta = JSON.parse(await response.text());
		console.log(respuesta.url);
	
		
	} catch (err) {
		console.log('Error en el ajax:', err);
	}
}
