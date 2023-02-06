module.exports = (req, res, next) => {
    const { talk } = req.body;
    console.log(req.body);
    if (!talk) {
        return res.status(400).json(
          { message: 'O campo "talk" é obrigatório' },
        );
    } next();
  };