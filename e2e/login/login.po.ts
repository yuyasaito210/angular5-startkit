import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-login .button-form-group button')).getText();
  }

  login(creds: any) {
	  var email = element(by.css('input[name="email"]'));
    email.clear().sendKeys(creds.email);

    var password =  element(by.css('input[name="password"]'));
    password.clear().sendKeys(creds.pwd);

    var submit = element(by.css('app-login button'));
    submit.click();
  }

  loginFail() {
		var EC = browser.ExpectedConditions;
		browser.wait(EC.presenceOf(element(by.css('.alert-danger'))), 3000);
  }

  loginSuccess() {
	  var EC = browser.ExpectedConditions;
		browser.wait(EC.urlContains('/search'), 2000);
  }
}
