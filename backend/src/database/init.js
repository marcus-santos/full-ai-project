const { initDB } = require('./config');

// Script para inicializar o banco de dados
console.log('Inicializando banco de dados...');
initDB();
console.log('Banco de dados inicializado!');