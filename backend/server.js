import express from 'express';
import {config} from 'dotenv';
import db from './startups/db.js';
import route from './startups/route.js';

const app = express();

config();
db();
route(app)

const port = process.env.PORT || 8081;
app.listen(port, ()=>{
    console.log(`server listening on ${port}`);
})


