import User from '../models/auth.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        console.log({ name, email, password })
        const existingUser = await User.findOne({ email });
        
        if(existingUser){
            return res.status(409).json({message: "User already Exist!"})
        }


        const hashedPassword = await bcrypt.hash(password, 13)
        const newUser = await User.create({ name, email, password: hashedPassword })
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        console.log(newUser)
        res.status(200).json({ result: newUser, token })

    }
    catch (err) {
        res.status(500).json("Something went wrong...")
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        console.log({ email, password })
        const existingUser = await User.findOne({email});
        console.log(existingUser)
        if(!existingUser){
            return res.status(404).json({message: "User does not Exist!"})
        }

        const isPasswordCrt = bcrypt.compare(password, existingUser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
        res.status(200).json({result: existingUser, token})


    } catch (error) {
        res.status(500).json("Something went wrong...")
    }


}