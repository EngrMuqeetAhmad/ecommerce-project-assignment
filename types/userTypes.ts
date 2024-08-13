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
  

  export {
    Parameter,
    User,
    UserPhoneNO,
    QueryResultLogin
  }