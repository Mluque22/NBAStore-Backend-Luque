import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/crypt.js";

export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "El usuario ya existe" });

    const user = await User.create({
      first_name, last_name, email, age,
      password: await hashPassword(password)
    });

    res.status(201).json({ message: "Registro exitoso", id: user._id });
  } catch (e) { next(e); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    res.json({ message: "Login exitoso" });
  } catch (e) { next(e); }
};

export const current = async (req, res) => {
  res.json({ user: req.user });
};
