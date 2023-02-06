// middlewares/validateCreatedAt.js
module.exports = (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!email) {
        return res.status(400).json(
            { message: 'O campo "email" é obrigatório' },
        );
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json(
        { message: 'O "email" deve ter o formato "email@email.com"' },
      );
    }
  
    next();
  };