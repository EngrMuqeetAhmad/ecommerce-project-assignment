var express = require("express");
var router = express.Router();
// const { v4: uuidv4 } = require('uuid');

var usersDB = [];

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
    usersDB.push({
      email: email,
      name: name,
      phoneNo: phoneNo,
      password: password,
    });
    res.json({ message: `User created with email ${email}` });
  }
});

module.exports = router;
