const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('supplier_dash', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    tableName: 'product',
    timestamps: true // Adds createdAt and updatedAt
});

// Sync table
Product.sync().then(() => {
    console.log('Product table synced');
}).catch(console.error);

module.exports = Product;
