import { eta } from "../../deps.js";
import * as sessionService from "../session/sessionService.js"


export const getFavorite=async(c)=>{
    const user=await sessionService.getUserFromSession(c)

    if(!user){
        c.redirect('/notfound')
    }

    return c.html(eta.render('/favorite',user))
}