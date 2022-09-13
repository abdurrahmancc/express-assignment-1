const { check, validationResult } = require("express-validator");
const doUserValidators = [
  check("id").isLength({ min: 1 }).withMessage("id is required"),
  check("name").isLength({ min: 1 }).withMessage("name is required"),
  check("gender").isLength({ min: 1 }).withMessage("gender is required"),
  check("contact").isLength({ min: 1 }).withMessage("contact is required"),
  check("photoUrl").isLength({ min: 1 }).withMessage("photoUrl is required"),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors)?.length === 0) {
    next();
  } else {
    res.status(500).send({
      errors: mappedErrors,
    });
  }
};

module.exports = { doUserValidators, addUserValidationHandler };
