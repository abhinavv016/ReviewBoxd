import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req: Request){
    try{
        const {username, email, password} = await req.json()

        if(!username || !email || !password){
            return NextResponse.json({message: "Empty field"}, {status: 404})
        }

        const existingUser = await prisma.user.findFirst({
            where: {OR : [{email}, {username}]}
        })
        if(existingUser){
            return NextResponse.json({message: "User Already Exists"}, {status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        return NextResponse.json({ message: "User created", user });
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}