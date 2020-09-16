const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    console.log('request made');

    res.setHeader('Content-Type','text/html');
    
    let path = './views/';
    switch(req.url){
        case '/':
            path +='index.html';
            break;
        case '/about':
            path +='about.html';
            break;
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();    
        default:
            path += '404.html';
            break;        
    }

    fs.readFile(path,(error, data) => {
        if(error){
            console.log(error);
            res.end();
        }
        else{
            res.write(data);
            res.end();
        }

    })


});

server.listen(3000,'localhost',() => {
   console.log('listening for request on port 3000 '); 
});