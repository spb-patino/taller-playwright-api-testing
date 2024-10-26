import { Page, Locator } from "@playwright/test";
import { DEMOGA_WEB_URL } from "../data/user.data";
import { UserCredentials } from "../types/user-credentials.type";

export class LoginPage {
  readonly page: Page;
  readonly usernameTextInput: Locator;
  readonly passwordTextInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextInput = page.getByPlaceholder("UserName");
    this.passwordTextInput = page.getByPlaceholder("Password");
    this.loginButton = page.locator("#login");
  }

  openWebPage = async (): Promise<void> => {
    await this.page.goto(DEMOGA_WEB_URL);
  };

  login = async (credentials: UserCredentials): Promise<void> => {
    await this.usernameTextInput.fill(credentials.username);
    await this.passwordTextInput.fill(credentials.password);
  };

  clickOnLoginButton = async (): Promise<void> => {
    await this.loginButton.click();
  };

  isLoginErrorVisible = async (): Promise<boolean> => {
    return await this.page.isVisible("text=Invalid username or password!");
  };
}
