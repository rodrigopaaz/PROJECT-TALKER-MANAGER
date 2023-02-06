const express = require('express');

const talkerRouter = express.Router();
const fs = require('fs').promises;

const path = require('path');

const dirPath = path.resolve(__dirname, '../talker.json');
 
  const readFile = async () => {
    const data = await fs.readFile(dirPath);
    return JSON.parse(data);
};

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

module.exports = talkerRouter;