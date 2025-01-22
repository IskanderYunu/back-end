import User from "../models/user.mjs";
//CRUD functionality for users

// Create a new user
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, grade } = req.body;

    if (!username || !email || !password || !grade) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email." });
    }

    const newUser = new User({ username, email, password, grade });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getUsers = async (_req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from the response
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get a user by ID
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update a user
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    next(error);
  }
};

// Delete a user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};
