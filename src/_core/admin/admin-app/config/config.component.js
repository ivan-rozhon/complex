(function () {
    'use strict';

    angular.module('config.configComponent', [])
        .component('npcConfig', {
            templateUrl: 'config/config.component.html',
            controller: ConfigController
        });

    ConfigController.$inject = [];
    function ConfigController() {
        let $ctrl = this;

        $ctrl.editorData = '<blockquote><!--block--><span style="color: rgb(244, 67, 54);">red text</span></blockquote><div><!--block--><br><a href="https://github.com/sachinchoolur/angular-trix">trix editor</a><br><br></div><center><pre><!--block-->&lt;code awesome="true"&gt;&lt;/code&gt;</pre></center><div><!--block--><br></div><blockquote><!--block-->Quoted <em>text italic</em><br>and <strong>bold</strong></blockquote><div><!--block--><br></div><ul><li><h3><!--block-->T3</h3><ul><li><!--block-->2nd level <u style="color: rgb(76, 175, 80);">bullet</u></li></ul></li></ul><div><!--block--><del>strikethrough text</del></div>';

        $ctrl.editorData2 = '<div><!--block--><span style="color: rgb(244, 67, 54);">red text</span><br><br><a href="http://sachinchoolur.github.io/angular-trix/">trix editor</a><br><br></div><pre><!--block-->&lt;code awesome="true"&gt;&lt;/code&gt;</pre><div><!--block--><br></div><blockquote><!--block-->Quoted <em>text italic<br></em>and<strong> bold</strong></blockquote><ul><li><h3><!--block-->T3</h3><ul><li><!--block-->2nd level <span style="color: rgb(76, 175, 80);"><u>bullet</u></span></li></ul></li></ul><div><!--block--><del>strikethrough text</del></div>';
    }
})();