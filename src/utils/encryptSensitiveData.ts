import jwt from "jsonwebtoken";

function encryptSensitiveData(data: string) {
  const encryptedString : string = jwt.sign(
    data,
    "MuqeetAhmad"
  );

  return encryptedString;
}

export default encryptSensitiveData;
