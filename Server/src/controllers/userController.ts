import {Request, Response} from "express"
import bcrypt from "bcryptjs"
import prisma from "../lib/prismaClient"
import { User } from "../model/uer.model"

interface createUser extends Request {
    body: User
}

export const createUser = async (req:Request, res:Response) => {
    try {
        const {name, email,role,password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await prisma.user.create({
            data : {
                name,
                email,
                role,
                password:hashedPassword
            }
        });
        res.status(201).json({
            message : "New User Created Successfully",
            user: newUser
        })
    } catch(e){
        res.status(500).json({
            message: 'An error occurred while creating the user'
          });
    }
}

export const getAllUsers = async (req:Request, res:Response)=>{
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({ error: 'Error fetching users' });
    }
}