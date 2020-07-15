const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./data-base/database')
const Veiculo = require('./data-base/Veiculo')
//Veiculo é um model

//Conexão com o Banco de Dados
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita!')
    })
    .catch((erro) => {
        console.log(erro)
    })

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Ejs como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

//Página principal
app.get('/', (req,res) => {
    Veiculo.findAll({raw: true, order: [['id', 'DESC']]}).then(veiculos => {
        res.render('index', {veiculos: veiculos})
    })
})

//Cria a tabela e adiciona o tipo, marca e placa.
app.post('/salvarveiculo', (req, res) => {
    var tipo = req.body.tipo
    var marca = req.body.marca
    var placa = req.body.placa
    Veiculo.create({
        tipo: tipo,
        marca: marca,
        placa: placa
    }).then(() => {
        res.redirect('/')
    })
})

//Remover
app.get('/remover/:id', (req, res) => {
    var id = req.params.id
    Veiculo.destroy({
        where: {'id': id}
    }).then(() => {
        res.redirect('/')
    }).catch((erro) => {
        res.send('Veículo não removido! erro:' + erro)
    })
})

app.listen(8080, () => {
    console.log('Rodando na porta 8080!')
})