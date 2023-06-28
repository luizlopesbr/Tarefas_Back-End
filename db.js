const mongoose = require('mongoose');

const username = 'luizlopesbr'
const password = 's6U1p3uGjR7KorEZ'

const connectionURL = `mongodb+srv://${username}:${password}@cluster0.v0b6oma.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

module.exports = db;
