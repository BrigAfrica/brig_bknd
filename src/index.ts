import * as dotenv from 'dotenv'
dotenv.config();
import { DEBUG, PORT, corsOptions } from 'config';
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import 'services/passport'
import baseRouter from 'routes';


const port = PORT // default port to listen
const app = express();

app.use(helmet())
//app.use(cors(corsOptions))
app.use(morgan(DEBUG ? 'dev' : 'combined'))
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
}))
// middlewares for parsing json and urlencoded form data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// health check endpoint
app.get("/", (req, res) => {
    res.status(200).send("Ok");
});

// adds all routes to the express app
app.use(baseRouter);

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});