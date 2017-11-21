# [Complex]

Experimental web dev pack, that contains:
- PHP and Javascript/TypeScript (Angular) web CMS
- REST API - authorization (JWT), data manipulation
- Local development environment (Webpack, PHP Webserver)

## Prerequisites
[Node.js and npm](https://nodejs.org/en/download/) (Node 6.9.0 or higher, together with NPM 3 or higher) if they are not already on your machine.

## Install
```
npm install
```

## Build
```
npm run build
```


## Local development server

Run build with watch:
```
npm start
```

After successful build, run (in separate terminal):

(PHP ~7.1.0 required)
```
npm run serve
```

Navigate to `http://localhost:8000/`.

## News
- Webpack 3 build
- Angular 4 Admin App 2 in development (will replace Admin 1)
- Removed: Bower (deprecated) & Gulp, Admin 1

## Near future
- Angular 5
- UIkit for web and admin