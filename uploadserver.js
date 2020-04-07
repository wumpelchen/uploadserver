const express = require('express')
const formidable = require('formidable')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')

const app = express()

const PORT = process.env.PORT || 3002
const baseURL = process.env.BASEURL || '/backend'

app.use(`${baseURL}/js`,express.static(path.join(__dirname, 'public', 'js')))

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(PORT, console.log('server läuft...'))

app.get(`${baseURL}/`, (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post(`${baseURL}/upload`, (req, res)=>{

    let mForm = new formidable()
    let Status = ''

    mForm.parse(req)

    mForm.on('fileBegin', (name, file)=>{
        file.path = __dirname + '/uploads/' + Date.now() + '-' + file.name
    })

    mForm.on('error', (err)=>{
        console.log(err)
        Status = 'Fehler beim Übertragen der Datei'
    })

    mForm.on('end', ()=>{
        Status = 'upload der Datei war erfolgreich'
    })

    res.json({message: Status})

})
