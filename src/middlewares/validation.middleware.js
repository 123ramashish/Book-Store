import { body, validationResult } from "express-validator";
const validreRequest = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price should be positive"),
    body("imageUrl").custom((value, { req }) => {
     if(!req.file){
          throw new Error('Image is required')
     }
          return true;
  
    }),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  var validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res.render("new-product", {
      errormessage: validationErrors.array()[0].msg,
    });
  }

  next();
};

export default validreRequest;
