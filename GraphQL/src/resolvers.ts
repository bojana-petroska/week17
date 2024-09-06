import fetch from 'node-fetch';
import  books  from './data.js'
import { Book, BookInput } from "./types.js";
import { ApolloError } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql'

// const dateScalar = new GraphQLScalarType({
//   name: "Date",
//   description: "date custom scalar type",
//   sterilize(value: Date) {
//     return value.toISOString
//   },
//   parseValue(value: string) {

//   }
// })

export const resolvers = {
  // Date: 
  Query: {
    book: (_, { id }: { id: string }): Book | undefined =>
      books.find((book) => book.id === id),
    books: (): Book[] => books,
    getTODOAPIData: async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        return data.todos;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
  Mutation: {
    addBook: (_, { input }: { input: BookInput }): Book => {
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
    deleteBook: (_, { id }: { id: string }): Book => {
      const index = books.findIndex((book) => book.id === id);
      if (index !== -1) {
        const [deletedBook] = books.splice(index, 1);
        return deletedBook;
      } else {
        throw new ApolloError('book not found');
      }
    },
    updateBook: (
      _,
      { id, title, author }: { id: string; title: string; author: string }
    ): Book => {
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
