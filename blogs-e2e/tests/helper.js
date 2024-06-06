const loginWith = async (page, username, password) => {
    const usernameInput = page.getByTestId("username-input");
    const passwordInput = page.getByTestId("password-input");
    const submitButton = page.getByText("Submit");
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await submitButton.click();
}

module.exports = { loginWith }