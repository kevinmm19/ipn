'use strict';

var APP = window.APP = window.APP || {};

APP.blog = (function () {

    var bindEventsToUI = function () {

    };

    var init = function () {
        // uncomment the following line to access the DOM element invoking this component
        // var element = arguments[0];
        console.log('APP.blog');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());