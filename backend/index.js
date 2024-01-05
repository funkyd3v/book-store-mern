import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/books', booksRouter);

// custom cors
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

app.get('/', (request, response) => {
    return response.status(200).send('Yahuuuu!');
});



mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App is connected to database!');
    app.listen(PORT, () => {
        console.log(`App is listenig to port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});