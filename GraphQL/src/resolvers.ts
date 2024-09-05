interface Book {
  id: string;
  title: string;
  author: string;
}

const books: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

export const resolvers = {
  Query: {
    book: (_, { id }: { id: string }): Book | undefined =>
      books.find((book) => book.id === id),
    books: (): Book[] => books,
  },
  Mutation: {
    addBook: (
      _,
      { title, author }: { title: string; author: string }
    ): Book => {
      const newBook = {
        id: String(books.length + 1),
        title,
        author,
      };
      books.push(newBook);
      return newBook;
    },
  },
};
