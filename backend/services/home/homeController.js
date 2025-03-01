import { eta } from "../../deps.js";
import * as sessionService from "../session/sessionService.js";
import * as marketService from "../market/marketService.js"
import * as newsService from "../news/newsService.js";  

export const getHome=async(c)=>{
        
        const user = await sessionService.getUserFromSession(c);
        const markets = await marketService.getCommonMarkets()
        const news = await newsService.getLatestNews()

        let data={
                markets,
                news      
        }

        if(user){
                data.user=await user.toJson()
        }


        return c.html(eta.render('body/home.eta',data))
}



