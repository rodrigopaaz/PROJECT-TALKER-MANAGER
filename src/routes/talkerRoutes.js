const express = require('express');

const talkerRouter = express.Router();
const fs = require('fs').promises;

const path = require('path');

const dirPath = path.resolve(__dirname, '../talker.json');
 
  const readFile = async () => {
    const data = await fs.readFile(dirPath);
    return JSON.parse(data);
};

talkerRouter.get('/', async (req, res) => {
   const data = await readFile(); 
   const talkerList = data; 
   res.status(200).json(talkerList); 
});

module.exports = talkerRouter;