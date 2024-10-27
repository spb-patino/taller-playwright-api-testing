// Importamos los módulos necesarios
import { test, expect } from '@playwright/test';

import { userDummy } from '../data/test.data';
import { createUser } from '../api/create-user.request';

import { UserCredentials } from '../types/user-credentials.type';

import { ProfilePage } from '../pages/profile.page';
import { LoginPage } from '../pages/login.page';

let userCredentials: UserCredentials;

test.describe('DemoQA User Flow', () => {

  test.beforeEach(async ({request}) => {
    const {response, newUserAccount} = await createUser(request, userDummy);
    expect(response.ok()).toBeTruthy();
    userCredentials = newUserAccount;
  });

  test('User Login, Delete, and Validation', async ({ page }) => {
    test.slow();
    
    const loginPage: LoginPage = new LoginPage(page);
    const profilePage: ProfilePage = new ProfilePage(page);

    await loginPage.openWebPage();
    await loginPage.login(userCredentials);
    await page.screenshot({ path: `evidences/01-use-credentials.png`});

    await loginPage.clickOnLoginButton();
    await page.screenshot({ path: `evidences/02-login-successful.png` });
    
    await profilePage.clickOnDeleteUser()
    await profilePage.clickOnConfirmationButton()
    await page.screenshot({ path: `evidences/03-delete-user-confirmation.png` });
    
    await loginPage.login(userCredentials);
    await loginPage.clickOnLoginButton();
    
    const isLoginErrorVisible= await loginPage.isLoginErrorVisible();
    expect(isLoginErrorVisible).toBeTruthy();
    await page.screenshot({ path: `evidences/04-login-invalid-credentials.png` });
  });
});