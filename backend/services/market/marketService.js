import { sql } from "../../database.js";

export const getMarketType=async()=>{
    const types=await sql`
        SELECT name AS type FROM market_type;
    `
    return types
}

const getMarketsOfType=async (type)=>{
    const markets=await sql`
        SELECT m.name, m.code FROM market m
        LEFT JOIN market_type mt
        ON m.typeid=mt.id
        WHERE mt.name=${type}
        ORDER BY m.name;
    `
    return markets
}


export const getMarkets=async()=>{
    const types=await getMarketType();

    let data={}

    for(let type of types){
        data[type.type]=await getMarketsOfType(type.type)
    }

    return data;
}

export const saveMarket=async(user_id,code)=>{
    await sql`
        INSERT INTO fav_market(accountId,marketCode) VALUES
        (${user_id},${code});
    `
}

export const unsaveMarket=async(user_id,code)=>{
    await sql`
        DELETE FROM fav_market 
        WHERE accountId=${user_id} AND marketCode=${code}
    `
}

export const checkCurrentMarket=async(market)=>{
    const type=await sql`SELECT * FROM market_type WHERE name=${market}`

    return type.length!==0
}

export const getMarket=async(code)=>{
    const market=await sql`
        SELECT m.name,m.code,mt.name as type FROM market m
        LEFT JOIN market_type mt on m.typeId=mt.id
        WHERE m.code=${code}
    `
  

    return market
}

export const getCommonMarkets=async()=>{
    const commonMarkets=await sql`
        SELECT m.code, m.name, mt.name as type
        FROM market m
        LEFT JOIN market_type mt
        ON m.typeId=mt.id
        WHERE common=1 
        ORDER BY name ASC;
    `
    return commonMarkets
}
