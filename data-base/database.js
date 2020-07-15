const Sequelize = require('sequelize')

//Conectando com o Banco de Dados
const connection = new Sequelize('estacionamento', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection