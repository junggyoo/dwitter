import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function signUp(req, res) {
    const { username, password, name, email, url } = req.body;

    const found = await userRepository.findByUserName(username);
    if (found) {
        return res.status(409).json({ messgae: `${username} already exists` });
    }

    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    });
    const token = createJwtToken(userId);
    res.status(201).json({ token, username });
}

export async function login(req, res) {
    const { username, password } = req.body;

    const user = await userRepository.findByUserName(username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid user or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ messgae: 'Invalid user or passwrod' });
    }

    const token = createJwtToken(user.id);
    setToken(res, token);
    res.status(200).json({ token, username });
}

export async function me(req, res) {
    const user = await userRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({ messgae: 'User not found' });
    }
    res.status(200).json({ token: req.token, username: user.username });
}

function createJwtToken(id) {
    return jwt.sign({ id }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec,
    });
}

async function generateCSRFToken() {
    return bcrypt.hash(config.csrf.plainToken, 1);
}
export async function logout(req, res, next) {
    res.cookie('token', '');
    res.status(200).json({ messgae: 'User has been logged out' });
}

export async function csrfToken(req, res, next) {
    const csrfToken = await generateCSRFToken();
    res.status(200).json({ csrfToken });
}

function setToken(res, token) {
    const options = {
        maxAge: config.jwt.expiresInSec * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    };
    res.cookie('token', token, options); // HTTP-ONLY
}
