const Conversation = require("../models/Conversation");
const User = require("../models/User");
const { formatImageRepresentation } = require("../utils/helpers");

const USERROLE = {
  SERVICEPROVIDER: "serviceProvider",
  ADMIN: "admin",
  CUSTOMER: "customer",
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createConversation = async (req, res) => {
  const { otherUserId } = req.body;
  const { role, id: userId } = req.user;

  try {
    if (!otherUserId) {
      return res
        .status(400)
        .json({ message: "Please pick a user to chat with" });
    }

    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let provider, customer;

    if (role === USERROLE.SERVICEPROVIDER) {
      provider = userId;
      customer = otherUserId;
    } else {
      customer = userId;
      provider = otherUserId;
    }

    let conversation = await Conversation.findOne({
      provider,
      customer,
    });

    if (conversation) {
      return res.status(200).json({
        conversationId: conversation._id,
        message: "Conversation already exists",
      });
    }

    // Create new conversation
    conversation = await Conversation.create({
      provider,
      customer,
      lastMessageAt: new Date(),
      lastMessageContent: "",
      isActive: true,
    });

    // Populate participant details for response
    conversation = await Conversation.findById(conversation._id)
      .populate({
        path: "provider",
        select: "name email",
      })
      .populate({
        path: "customer",
        select: "fullName email",
      });

    const isProvider = conversation.provider._id.toString() === userId;
    const other = isProvider ? conversation.customer : conversation.provider;

    const response = {
      conversationId: conversation._id,
      userId: other._id,
      name: other.name,
      email: other.email,
      lastMessageContent: conversation.lastMessageContent,
      lastMessageAt: conversation.lastMessageAt,
      isActive: conversation.isActive,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating conversation:", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "Conversation already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find({
      $or: [{ provider: userId }, { customer: userId }],
    })
      .populate({
        path: "provider",
        select: "_id fullName email phoneNumber profileImage",
      })
      .populate({
        path: "customer",
        select: "_id fullName email phoneNumber profileImage",
      })
      .sort({ lastMessageAt: -1 });


    // Transform the response to include the other participant's details
    const formattedConversations = conversations.map((conv) => {
      const isProvider = conv.provider._id.toString() === userId;
      const other = isProvider ? conv.customer : conv.provider;

      return {
        userId: other._id,
        conversationId: conv._id,
        fullName: other.fullName,
        phoneNumber: other.phoneNumber,
        profileImage: formatImageRepresentation(req, other.profileImage),
        lastMessageContent: conv.lastMessageContent,
        lastMessageAt: conv.lastMessageAt,
        isActive: conv.isActive,
      };
    });

    res.status(200).json(formattedConversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createConversation, getUserConversations };
