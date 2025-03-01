import { sql } from "../../database.js"
import { User } from "./user.js"

export const createUser=async(name,email,hashedPassword)=>{
    await sql `INSERT INTO account (name,email,password) VALUES (${name}, ${email}, ${hashedPassword})`
}

export const getUser=async(email)=>{
    const user=await sql `SELECT id,email,name FROM account WHERE email=${email}`

    return new User(user[0].id,user[0].email,user[0].name)
}


