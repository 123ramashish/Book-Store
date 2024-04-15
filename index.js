import express from "express";
import ProductController from "./src/controllers/product-controller.js";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import validreRequest from "./src/middlewares/validation.middleware.js";

import validRegisterreRequest from "./src/middlewares/user.middleware.js";
import { uploadFile } from "./src/middlewares/file-uploaded.middleware.js";

import userController from "./src/controllers/user.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";
// const express = require('express');

const app = express();
app.use(express.static("public"));
app.use(cookieParser());
app.use(setLastVisit);
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
// create an instance of ProductController
app.use(express.urlencoded({ extended: true }));
app.use(expressEjsLayouts);

const productController = new ProductController();
const newuser = new userController();
app.use(express.static("src/views"));

app.get("/register", newuser.getRegister);
app.post("/register", validRegisterreRequest, newuser.postRegister);
app.get("/login", newuser.getLogin);
app.post("/login", newuser.postLogin);
app.get("/logout", newuser.logout);

app.get("/", auth, productController.getProduct);
app.get("/new", auth, productController.newproduct);
app.get("/update-product/:id", auth, productController.updateProductView);
app.post("/update-product", auth, productController.postUpdateProduct);
app.post("/delete-product/:id", auth, productController.deleteProductView);

// app.post(
//   "/",
//   auth,
//   validreRequest,
//   uploadFile.single("imageUrl"),

//   productController.addnewProduct
// );
app.post(
  "/",

  uploadFile.single("imageUrl")
);

app.listen(8080);
console.log("Server is listening on port 8080");
