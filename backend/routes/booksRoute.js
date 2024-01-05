import express from 'express';
import { Book } from '../models/bookModel.js';

const booksRouter = express.Router();


// create a new book
booksRouter.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            response.status(400).send({
                message: 'Need all required filelds: title, author, publishyear'
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }

        const book = await Book.create(newBook);

        return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
    }
});

// get all books
booksRouter.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
    }
});

// get a book by id
booksRouter.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
    }
});

// update a book
booksRouter.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear 
        ) {
            response.status(400).json({
                message: 'need a filed to update like title, author, publishYear'
            });
        }
        const { id } = request.params;
        const book = await Book.findByIdAndUpdate(id, request.body);

        if (!book) {
            return response.status(404).json({
                message: 'Book not found!'
            });
        }
        return response.status(200).json({
            message: 'Book updated successfully',
            data: book
        });
    } catch (error) {
        console.log(error.message);
    }
});

// delete a book
booksRouter.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            response.status(404).json({
                message: 'Book not found'
            });
        }

        return response.status(200).json({
            message: 'Book deleted!'
        });
    } catch (error) {
        console.log(error.message);
    }
});

export default booksRouter;