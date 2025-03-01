import { sql } from "../../database.js";
import { bcrypt } from "../../deps.js";

export const mailCheck=async(email)=>{
    const mailCheck= await sql `SELECT email FROM account WHERE email=${email}`

    if(email.length==0){
        return {valid:false,error:'empty email'}
    }

    if(mailCheck.length!==0){
        return {valid:false,error:'email already exists'}
    }

    return {valid:true}
       
}

export const nameCheck=async(name)=>{
    const nameCheck= await sql `SELECT name FROM account WHERE name=${name}`
    

    if (name.length<5){
        return {valid:false,error:'name must be greater than 5'}
    }

    if(nameCheck.length!==0){
        return {valid:false,error:'name already taken'}
    }

    return {valid:true}
       
}

export const passwordCheck = async (password,email=null) => {
    // Check password length
    if (password.length < 8) {
        return {valid:false,error:'Password must have length greater than 8.'}
    }

    // Check if the password contains both letters and numbers
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (!hasLetter || !hasNumber) {
        return { valid: false, error: "Password must contain both letters and numbers." };
    }

    // If all checks pass
    return {valid:true}
}

export const accountCheck = async (email, password) => {
    const mailExists = await sql`SELECT email, password, id FROM account WHERE email = ${email}`;

    if (mailExists.length === 0) {
        return { success: false};
    }

    const user = mailExists[0]; 
    
    const passwordMatch=await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return { success: false};
    }

    return { success: true, id: user.id };
};


export const createHashedPassword=async(password)=>{
    return await bcrypt.hash(password)
}
