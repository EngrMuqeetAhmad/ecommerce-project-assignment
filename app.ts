




var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
///
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user");
var paymentInfoRouter = require("./routes/paymentInfo")
var shippingAddressRouter = require("./routes/shippingAddress");
var userWishRouter = require("./routes/userWish")
////
const PORT = 3000;
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/paymentInfo", paymentInfoRouter);
app.use("/shippingAddress", shippingAddressRouter);
app.use("/userWish", userWishRouter);





// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });


// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });



app.listen(PORT, (err: any) => {
  if (err) {
    console.log(`there is an error ${err.message}`);
  } else {
    console.log(`Server is listening at port ${PORT}`);
  }
});

// module.exports = app;
