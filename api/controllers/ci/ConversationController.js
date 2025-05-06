const Conversationci = require("../../models/ci/Conversation");
const User = require("../../models/User");

const createConversation = async (req, res) => {
  const { otherUserId } = req.body;
  const { role, id: userId } = req.user;

  try {
    // Validate otherUserId
    if (!otherUserId) {
      return res.status(400).json({ message: "Other user ID is required" });
    }

    // Check if other user exists
    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.status(404).json({ message: "Other user not found" });
    }

    let providerId, customerId;
    if (role === "provider") {
      providerId = userId;
      customerId = otherUserId;
    } else {
      providerId = otherUserId;
      customerId = userId;
    }

    // Check if conversation already exists
    let conversation = await Conversationci.findOne({
      providerId,
      customerId,
    });

    if (conversation) {
      return res.status(200).json({
        conversationId: conversation._id,
        message: "Conversation already exists",
      });
    }

    // Create new conversation
    conversation = await Conversationci.create({
      providerId,
      customerId,
      lastMessageAt: new Date(),
      // No messages yet
      lastMessageContent: "",
      isActive: true,
    });

    // Populate participant details for response
    conversation = await Conversationci.findById(conversation._id)
      .populate({
        path: "providerId",
        select: "name email",
      })
      .populate({
        path: "customerId",
        select: "fullName email",
      });

    // Format response
    const isProvider = conversation.providerId._id.toString() === userId;
    const otherParticipant = isProvider
      ? conversation.customerId
      : conversation.providerId;

    const response = {
      conversationId: conversation._id,
      userId: otherParticipant._id,
      name: otherParticipant.name,
      email: otherParticipant.email,
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

const getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversationci.find({
      $or: [{ providerId: userId }, { customerId: userId }],
    })
      .populate({
        path: "providerId",
        select: "_id fullName email phoneNumber profileImage",
      })
      .populate({
        path: "customerId",
        select: "_id fullName email phoneNumber profileImage",
      })
      .sort({ lastMessageAt: -1 });

    // Transform the response to include the other participant's details
    const formattedConversations = conversations.map((conv) => {
      const isProvider = conv.providerId._id.toString() === userId;
      const otherParticipant = isProvider ? conv.customerId : conv.providerId;

      return {
        userId: otherParticipant._id,
        conversationId: conv._id,
        fullName: otherParticipant.fullName,
        phoneNumber: otherParticipant.phoneNumber,
        profileImage: otherParticipant.profileImage,
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
