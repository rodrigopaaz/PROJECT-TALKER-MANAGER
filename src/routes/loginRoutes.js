const express = require('express');

const loginRouter = express.Router();
/* const fs = require('fs').promises;
const path = require('path'); */
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

/* const dirPath = path.resolve(__dirname, '../talker.json'); */
 
const token = require('../utils/generateToken');

/* const readFile = async () => {
    const data = await fs.readFile(dirPath);
    return JSON.parse(data);
}; */

loginRouter.post('/', validateEmail, validatePassword, async (req, res) => 
/*   const { email, password } = req.body;
  console.log(email, password); */
    res.status(200).json({ token: token() }));

module.exports = loginRouter;