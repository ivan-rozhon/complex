var concat = require('concat');

const files = [
  './dist/admin/runtime.js',
  './dist/admin/polyfills.js',
  // './dist/admin/scripts.js',
  './dist/admin/main.js'
];

concat(files, './dist/admin/admin-app.js');
