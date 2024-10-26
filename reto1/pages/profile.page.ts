import { Page, Locator } from '@playwright/test';

export class ProfilePage {

    readonly page: Page;
    readonly profileHeader: Locator;
    readonly deleteButton: Locator;
    readonly confirmDeleteButton: Locator;
    readonly alertButton: Locator;

    private readonly PROFILE_HEADER_SELECTOR = '.profile-header';
    private readonly DELETE_RECORD_SELECTOR  = 'Delete Account';
    private readonly CONFIRM_DELETE_SELECTOR   = 'OK';

    constructor(page:Page) {
      this.page = page;
      this.profileHeader       = page.locator(this.PROFILE_HEADER_SELECTOR);
      this.deleteButton        = page.getByRole('button', { name: this.DELETE_RECORD_SELECTOR })
      this.confirmDeleteButton = page.getByRole('button', { name:  this.CONFIRM_DELETE_SELECTOR});
    }
  
    async clickOnDeleteUser() : Promise<void> {
      await this.deleteButton.click();
    }
    
    async clickOnConfirmationButton() : Promise<void> {
      this.page.once('dialog', dialog => {
        dialog.dismiss().catch(() => {});
      });
      await this.confirmDeleteButton.click();
    }
  }