const mysql = require('mysql2')

// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'express_pos'
// })
const connection = mysql.createConnection('mysql://root:zkENdclqpWEUOAfPzsMtBYTyJIRPlpso@autorack.proxy.rlwy.net:32559/railway')

// module.exports = connection
// const Sequelize = require('sequelize')

// const sequelize = new Sequelize('mysql://root:zkENdclqpWEUOAfPzsMtBYTyJIRPlpso@autorack.proxy.rlwy.net:32559/railway', {
//     dialect: 'mysql',
//     logging: false,  // Disable logging, or set to `console.log` to enable
// });

// sequelize.authenticate()
//     .then(() => {
//         console.log('Connected to MySQL database');
//     })
//     .catch((err) => {
//         console.error('Unable to connect to MySQL database:', err);
//     });

module.exports = connection