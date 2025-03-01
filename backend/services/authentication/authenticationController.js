import { eta } from "../../deps.js";
import * as authenticationService from "./authenticationService.js"
import * as sessionService from "../session/sessionService.js"
import * as userService from "../user/userService.js"


export const signup=async(c)=>{
    const body=await c.req.parseBody();

    const nameCheck=await authenticationService.nameCheck(body.name)
    const emailCheck=await authenticationService.mailCheck(body.email)
    const passCheck=await authenticationService.passwordCheck(body.password)

    
    if(!nameCheck.valid){
        return c.html(eta.render("body/signup.eta", {source:'name',success:false,error:nameCheck.error}))
    }

    if(!emailCheck.valid){
        return c.html(eta.render("body/signup.eta", {source:'email',success:false,error:emailCheck.error}))
    }

    if(!passCheck.valid){
        return c.html(eta.render("body/signup.eta", {source:'password',success:false,error:passCheck.error}))
        
    }
    const hashedPassword=await authenticationService.createHashedPassword(body.password)
    await userService.createUser(body.name,body.email,hashedPassword)

    return c.redirect('/signin')
}

export const signin=async(c)=>{
    const body=await c.req.parseBody();

    const accCheck=await authenticationService.accountCheck(body.email,body.password)


    if(!accCheck.success){
        return c.html(eta.render("body/signin.eta", {source:'account',success:false,error:'Invalid email or password'}))
    }

    const user=await userService.getUser(body.email)
    
    await sessionService.createSession(c,user)

    return c.redirect('/home')

}

export const signout=async(c)=>{
    await sessionService.deleteSession(c);
    return c.redirect("/");
}