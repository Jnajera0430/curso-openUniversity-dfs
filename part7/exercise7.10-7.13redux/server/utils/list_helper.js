const dummy = () => {
  return 1;
};

const totalLikes = (blogs = []) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.length ? blogs.reduce(reducer, 0) : 0;
};

const totalBlogs = (blogs = []) => blogs.length;

const favoriteBlog = (blogs = []) => {
  if (!blogs.length) return null;
  const reducer = (maxLikesBlog, blog) =>
    blog.likes > maxLikesBlog.likes ? blog : maxLikesBlog;
  const { author, likes, title } = blogs.reduce(reducer, blogs[0]);
  return { author, likes, title };
};

const mostBlogs = (blogs = []) => {
  if (!blogs.length) return null;
  let listMaxBlogAuthor = [];
  let firtsData = true;
  for (const blog of blogs) {
    const { author } = blog;

    if (firtsData) {
      listMaxBlogAuthor = listMaxBlogAuthor.concat({ author, blogs: 1 });
      firtsData = false;
      continue;
    }

    const foundAuthor = listMaxBlogAuthor.find(
      (authorBlog) => authorBlog.author === author
    );

    if (foundAuthor) {
      foundAuthor.blogs += 1;
      continue;
    }

    listMaxBlogAuthor = listMaxBlogAuthor.concat({ author, blogs: 1 });
  }

  const reducer = (maxBlogsAuthor, authorBlog) =>
    authorBlog.blogs > maxBlogsAuthor.blogs ? authorBlog : maxBlogsAuthor;

  return listMaxBlogAuthor.reduce(reducer, listMaxBlogAuthor[0]);
};

const mostLikes = (blogs = []) => {
  if (!blogs.length) return null;
  let listAuthorLikes = [];
  let firtsData = true;

  for (const blog of blogs) {
    const { author, likes } = blog;
    if (firtsData) {
      listAuthorLikes = listAuthorLikes.concat({ author, likes });
      firtsData = false;
      continue;
    }
    const foundAuthor = listAuthorLikes.find(
      (authorLikes) => author === authorLikes.author
    );

    if (foundAuthor) {
      foundAuthor.likes += likes;
      continue;
    }

    listAuthorLikes = listAuthorLikes.concat({ author, likes });
  }

  const reducer = (maxLikesAuthor, authorLikes) =>
    authorLikes.likes > maxLikesAuthor.likes ? authorLikes : maxLikesAuthor;

  return listAuthorLikes.reduce(reducer, listAuthorLikes[0]);
};

module.exports = {
  dummy,
  totalLikes,
  totalBlogs,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
