// Styles
import '../styles/web.scss';

(() => {
    // Enable tooltips everywhere
    $(() => {
        $('[data-toggle="tooltip"]').tooltip();
    });
})();

// ES6 features
// import * as es6 from './es6';

// RxJS features
import * as rxjs from './rxjs';