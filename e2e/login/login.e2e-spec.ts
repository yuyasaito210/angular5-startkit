import { LoginPage } from './login.po';

describe('coding-test-aaron-little LoginPage', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should show login form', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Sign In');
  });

	it('should not login with wrong password', () => {
  	page.login({ email: 'fake@example.com', pwd: 'fakepwd' });
  	page.loginFail();
  });

  it('should be able to login', function() {
  	page.login({ email: 'someone@example.com', pwd: 'password' });
  	page.loginSuccess();
	});
});
