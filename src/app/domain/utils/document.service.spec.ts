
import { DocumentService } from './document.service';

describe('Document Service', () => {

  let documentService: DocumentService;

  beforeEach(() => {
    documentService = new DocumentService();
  });

  it('should be created', () => {
    expect(documentService).toBeTruthy();
  });
});
