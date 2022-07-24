const Messages = require("../models/messageModel");

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const allMessages = await Messages.find({
      // sender: { $ne: req.params.id },
    });
    // .select([]);
    console.log("0000000==============", allMessages);
    res.json(allMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      console.log("msg====>", msg)
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        createdAt:msg.createdAt,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
// console.log("add message=>",req)
  try {
    const { from, to, message } = req.body;
    console.log("from====>",from,to,message)
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
