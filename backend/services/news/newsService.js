import { sql } from "../../database.js"

export const getLatestNews=async()=>{
    const commonNews=await sql`
        SELECT n.name, n.link, n.image_link, n.date, npp.name as newspaper 
        FROM news n
        LEFT JOIN newspaper npp 
        ON n.newspaperId=npp.id
        ORDER BY n.date DESC
        LIMIT 8;
        `  
    return commonNews
}

export const getAllNews=async()=>{
    const news=await sql`
        SELECT n.name, n.link, n.image_link, n.date 
        FROM news n
        ORDER BY n.date DESC
    `

    return news
}

export const getNews=async(id)=>{
    const news=await sql`
        SELECT * FROM news n
        WHERE n.id=id
    `

    return news
}
