const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { gql } = require("apollo-server");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const { default: mongoose } = require("mongoose");
const User = require("./models/user");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String
      published: Int
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String, setBornTo: Int): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          filter.author = author._id;
        } else {
          return [];
        }
      }

      if (args.genre) {
        filter.genres = args.genre;
      }

      const listBooks = await Book.find(filter).populate("author");

      return listBooks;
    },
    authorCount: async () => Author.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({});
      const authorPromises = authors.map(async (author) => {
        const authorBooks = await Book.find({ author: author._id });
        return { ...author.toObject(), bookCount: authorBooks.length };
      });
      return Promise.all(authorPromises);
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (args.title.length < 2) {
        throw new GraphQLError("The title must have at least two characters", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      if (args.author.length < 4) {
        throw new GraphQLError();
      }
      const bookFound = await Book.findOne({ title: args.title });
      if (bookFound) {
        throw new GraphQLError("Title of book must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }

      const authorFound = await Author.findOne({ name: args.author });
      try {
        let author;
        if (!authorFound) {
          author = new Author({
            name: args.author,
          });
          await author.save();
        } else {
          author = authorFound;
        }

        const bookToCreate = new Book({ ...args, author: author._id });
        await bookToCreate.save();

        return { ...bookToCreate.toObject(), author: author.toObject() };
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) {
          throw new GraphQLError("Author not found", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
            },
          });
        }
        if (args.setBornTo) {
          author.born = args.setBornTo;
          author.save();
        }

        return author;
      } catch (error) {
        throw new GraphQLError("editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    createUser: async (root, args) => {
      if (args.username.length < 4) {
        throw new GraphQLError("username must have at least two characters", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }

      if (!args.favoriteGenre) {
        throw new GraphQLError("The field favoriteGenre is required", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.favoriteGenre,
          },
        });
      }
      const userFound = await User.findOne({
        username: args.username,
      });

      if (userFound) {
        throw new GraphQLError("User must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }

      const user = new User({ ...args });
      await user.save();

      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
