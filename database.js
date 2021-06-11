const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize("codo_a_codo_4.0","root","",{
    "host": "localhost",
    "dialect": "mysql"
})

const User = require("./models/users")(sequelize, DataTypes)
const Categoria = require("./models/categoria")(sequelize, DataTypes)

sequelize.sync()
    .then(() => console.log("sync"))
    .catch(e => console.log(e))

module.exports = {
    User,
    Categoria
}