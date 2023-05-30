import * as dotenv from 'dotenv'
// load environment variables
dotenv.config();
import { DEBUG, PORT } from 'config';
import express from "express";
import morgan from "morgan";
import setupRoutes from 'routes';

const port = PORT // default port to listen
const app = express();


app.use(morgan(DEBUG ? 'dev' : 'combined'))
// middlewares for parsing json and urlencoded form data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// health check endpoint
app.get("/", (req, res) => {
    res.status(200).send("Ok");
});

// adds all routes to the express app
setupRoutes(app);

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});