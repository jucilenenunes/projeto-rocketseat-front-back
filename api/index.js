const http = require('http')
const urlx = require('url')
const fs = require('fs')
const path = require('path')

const dados = require('./urls.json')

function writeFile(cb) {
    fs.writeFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(dados,null,2),
        err => {
            if(err) throw err
    
            cb(JSON.stringify({message: "ok"}))
        }
    )
}

http.createServer((req, res) => {
   const {nome, url, del} = urlx.parse(req.url, true).query

   if(!nome || !url)
        return res.end(JSON.stringify(dados))

   if(del) {
       dados.urls = dados.urls.filter(item => String(item.url) !==  String(url))
       return writeFile((message) => res.end(message))
       
       
    }

    dados.urls.push({nome, url})
        
   return writeFile((message) => res.end(message))


}).listen(3000, () => console.log('API Rodando'))