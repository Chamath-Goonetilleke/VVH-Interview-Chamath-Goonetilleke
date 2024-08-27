import cors from 'cors';
import bodyParser from 'body-parser'
import task from '../routes/TaskRoutes.js'
import user from '../routes/UserRoutes.js'

export default function(app){
    app.use(cors());
    app.use(bodyParser.json())
    app.use("/auth", user)
    app.use("/api/task", task)
}