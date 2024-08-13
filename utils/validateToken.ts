import jwt from "jsonwebtoken";

function validateToken(token: string): string {
  if (!token) {
    return "No token provided";
  }
  //Decoding the toke;n

  try {
    jwt.verify(token, "MuqeetAhmad");

    console.log("token verified");
    return "true";
  } catch (error) {
    console.log("error verifying token");
    return "false";
  }
}


export {
    validateToken
}