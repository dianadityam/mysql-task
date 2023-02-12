const {Sequelize} = require('sequelize');

const sequelize =  new Sequelize({
    database: 'railway',
    host: 'containers-us-west-129.railway.app',
    username: 'root',
    password: 'pzdblPc3svvpE4LPUQqU',
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;