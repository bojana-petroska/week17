const books = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];
export const resolvers = {
    Query: {
        book: (id) => books.find((book) => book.id === id),
        books: () => books,
    },
};
