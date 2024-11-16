app.get('generate-qr-code', async function (req, res) {
    client.initialize();
try {
let qrData = await new Promise((resolve, reject) => {

    client.once('qr', (data)=> {
        console.log('QR RECEIVED', data);
        resolve(data); // Resolve the promise with QR code data
    });
});

//Generate QR code image from the received data
qrcode.toDataURL(qrData, (err, dataUrl) => {
if (err) {
    console.error('Error generatinh QR code: ', err);
    res.status(500).send('Error generatinhg QR code');
} else{
    //Send the QR code image as a response
    res.send(`<img src = "${dataUrl}" alt = "QR Code">`);
}
});

}catch (err){
    res.status(500).send(err.message); // Handle errors if any
}
    
});