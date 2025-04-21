function joiMiddleWare(schema) {
  return async (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, {
        abortEarly: true,
      });

      if (error) {
        const validationErrors = error.details.map((detail) => detail.message);
        return res.status(400).json({ message: validationErrors[0] });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = joiMiddleWare;