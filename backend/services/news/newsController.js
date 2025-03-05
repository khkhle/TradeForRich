import { eta } from "../../deps.js";
import * as newsService from "../news/newsService.js";
import * as sessionService from "../session/sessionService.js";

export const getAllNews = async (c) => {
    const user = await sessionService.getUserFromSession(c);
    const news = await newsService.getAllNews();

    const page = parseInt(c.req.param('page') || "1", 10);
    const pageSize = 3; // Number of articles per page
    const totalPages = Math.ceil(news.length / pageSize); // Calculate total pages

    // Ensure page is within valid range
    const currentPage = Math.max(1, Math.min(page, totalPages));
    
    // Calculate slice indices
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get only the news for the current page
    const paginatedNews = news.slice(startIndex, endIndex);

    let data = {
        news: paginatedNews, // Only send the paginated news
        page: currentPage,
        totalPages, // Send totalPages to handle pagination UI
    };

    if (user) {
        data.user = await user.toJson();
    }

    return c.html(eta.render('/body/allNews.eta', data));
};
