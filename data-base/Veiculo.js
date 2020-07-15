const Sequelize = require('sequelize')
const connection = require('./database')

//Model sendo criado
const Veiculo = connection.define('estacionamento', {
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    marca: {
        type: Sequelize.STRING,
        allowNull: false
    },
    placa: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Veiculo.sync({force: false}).then(() => {})
module.exports = Veiculo