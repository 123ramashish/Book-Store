import path from "path";
import ProductModel from "../models/product.model.js";
export default class productController {
  getProduct(req, res) {
    const products = ProductModel.get();
    // console.log(products);
    res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
    //   const data =path.resolve('src','views','products.html');
    // res.sendFile(data);
  }
  newproduct(req, res) {
    res.render("new-product", {
      errormessage: null,
      userEmail: req.session.userEmail,
    });
  }
  addnewProduct(req, res) {
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    const products = ProductModel.get();
    res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  updateProductView(req, res) {
    const id = req.params.id;
    const productfound = ProductModel.getById(id);

    if (productfound) {
      res.render("update-product", {
        product: productfound,
        errormessage: null,
        userEmail: req.session.userEmail,
      });
    } else {
      res.status(401).send("Product not found!");
    }
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    const products = ProductModel.get();
    res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  deleteProductView(req, res) {
    const id = req.params.id;
    const productfound = ProductModel.getById(id);
    if (!productfound) {
      res.status(401).send("Product not found!");
    }
    ProductModel.delete(id);
    const products = ProductModel.get();
    res.render("products", { products, userEmail: req.session.userEmail });
  }


  
}
