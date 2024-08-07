var express = require("express");
var router = express.Router();
// const { v4: uuidv4 } = require('uuid');

type User = {
  name: string,
  email: string,
  phoneNo: string,
  password: string
}
var usersDB : Array<User> = [];



/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("hello user/");
  res.json(usersDB);
});


//update user profile data name, phoneNo


//register user
router.put("/userRegister", (req, res) => {
  const { name, email, phoneNo, password } = req.body;

  

  if (!name || !email || !phoneNo || !password) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const user: User = {
      email: email,
      phoneNo: phoneNo,
      name: name,
      password: password
    }
    


    usersDB.push(user);
    res.json({ message: `User created with email ${email}` });
  }
});

module.exports = router;
