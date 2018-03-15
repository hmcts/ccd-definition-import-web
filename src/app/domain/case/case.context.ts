import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { DataAccessService } from '../../data/data-access.service';
import { Response } from '@angular/http';
import { AppConfig } from '../../app.config';

@Injectable()
export class CaseContext {

  constructor(
    private dataAccess: DataAccessService,
    private appConfig: AppConfig) {
  }

  public importCase(caseFile: File) {
    const formData = new FormData();
    formData.append('file', caseFile);

    return this.dataAccess.POSTMULTIPART(this.appConfig.getDefinitionImportUrl() + '/import/', formData)
      .map((response: Response) => {
        return response.status;
      });
  };
}
