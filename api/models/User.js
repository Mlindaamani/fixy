const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number"],
    },

    role: {
      type: String,
      enum: ["admin", "serviceProvider", "customer"],
      required: true,
    },

    profile: {
      type: Schema.Types.ObjectId,
      ref: function () {
        return this.role === "customer" ? "Customer" : "ServiceProvider";
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      select: false,
    },

    verificationTokenExpires: {
      type: Date,
      select: false,
    },

    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate verification token
userSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.verificationToken = token;
  this.verificationTokenExpires = Date.now() + 3600000;
  return token;
};

// Method to generate password reset token
userSchema.methods.generateResetPasswordToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 3600000;
  return token;
};

// Method to check if password reset token is valid
userSchema.methods.isResetPasswordTokenValid = function (token) {
  return (
    this.resetPasswordToken === token && this.resetPasswordExpires > Date.now()
  );
};

// Method to check if verification token is valid
userSchema.methods.isVerificationTokenValid = function (token) {
  return (
    this.verificationToken === token &&
    this.verificationTokenExpires > Date.now()
  );
};

// Method to check if email is verified
userSchema.methods.isEmailVerified = function () {
  return this.isVerified;
};

module.exports = model("User", userSchema);
