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
