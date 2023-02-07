const express = require('express');

const talkerRouter = express.Router();
const fs = require('fs').promises;

const path = require('path');

const dirPath = path.resolve(__dirname, '../talker.json');

const auth = require('../middlewares/auth');
const validateName = require('../middlewares/validateNome');
const validateIdade = require('../middlewares/validateIdade');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateTalk = require('../middlewares/validateTalk');
const validateRate = require('../middlewares/validateRate');
 
  const readFile = async () => {
    const data = await fs.readFile(dirPath);
    return JSON.parse(data);
};

talkerRouter.get('/search', auth, async (req, res) => {
    const { q } = req.query;
    const data = await readFile(); 
    const filteredData = data.filter(({ name }) => name.includes(q)); 
    return res.status(200).json(filteredData); 
 });

talkerRouter.get('/', async (_req, res) => {
   const data = await readFile(); 
   const talkerList = data; 
   return res.status(200).json(talkerList); 
});

talkerRouter.get('/:id', async (req, res) => {
    const { params } = req;
    const data = await readFile(); 
    const talkerList = data.find(({ id }) => id === Number(params.id)); 
    if (!talkerList) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });   
    }
    return res.status(200).json(talkerList); 
 });

 talkerRouter.post('/', 
 auth, 
 validateName,
 validateIdade,
 validateTalk,
 validateWatchedAt,
 validateRate,

 async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const users = await readFile();
    const newUser = {
        age, 
        id: users[users.length - 1].id + 1,
        name, 
      talk: {
        rate,
      watchedAt,
      },
    };
    const toString = JSON.stringify([...users, newUser]); 
     await fs.writeFile(dirPath, toString);
     return res.status(201).json(newUser); 
  });

  talkerRouter.put('/:id', 
  auth, 
  validateName,
  validateIdade,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
     const { name, age, talk: { watchedAt, rate } } = req.body;
     const { id } = req.params;
     const users = await readFile();
     const newUser = {
      age, 
      id: Number(id),
      name, 
      talk: {
      rate,
      watchedAt,
       },
     };
     const index = users.findIndex((element) => element.id === Number(id));
     users[index] = newUser;
     const toString = JSON.stringify(users); 
     await fs.writeFile(dirPath, toString);
     return res.status(200).json(newUser); 
   });

   talkerRouter.delete('/:id', 
 auth, 
  async (req, res) => {
    const users = await readFile();
    const { id } = req.params;
    const removeById = users.filter((e) => e.id !== Number(id));
    const toString = JSON.stringify(removeById); 
     await fs.writeFile(dirPath, toString);
     return res.status(204).json('Removed'); 
  });

module.exports = talkerRouter;