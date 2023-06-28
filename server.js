
const express = require('express');
const db = require('./db');
const Person = require('./model');

const { ObjectId } = require('mongodb');
const { collection } = require('./db'); // Importar a conexão com o MongoDB

const axios = require('axios')

const app = express();
const port = 3000;

app.use(express.json());

//CADASTRAR PERSONAGENS

app.post('/pessoas', (req, res) => {


  const { _id, nome, corDoCabelo, peso } = req.body;


  const person = new Person({ _id, nome, corDoCabelo, peso });

  try{
    person.save().then(console.log('Sucesso ao salvar !'))

  }catch (error){
    console.log(error)
  }

  

});


//LISTAR TODOS OS PERSONAGENS

app.get('/registros', async (req, res) => {
  try {
    const registros = await Person.find();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as pessoas' });
  }
});

//BUSCAR UM REGISTRO ESPECÍFICO
app.get('/registros/:id', async (req, res) => {
  try {
    const registros = await Person.findOne({_id:req.params.id});
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Personagem não encontrado' });
  }
});

//ATUALIZAR PERSONAGENS
// app.put('/atualizar/:id', async (req, res) => {
//   const { id } = req.params;
//   const { nome, corDoCabelo, peso } = req.body;

//   try {
//     const person = await Person.findOneAndUpdate(
//       { _id: ObjectId(id) },
//       { $set: { nome, corDoCabelo, peso } }
//     );
//     res.json(person);
//   } catch (error) {
//     res.status(500).json({ error: 'Erro ao atualizar a pessoa' });
//   }
// });
app.put('/atualizar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, corDoCabelo, peso } = req.body;

    // Atualizar o registro pelo ID
    const updatedRegistro = await Person.findByIdAndUpdate(
      id,
      { nome, corDoCabelo, peso },
      { new: true }
    );

    // Verificar se o registro foi atualizado com sucesso
    if (updatedRegistro) {
      res.json({ message: 'Registro atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Registro não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


//DELETAR PERSONAGENS
app.delete('/deletar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Person.deleteOne({_id:req.params.id});
    res.json({ message: 'Pessoa removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover a pessoa' });
  }
});









app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

//No insomnia, crie uma requisição POST, do tipo Json e passe os parâmetros:
// {
// 	"_id": "3",
// 	"nome": "R2D2",
// 	"corDoCabelo": "Metálico",
// 	"peso": "50"
// }