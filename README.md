# [Complex]

Experimental web dev pack, that contains:
- PHP and Javascript (Angular) CMS
- REST API
- Local development environment (Gulp, Webpack)

## Install
```
npm install
bower install
```

## Build
Basic build & watch:
```
gulp
```
or separately:
```
gulp build
gulp watch
```
production:
```
gulp build -prod
```

## Local dev server
(PHP ~7.1.0 required)

After successful build:
```
gulp connect
```

## News & Near future
- Webpack 3
- Angular 4 Admin App
- Removing Bower (deprecated) & Gulp