# case-definition-import-web [![Build Status](https://travis-ci.org/hmcts/ccd-definition-import-web.svg?branch=master)](https://travis-ci.org/hmcts/ccd-definition-import-web)

An Angular front-end for importing case definition templates in Core Case Data.

## Quick start

```bash
git clone https://github.com/hmcts/ccd-definition-import-web.git
cd ccd-definition-import-web
yarn install
yarn start
```
go to [http://localhost:3452/import](http://localhost:3452/import) in your browser to start importing.

## Table of Contents

* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Developing](#developing)
    * [Testing](#testing)
    * [Production](#production)
    * [Documentation](#documentation)
    * [Seed](#seed)
* [License](#license)

## Getting Started

### Dependencies

What you need to run this app:
* `node` and `yarn`
* Ensure you're running Node (`v6.x.x`+) and NPM (`3.x.x`+)
* **IdAM service** (key `login_url` in `src/public/config.json`)
* **CCD API Gateway** instance (key `api_url` in `src/public/config.json`)
* **CCD Definition Store app** (through API Gateway)

### Installing

* `clone` the repository
* `yarn install` to install all dependencies

### Developing

After you have installed all dependencies you can now start developing with:

* `yarn start`

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The application can be checked at `http://localhost:3452`.

As an alternative, you can work using Hot Module Replacement (HMR):

* `yarn start:hmr`

And you are all set! You can now modify your components on the fly without having to reload the entire page.

### Testing

#### 1. Unit Tests

* single run: `yarn test`
* live mode (TDD style): `yarn test-watch`

#### 2. End-to-End Tests (aka. e2e, integration)

* single run:
  * in a tab, *if not already running!*: `yarn start`
  * in a new tab: `yarn webdriver-start`
  * in another new tab: `yarn e2e`
* interactive mode:
  * instead of the last command above, you can run: `yarn e2e-live`
  * when debugging or first writing test suites, you may find it helpful to try out Protractor commands without starting up the entire test suite. You can do this with the element explorer.
  * you can learn more about [Protractor Interactive Mode here](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

### Production

To build your application, run:

* `yarn build`

You can now go to `/dist` and deploy that to your server!

### Documentation

You can generate api docs (using [TypeDoc](http://typedoc.org/)) for your code with the following:

* `yarn docs`

### Seed

This project is based on the [angular-webpack](https://github.com/preboot/angular-webpack) seed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
