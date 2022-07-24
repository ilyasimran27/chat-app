const {
  addMessage,
  getMessages,
  getAllMessages,
} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get("/getAllMsg/:id", getAllMessages);

module.exports = router;
// http://localhost:5000/api/auth/getAllMsg/625afba51e1eb9641be891bd
