export default class userModel {
  constructor(id, name, email, password) {
    (this.id = id),
      (this.name = name),
      (this.email = email),
      (this.password = password);
  }

  static add(name, email, password) {
    const newuser = new userModel(user.length + 1, name, email, password);

    user.push(newuser);
    // console.log(user);
  }

  static isValidUser(email, password) {
    const result = user.filter(
      (u) => u.eamil === email && u.password === password
    );
    return result;
  }
}
var user = [];
