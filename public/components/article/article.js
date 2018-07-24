'use strict';

var APP = window.APP = window.APP || {};

APP.article = (function () {

    var bindEventsToUI = function () {
        $('.js-slick').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    };

    var init = function () {
        // uncomment the following line to access the DOM element invoking this component
        // var element = arguments[0];
        console.log('APP.article');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
