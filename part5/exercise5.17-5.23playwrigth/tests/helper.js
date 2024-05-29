const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, blog) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByTestId("titleTest").fill(blog.title);
  await page.getByTestId("authorTest").fill(blog.author);
  await page.getByTestId("urlTest").fill(blog.url);
  await page.getByRole("button", { name: "create" }).click();
  await page.waitForSelector(".success");
};

const blogs = [
  {
    title: "Anxios parents are one who need help",
    author: "new york time",
    url: "http://url.com",
  },
  {
    title: "Anxios parents are one who need help",
    author: "new york time",
    url: "http://url.com",
  },
];

export { loginWith, createBlog, blogs };
