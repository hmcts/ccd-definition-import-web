import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CaseContext } from '../../domain/case/case.context';
import '../../../style/app.scss';

@Component({
  templateUrl: './import.html'
})
export class ImportComponent implements OnInit {
  private importForm: FormGroup;
  private case: File;
  private error: string;
  private submitted = false;
  private imported = false;

  constructor(private caseContext: CaseContext) {}

  ngOnInit(): void {
    this.importForm = new FormGroup({
      'file': new FormControl('')
    });
  }

  fileChangeEvent(fileInput: any) {
    this.submitted = false;
    this.imported = false;
    if (fileInput.target.files[0]) {
      this.case = fileInput.target.files[0];
    } else {
      this.case = null;
    }
  }

  onClick() {
    this.submitted = false;
    this.imported = false;
  }

  importCase() {
    if (this.case && this.case.name.match('.xlsx$')) {
      this.caseContext.importCase(this.case).subscribe(result => {
        this.submitted = true;
        if (result >= 200 && result <= 299) {
          this.imported = true;
        }
      }, error => {
        this.submitted = true;
        if (error.status === 504) {
          this.error = 'Could not connect to the case importer, please try again later';
        } else if (error.status === 401 || error.status === 403) {
          this.error = ''; // don't tell'em anything they'll be redirected anyway
          this.submitted = false;
        } else if (error._body) {
          this.error = error._body;
        } else {
          this.error = 'A valid case definition must be provided';
        }
      });
    } else {
      this.submitted = true;
      this.error = 'A valid case definition must be provided';
    }
  }
}
