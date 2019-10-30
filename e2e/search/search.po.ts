import { browser, by, element } from 'protractor';

export class SearchPage {
  navigateTo() {
    return browser.get('/search');
  }

  getKeywordInput() {
    return element(by.css('app-search input[name="keyword"]'));
  }

  search(query: string) {
    const keyword =  element(by.css('input[name="keyword"]'));
    keyword.clear().sendKeys(query);

    const submit = element(by.css('.go-button-rectangle'));
    submit.click();
  }

  searchSuccess() {
    const EC = browser.ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.css('.search-result'))), 5000);
  }
}
