const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
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

      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async ({ id }) => {
      const authorBooks = await Book.countDocuments({ author: id });
      return authorBooks;
    },
  },
  Mutation: {
    addBook: async (_root, args, context) => {
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
        throw new GraphQLError("Author is required", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
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
        const bookCreated = {
          ...bookToCreate.toObject(),
          id: bookToCreate._id.toString(),
          author,
        };
        pubsub.publish("BOOK_ADDED", { bookAdded: bookCreated });
        return bookCreated;
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
