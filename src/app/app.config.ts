import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppConfig {

  private static readonly CONFIG_PATH = '/config.json';

  private config: Config;

  constructor(private http: Http) {}

  public load(): Promise<void> {
    console.log('Loading app config...');

    return new Promise<void>((resolve, reject) => {
      this.http
        .get(AppConfig.CONFIG_PATH)
        .map(response => response.json())
        .catch((error: any): any => {
          console.error('Configuration file "config.json" could not be read');
          reject();
          return Observable.throw(error.json().error || 'Server error');
        })
        .subscribe((config: Config) => {
          this.config = config;
          console.log('Loading app config: OK');
          resolve();
        });
    });
  }

  public getLoginUrl(): string {
    return this.config.login_url;
  }

  public getLogoutUrl(): string {
    return this.config.logout_url;
  }

  public getDefinitionImportUrl() {
    return this.config.definition_import_url;
  }

  public getOAuth2TokenEndpointUrl() {
    return this.config.oauth2_token_endpoint_url;
  }

  public getOAuth2ClientId() {
    return this.config.oauth2_client_id;
  }
}

class Config {
  login_url: string;
  logout_url: string;
  definition_import_url: string;
  oauth2_token_endpoint_url: string;
  oauth2_client_id: string;
}
