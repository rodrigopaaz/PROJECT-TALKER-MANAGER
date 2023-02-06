// middlewares/validateCreatedAt.js
module.exports = (req, res, next) => {
    const { email } = req.body;
    console.log(email);
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  
    if (!emailRegex.test(email)) {
      return res.status(400).json(
        { message: 'O campo Email é inválido!' },
      );
    }
  
    next();
  };