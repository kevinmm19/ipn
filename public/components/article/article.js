'use strict';

var APP = window.APP = window.APP || {};

APP.article = (function () {

    var bindEventsToUI = function () {
        $('.js-slick').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            accesibility: false
        });
    };

    var init = function () {
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
