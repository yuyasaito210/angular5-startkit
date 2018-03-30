import { SearchPage } from './search.po';

describe('coding-test-aaron-little SearchPage', () => {
  let page: SearchPage;

  beforeEach(() => {
    page = new SearchPage();
  });

  it('should show search input box', () => {
    page.navigateTo();
    expect(page.getKeywordInput().isPresent()).toBe(true);
  });

  it('should run search', () => {
    page.search('query');
    page.searchSuccess();
  });
});
