import {Request, Response} from "express"
import bcrypt from "bcryptjs"
import prisma from "../lib/prismaClient"
import { Job } from "../model/job.model"

interface createJob extends Request {
    body: Job   
}

export const createJob = async (req:Request, res:Response) => {
    try {
        const { title,description,location,company,salaryRange,postedBy} = req.body
       
        const newJob = await prisma.job.create({
            data : {
                title,
                description,
                location,
                company,
                salaryRange,
                postedBy       
            }
            }
        );
        res.status(201).json({
            message : "New Job Created Successfully",
            Job: newJob
        })
    } catch(e){
        res.status(500).json({
            message: 'An error occurred while creating the job'
          });
    }
}