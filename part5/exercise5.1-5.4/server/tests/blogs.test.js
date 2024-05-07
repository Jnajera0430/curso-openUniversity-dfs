const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];
const blogsBigger = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
const blogsEmpty = [];

test("dummy returns one", () => {
  const result = listHelper.dummy(blogsEmpty);
  assert.strictEqual(result, 1);
});

describe("excercise 4.4 total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalBlogs(blogsEmpty);
    assert.strictEqual(result, blogsEmpty.length);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalBlogs(blogsBigger);
    assert.strictEqual(result, blogsBigger.length);
  });
});

describe("Excercise 4.5 total likes", () => {
  test("blogs with more likes", () => {
    const valueExpect = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    const result = listHelper.favoriteBlog(blogsBigger);
    assert.deepStrictEqual(result, valueExpect);
  });
});

describe("excercise 4.6 total blogs", () => {
  test("author with most blogs", () => {
    const valueExpect = {
      author: "Robert C. Martin",
      blogs: 3,
    };

    const result = listHelper.mostBlogs(blogsBigger);

    assert.deepStrictEqual(result, valueExpect);
  });
});

describe("exercise 4.7 most likes", () => {
  test("author with most likes", () => {
    const valueExpect = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };

    const result = listHelper.mostLikes(blogsBigger);

    assert.deepStrictEqual(result, valueExpect);
  });
});
