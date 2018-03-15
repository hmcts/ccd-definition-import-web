import { APP_INITIALIZER, ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { createNewHosts, removeNgStyles } from '@angularclass/hmr';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';
import { ImportModule } from './feature/import/import.module';
import { DataAccessService } from './data/data-access.service';
import { CaseContext } from './domain/case/case.context';
import { WindowService } from './domain/utils/window.service';
import { DocumentService } from './domain/utils/document.service';
import { OAuth2RedirectModule } from './feature/oauth2/oauth2-redirect.module';
import { OAuth2Service } from './domain/auth/oauth2.service';
import { HttpService } from './domain/http/http.service';
import { HttpErrorService } from './domain/http/http-error.service';
import { AuthService } from './domain/auth/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    ImportModule,
    OAuth2RedirectModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
    DataAccessService,
    CaseContext,
    WindowService,
    DocumentService,
    AuthService,
    OAuth2Service,
    HttpService,
    HttpErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
