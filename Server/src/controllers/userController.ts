import {Request, Response} from "express"
import bcrypt from "bcryptjs"
import prisma from "../lib/prismaClient"
import { User } from "../model/uer.model"
import { z } from 'zod';

const createUserSchema = z.object({
    name:z.string().min(1,"Name is required"),
    email:z.string().email("Invalid email address"),
    role:z.string().min(1,"Please define your role!"),
    password: z.string().min(8, "Password must be at least 8 characters long"),

})

interface createUser extends Request {
    body: User
}

export const createUser = async (req:Request, res:Response) => {
    try {

        const validatedData = createUserSchema.parse(req.body);

        // const {name, email,role,password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(validatedData.password,salt)
        const newUser = await prisma.user.create({
            data : {
                name:validatedData.name,
                email:validatedData.email,
                role:validatedData.role,
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