const createHttpError = require("http-errors");
const users = require("../middlewares/allUsers");

module.exports.randomData = async (req, res, next) => {
  try {
    res.send({ data: Math.random() });
  } catch (error) {
    next(createHttpError(500, "there are and server error"));
  }
};

module.exports.getAllUser = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  try {
    res.send(users.slice(0, limit));
  } catch (error) {
    next(createHttpError(500, "there are and server error"));
  }
};

module.exports.addUser = async (req, res, next) => {
  const newUser = req.body;
  if (typeof newUser.id !== "number" || typeof newUser.contact !== "number") {
    return next(createHttpError("provide a valid contact or id "));
  }
  const existIs = users.map((user) => user.id === newUser.id);
  if (existIs.includes(true)) {
    return next(createHttpError("id already is used"));
  }
  try {
    const allUsers = [...users, newUser];
    res.send({ message: "success", allUsers });
  } catch (error) {
    next(createHttpError(500, "there are and server error"));
  }
};

/*---------- update contact -----------*/
module.exports.updateUser = async (req, res, next) => {
  const { id, contact } = req.body;
  if (typeof contact !== "number") {
    return next(createHttpError("provide a valid number"));
  }

  try {
    const newUser = users.find((user) => user.id === Number(id));
    newUser.contact = contact;
    res.send({ message: "success", newUser });
  } catch (error) {
    next(createHttpError(500, "there are and server error"));
  }
};

/*---------- update multiple contact -----------*/
module.exports.updateUsers = async (req, res, next) => {
  const updateUsers = req.body;
  try {
    const isValidId = updateUsers.map((user) => typeof user.id !== "number");
    if (isValidId.includes(true)) {
      return next(createHttpError("Provide a valid id"));
    }
    const findUsers = users.filter((user) =>
      updateUsers.find((updateUser) => updateUser.id === user.id)
    );
    const update = findUsers.filter((user) =>
      updateUsers.map((updateUser) => (user.contact = updateUser.contact))
    );
    res.send({ message: "success", update });
  } catch (error) {
    next(createHttpError(500, "there are and server error"));
  }
};

/*---------- delete user -----------*/
module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  if (typeof id !== "number") {
    return next(createHttpError("provide a valid id"));
  }
  try {
    const allUser = users.filter((user) => user.id !== id);
    res.send({ message: "success", allUser });
  } catch (error) {
    next(createHttpError(500, "there are and server error"));
  }
};
