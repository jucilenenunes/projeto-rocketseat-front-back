const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {

    const file = req.url === '/' ? 'index.html' : req.url
    const filepath = path.join(__dirname, 'public', file)
    const extname = path.extname(filePath)

    const allowedFileTypes = ['.html', '.css', '.js']
    const allowed = allowedFileTypes.find(item => item == extname)

    if(allowed) return
   
    fs.readFile(
        path.join(__dirname, 'public', 'index.html'),
        (err, content) => {
            if(err) throw err;
            res.end(content)
        }
    )    
   
}).listen(5000, () => console.log("Servidor ok"))