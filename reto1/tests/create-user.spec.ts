// Importamos los módulos necesarios
import { test, expect } from '@playwright/test';

import { userData } from '../data/user.data';
import { createUser } from '../api/create-user.api';

import { UserCredentials } from '../types/user-credentials.type';

import { ProfilePage } from '../pages/profile.page';
import { LoginPage } from '../pages/login.page';

const BASE_URL = 'https://demoqa.com';
const userIdProperty= 'userID';

let userCredentials: UserCredentials;

test.describe('DemoQA User Flow', () => {

  test.beforeEach(async ({request} ) => {

    const newUser = await createUser(request, userData, BASE_URL);
    expect(newUser.response.ok()).toBeTruthy();

    const responseBody = await newUser.response.json();
    userCredentials = {
      username: newUser?.user?.userName,
      password: newUser?.user?.password,
      userID: responseBody.userID
    };
  });

  test('User Login, Delete, and Validation', async ({ page }) => {

    test.slow();
    
    const loginPage: LoginPage = new LoginPage(page);
    const profilePage: ProfilePage = new ProfilePage(page);

    await loginPage.openWebPage();
    await loginPage.login(userCredentials);
    await page.screenshot({ path: `evidences/01-use-credentials.png` });
    await loginPage.clickOnLoginButton();
    await page.screenshot({ path: `evidences/02-login-successful.png` });

    await profilePage.clickOnDeleteUser()
    await profilePage.clickOnConfirmationButton()
    await profilePage.clickOnNotificationAlert()

    await loginPage.login(userCredentials);

    const isLoginErrorVisible= await loginPage.isLoginErrorVisible();
    expect(isLoginErrorVisible).toBeTruthy();
  });
});