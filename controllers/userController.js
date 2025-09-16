import User from "../models/user.js";

export const getUsers = async (_req, res, next) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (e) { next(e); }
};

export const getUserById = async (req, res, next) => {
  try {
    const u = await User.findById(req.params.id).lean();
    if (!u) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(u);
  } catch (e) { next(e); }
};
