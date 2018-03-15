import { AppConfig } from './app.config';
import { inject, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('AppConfig', () => {

  const LOGIN_URL = 'http://idam.reform/login';
  const LOGOUT_URL = 'http://gateway.ccd/logout';
  const API_URL = 'http://api.ccd.reform';
  const OAUTH2_TOKEN_ENDPOINT_URL = 'http://gateway.ccd.reform/oauth2';
  const OAUTH2_CLIENT_ID = 'some_client_id';

  const MOCK_CONFIG = {
    login_url: LOGIN_URL,
    logout_url: LOGOUT_URL,
    definition_import_url: API_URL,
    oauth2_token_endpoint_url: OAUTH2_TOKEN_ENDPOINT_URL,
    oauth2_client_id: OAUTH2_CLIENT_ID
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: XHRBackend, useClass: MockBackend },
        AppConfig
      ]
    });
  });

  describe('load()', () => {

    it('should load config from public/config.json',
      inject([AppConfig, XHRBackend], (appConfig: AppConfig, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(MOCK_CONFIG)
          })));
        });

        appConfig
          .load()
          .then(() => {
            expect(appConfig.getLoginUrl()).toEqual(LOGIN_URL);
            expect(appConfig.getLogoutUrl()).toEqual(LOGOUT_URL);
            expect(appConfig.getDefinitionImportUrl()).toEqual(API_URL);
            expect(appConfig.getOAuth2TokenEndpointUrl()).toEqual(OAUTH2_TOKEN_ENDPOINT_URL);
            expect(appConfig.getOAuth2ClientId()).toEqual(OAUTH2_CLIENT_ID);
          });
      }));
  });
});
