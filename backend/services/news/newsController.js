import { eta } from "../../deps.js";
import * as newsService from "../news/newsService.js"
import * as sessionService from "../session/sessionService.js"

export const getAllNews=async(c)=>{
    const user=await sessionService.getUserFromSession(c)
    const news=await newsService.getAllNews()

    let data={
        news
    }

    if(user){
        data.user=await user.toJson()
    }

    return c.html(eta.render('/body/allNews.eta',data))
}
