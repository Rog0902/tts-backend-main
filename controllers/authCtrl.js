import { Users } from "../models/user.js";

import jwt from 'jsonwebtoken'
import argon2 from "argon2";

const authCtrl = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body
            // let newUserName = username.toLowerCase().replace(/ /g, '')
            let newUserName = username.replace(/ /g, '')

            const user_name = await Users.findOne({ username: newUserName })
            if (user_name) return res.json({ success: false, message: "Tên đăng nhập đã tồn tại" })

            const user_email = await Users.findOne({ email })
            if (user_email) return res.json({ success: false, message: "Email đã được đăng ký" })

            if (password.length <= 8)
                return res.json({ success: false, message: "Mật khẩu phải trên 8 ký tự" })

            const passwordHash = await argon2.hash(password)

            const newUser = new Users({
                ...req.body, password: passwordHash, role: 'user', active: true
            })

            await newUser.save()

            return res.json({
                success: true, message: "Register Success!"
            })
        } catch (err) {
            return res.status(500).json({ success: false, message: "Server error" })
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body

            const user = await Users.findOne({ username })

            if (!user || !user.active) return res.status(400).json({ success: false, message: "Incorrect username or password." })

            const isMatch = await argon2.verify(user.password, password);
            if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect username or password" })

            const access_token = createAccessToken({ id: user._id })

            return res.json({
                success: true,
                message: "Login Success!",
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

const createAccessToken = (payload) => {
    // return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
}

export default authCtrl