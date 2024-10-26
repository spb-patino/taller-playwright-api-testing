import { Page, Locator } from "@playwright/test";
import { DEMOGA_WEB_URL } from "../data/user.data";
import { UserCredentials } from "../types/user-credentials.type";

export class LoginPage {
  readonly page: Page;
  readonly usernameTextInput: Locator;
  readonly passwordTextInput: Locator;
  readonly loginButton: Locator;

  private readonly INVALID_CREDENTIALS_MESSAGE_SELECTOR = "text=Invalid username or password!";
  private readonly USERNAME_SELECTOR = "UserName";
  private readonly PASSWORD_SELECTOR = "Password";
  private readonly LOGIN_BUTTON_SELECTOR = "#login";

  constructor(page: Page) {
    this.page = page;
    this.usernameTextInput = page.getByPlaceholder(this.USERNAME_SELECTOR);
    this.passwordTextInput = page.getByPlaceholder(this.PASSWORD_SELECTOR);
    this.loginButton = page.locator(this.LOGIN_BUTTON_SELECTOR);
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
    await this.page.waitForSelector(this.INVALID_CREDENTIALS_MESSAGE_SELECTOR);
    return await this.page.isVisible(this.INVALID_CREDENTIALS_MESSAGE_SELECTOR);
  };
}
