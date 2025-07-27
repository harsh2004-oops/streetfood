const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('supplier_dash', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('customer', 'supplier'),
        allowNull: false
    }
}, {
    tableName: 'user'
});

// Sync table (if not exists)
sequelize.sync().then(() => {
    console.log('User table synced');
}).catch(console.error);

module.exports = { User, sequelize };
