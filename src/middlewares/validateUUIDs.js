const { validate: isUuid } = require('uuid');

const validateUUIDs = (req, res, next) => {
  const params = req.params;

  for (const [key, value] of Object.entries(params)) {
    if (!isUuid(value)) {
      return res.status(400).json({ 
        error: `Invalid ${key} format. ${key} must be a valid UUID.` 
      });
    }
  }

  next();
};

module.exports = validateUUIDs;
