export type LoginInput = {
  email: string;
  password: string;
};

export type LoginOutput = {
  authorization: string;
};

export type DecodedToken = {
  iat: number;
  exp: number;
};

export type RegisterInput = {
  email: string;
  password: string;
  name: string;
  username: string;
};

export type RegisterOutput = {
  message: string;
  data: {
    email: string;
    username: string;
  };
};
