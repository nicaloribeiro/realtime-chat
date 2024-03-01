import UserService from "./user-service.js";
import UserValidate from "./user-validation.js";

const create = async (req, res) => {
  try {
    const user = req.body;
    const { error, value } = UserValidate.createUser.validate(user);

    if (error) {
      res.status(400).send({
        message: "Error on create user.",
        error: `Validation error: ${error.details[0].message}`,
      });
    }

    await UserService.create(value);
    const { email, username } = user;
    res.status(201).send({
      message: "User created!",
      data: { email, username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error on create user.",
    });
  }
};

const login = async (req, res) => {
  try {
    const credentials = req.body;
    const { error, value } = UserValidate.login.validate(credentials);

    if (error) {
      res.status(400).send({
        message: "Error on log in.",
        error: `Validation error: ${error.details[0].message}`,
      });
    }

    const jwt = await UserService.login(value);

    res.status(201).send({
      authorization: jwt,
    });
  } catch (error) {
    console.error(error);
    res.status(401).send({
      message: "Error logging in.",
    });
  }
};

const UserController = { create, login };
export default UserController;
