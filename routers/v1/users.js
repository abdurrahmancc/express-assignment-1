const {
  randomData,
  getAllUser,
  addUser,
  updateUser,
  updateUsers,
  deleteUser,
} = require("../../controller/user.controller");
const {
  doUserValidators,
  isValidUpdateData,
  addUserValidationHandler,
} = require("../../middlewares/userValidator");

const router = require("express").Router();

/* get random data */
router.get("/random", randomData);

/* get all users*/
router.get("/all", getAllUser);

/* add user*/
router.post("/save", doUserValidators, addUserValidationHandler, addUser);

/* update user*/
router.patch("/update", updateUser);

/*  update users*/
router.patch("/bulk-update", updateUsers);

/* delete user*/
router.delete("/delete", deleteUser);

module.exports = router;
