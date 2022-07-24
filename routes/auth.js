const {
  login,
  register,
  getAllUsers,
  setProfilePicture,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setprofilepicture/:id", setProfilePicture);
router.get("/logout/:id", logOut);

module.exports = router;
