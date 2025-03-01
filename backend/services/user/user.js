import { sql } from "../../database.js";
import { getMarketType } from "../market/marketService.js";

export class User {
    #id;
    #email;
    #name;

    constructor(id, email, name) {
        this.#id = id;
        this.#email = email;
        this.#name = name;

       
    }

    #getFavMarkets=async(type)=>{
        const favMarkets=await sql`
            SELECT m.name, m.code FROM fav_market fm
            LEFT JOIN account a
            ON a.id=fm.accountId
            LEFT JOIN market m
            ON m.code=fm.marketCode
            LEFT JOIN market_type mt
            ON mt.id=m.typeId
            WHERE mt.name=${type} AND a.name=${this.#name}
            ORDER BY m.code;
        `
        return favMarkets
    }

    getId(){
        return this.#id
    }


    toJson=async()=>{
        let favMars={}
        const types=await getMarketType();

        for(let type of types){
            favMars[type.type]=await this.#getFavMarkets(type.type)
        }

        return{
            id:this.#id,
            name:this.#name,
            email:this.#email,
            favMars:favMars
        }
    }

  
}
