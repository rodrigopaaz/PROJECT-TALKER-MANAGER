module.exports = (req, res, next) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    const { talk: { watchedAt } } = req.body;  
 if (!watchedAt) {
        return res.status(400).json(
          { message: 'O campo "watchedAt" é obrigatório' },
        );
      } if (!dateRegex.test(watchedAt)) {
      return res.status(400).json(
        { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
      );
    } next();
  };