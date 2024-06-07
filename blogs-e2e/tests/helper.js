const loginWith = async (page, username, password) => {
    const usernameInput = page.getByTestId("username-input");
    const passwordInput = page.getByTestId("password-input");
    const submitButton = page.getByText("Submit");
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await submitButton.click();
}

const createBlog = async (page, title, author, text) => {
    const titleInput = await page.getByTestId("title-input");
    const authorInput = await page.getByTestId("author-input");
    const urlInput = await page.getByTestId("url-input");

    await titleInput.fill(title);
    await authorInput.fill(author);
    await urlInput.fill(text);
    const submitButton = await page.getByText("create");
    await submitButton.click();
}

const createInitialBlogs = async (request) => {
    // Create a user, login and post blogs
    const testUser = {
        data: {
            username: "testUser",
            name: "test user",
            password: "test1234"
        }
    }
    const testUserBlog = {
        title: "initial blog",
        author: "initial user",
        url: "www.initialtestblog.url",
        likes: 15
    }
    // Create new user
    await request.post("/api/users/", testUser);

    // Login with the created user
    const loginResponse = await request.post("/api/login", {
        data: {
            username: "testUser", password: "test1234"
        }
    });

    // Turn JSON string into JS object
    const loginData = await loginResponse.json();
    // Extract token from login response
    const token = loginData.token;
    await request.post("/api/blogs", {
        data: testUserBlog,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

module.exports = { loginWith, createBlog, createInitialBlogs }