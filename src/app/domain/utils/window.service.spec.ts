import { WindowService } from './window.service';

describe('Window Service', () => {

  let windowService: WindowService;

  beforeEach(() => {
    windowService = new WindowService();
  });

  it('should be created', () => {
    expect(windowService).toBeTruthy();
  });
});
