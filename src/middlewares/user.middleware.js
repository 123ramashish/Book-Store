import { body, validationResult } from "express-validator";
const validRegisterreRequest = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password length shuold be greater than 5"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  var validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res.render("register", {
      errormessage: validationErrors.array()[0].msg,
    });
  }

  next();
};

export default validRegisterreRequest;
