import { eta } from "../../deps.js";
import * as marketService from './marketService.js'
import * as sessionService from '../session/sessionService.js'

export const getMarkets=async(c)=>{
    const user=await sessionService.getUserFromSession(c);
    const markets=await marketService.getMarkets();
    const current_market=c.req.param('market');

    let data={
        markets:markets,
    }

    if(current_market && await marketService.checkCurrentMarket(current_market)){
        data.current_market=current_market
    }

    if(user){
        data.user=await user.toJson()
    }


    return c.html(eta.render('body/markets.eta',data))
}

export const getMarket=async(c)=>{
    const user=await sessionService.getUserFromSession(c)
    const code=c.req.param('code')
    console.log(code)
    const market=await marketService.getMarket(code)
   

    
    if(!market){
        return c.redirect('/notfound')
    }

    let data={
        market:market[0]
    }

    if(user){
        data.user=await user.toJson()
    }

    console.log(data)

    return c.html(eta.render('body/market.eta',data))
}

export const saveMarket=async(c)=>{
    const user=await sessionService.getUserFromSession(c)
    const code = c.req.param("code");
    const current_market=c.req.param("market")
    const page=c.req.param('page')

    await marketService.saveMarket(user.getId(),code)

    if(page==='home'){
        return c.redirect('/home')
    }

    if(page==='market'){
        return c.redirect(`/markets/${current_market}/${code}`)
    }

    return c.redirect('/markets/'+current_market)
}

export const unsaveMarket=async(c)=>{
    const user=await sessionService.getUserFromSession(c)
    const code = c.req.param("code");
    const current_market=c.req.param("market")
    const page=c.req.param('page')

    await marketService.unsaveMarket(user.getId(),code)

    if(page==='home'){
        return c.redirect('/home')
    }

    if(page==='market'){
        return c.redirect(`/markets/${current_market}/${code}`)
    }


    return c.redirect('/markets/'+current_market)
}