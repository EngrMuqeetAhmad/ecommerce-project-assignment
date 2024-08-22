///defining types for incoming data
type Parameter = {
  value: string | number | boolean;
  type: any;
};
type User = {
  ID: Parameter;
  userFirstName: Parameter;
  userSecondName: Parameter;
  userEmail: Parameter;
  userPhoneNoID: Parameter;
  userPassword: Parameter;
  isVerified: Parameter;
  role: Parameter;
};

type UserPhoneNO = {
  ID: Parameter;
  userID: Parameter;
  countryCode: Parameter;
  phoneNo: Parameter;
};

type QueryResultLogin = {
  success: boolean | undefined;
  data: {
    rowsAffected: number | undefined;
    recordSet: any;
    token: string | undefined;
  };
};

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export { Parameter, User, UserPhoneNO, QueryResultLogin, Role };
