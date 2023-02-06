// middlewares/validateCreatedAt.js
module.exports = (req, res, next) => {
    const { password } = req.body; 
 
    if (password.length < 6) {
      return res.status(400).json(
        { message: 'O campo password é inválido!' },
      );
    }
  
    next();
  };