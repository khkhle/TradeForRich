import {Hono} from './deps.js'
import { eta } from './deps.js';
import * as authenticationController from './services/authentication/authenticationController.js'
import * as homeController from './services/home/homeController.js'
import * as marketController from './services/market/marketController.js'
import * as newsController from './services/news/newsController.js'
import * as favoriteController from './services/favorite/favoriteController.js'

const app = new Hono();

app.get("/", (c) => c.redirect('/home'));
app.get('/home',homeController.getHome)
app.get("/markets", marketController.getMarkets);
app.get("/markets/:market",marketController.getMarkets)
app.get("/markets/:market/:code", marketController.getMarket)
app.get('/signup',(c)=>c.html(eta.render('body/signup.eta',{success:true})))
app.get('/signin',(c)=>c.html(eta.render('body/signin.eta',{success:true})))
app.get('/signout',authenticationController.signout)
app.get('/notfound',(c)=>c.text('404 not found'))
app.get('/allNews/:page',newsController.getAllNews)
app.get('/favorite',favoriteController.getFavorite)

app.post("/signup",authenticationController.signup)
app.post("/signin",authenticationController.signin)
app.post("/saveMarket/:market/:code/:page",marketController.saveMarket)
app.post("/unsaveMarket/:market/:code/:page",marketController.unsaveMarket)

Deno.serve({ port: 3000 }, app.fetch);