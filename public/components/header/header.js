'use strict';

var APP = window.APP = window.APP || {};

APP.header = (function () {

    var scrollHandler = function () {
        var $header = $('.js-header');
        var $title = $('.js-hero-title');
        var offset = $header.offset().top + 60;
        if ($title.offset().top <= offset) {
            $header.addClass('header--scroll');
        } else {
            $header.removeClass('header--scroll');
        }
    };

    var bindEventsToUI = function () {
        $(window).on('scroll', scrollHandler);
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
