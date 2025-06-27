const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { createHash, isValidPassword } = require('../utils/crypt');

exports.register = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'El usuario ya existe' });

    const newUser = await User.create({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password)
    });

    res.status(201).json({ message: 'Usuario registrado', user: newUser });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !isValidPassword(password, user.password)) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login exitoso' });
};

exports.current = (req, res) => {
    res.json({ user: req.user });
};
