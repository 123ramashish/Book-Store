import ProductModel from "../models/product.model.js";
import userModel from "../models/user.model.js";
export default class userController {
  getRegister(req, res) {
    res.render("register", { errormessage: null });
  }

  getLogin(req, res) {
    res.render("login", { errormessage: null });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    userModel.add(name, email, password);
    res.render("login", { errormessage: null });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = userModel.isValidUser(email, password);

    if (!user) {
      return res.render("login", { errormessage: "Invalid credentials" });
    }
    req.session.userEmail = email;
    const products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  logout(req,res){
    req.session.destroy((err)=>{
      if(err){
        console.log(err);
      }else{
        res.redirect('/login');
      }
    })

    res.clearCookie('lastVisit');
  }
}
