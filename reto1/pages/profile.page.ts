import { Page, Locator } from '@playwright/test';
import { DEMOGA_WEB_URL } from '../data/user.data';
import { UserCredentials } from '../types/user-credentials.type';

export class ProfilePage {

    readonly page: Page;
    readonly profileHeader: Locator;
    readonly deleteButton: Locator;
    readonly confirmDeleteButton: Locator;
    readonly alertButton: Locator;

    private readonly PROFILE_HEADER_SELECTOR = '.profile-header';
    private readonly DELETE_RECORD_SELECTOR  = 'Delete Account';
    private readonly CONFIRM_DELETE_SELECTOR = '#confirm-delete';
    private readonly OK_BUTTON_SELECTOR   = 'OK';

    constructor(page:Page) {
      this.page = page;
      this.profileHeader       = page.locator(this.PROFILE_HEADER_SELECTOR);
      this.deleteButton        = page.getByRole('button', { name: this.DELETE_RECORD_SELECTOR })
      this.confirmDeleteButton = page.getByRole('button', { name:  this.OK_BUTTON_SELECTOR});
      this.alertButton         = page.locator(this.OK_BUTTON_SELECTOR);
      
      page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
    }
  
    async clickOnDeleteUser() : Promise<void> {
      await this.deleteButton.click();
    }
    
    async clickOnConfirmationButton() : Promise<void> {
      await this.confirmDeleteButton.click();
    }
    
    async clickOnNotificationAlert() : Promise<void> {
      await this.alertButton.click();
    }
  }