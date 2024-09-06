import fetch from 'node-fetch';
import books from './data.js';
import { ApolloError } from 'apollo-server-express';
export const resolvers = {
    Query: {
        book: (_, { id }) => books.find((book) => book.id === id),
        books: () => books,
        getTODOAPIData: async () => {
            try {
                const response = await fetch('https://dummyjson.com/todos');
                const data = await response.json();
                return data.todos;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        },
    },
    Mutation: {
        addBook: (_, { input }) => {
            const { title, author, genre } = input;
            const newBook = {
                id: String(books.length + 1),
                title,
                author,
                genre
            };
            books.push(newBook);
            return newBook;
        },
        deleteBook: (_, { id }) => {
            const index = books.findIndex((book) => book.id === id);
            if (index !== -1) {
                const [deletedBook] = books.splice(index, 1);
                return deletedBook;
            }
            else {
                throw new ApolloError('book not found');
            }
        },
        updateBook: (_, { id, title, author }) => {
            const index = books.findIndex((book) => book.id === id);
            if (index === -1) {
                throw new ApolloError('book not found');
            }
            books[index].title = title;
            books[index].author = author;
            return books[index];
        },
    },
};
