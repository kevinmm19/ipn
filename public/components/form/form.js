'use strict';

var APP = window.APP = window.APP || {};

APP.form = (function () {
    var vueForm = function () {
        const vue = new Vue({
            el: '.js-form',
            data() {
                return {
                    errors: [],
                    form__name: '',
                    form__email: '',
                    form__phone: '',
                    form__message: '',
                }
            },
            methods: {
                validEmail: function (email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                },
                send(e) {
                    e.preventDefault();
                    if(this.errors.length) {
                        $('.js-form').removeClass('form--error');
                        $('.js-name').removeClass('form__error-mark');
                        $('.js-email').removeClass('form__error-mark');
                        $('.js-phone').removeClass('form__error-mark');
                        $('.js-message').removeClass('form__error-mark');
                        $('.js-submit').removeAttr('disabled', 'disabled');
                    }
                    this.errors = [];
                    let data = {
                        name: this.form__name,
                        email: this.form__email,
                        phone: this.form__phone,
                        message: this.form__message,
                    };
                    if (data.name === '') {
                        this.errors.push('Indique su nombre completo.');
                        $('.js-name').addClass('form__error-mark');
                    }
                    if (data.email === '' && !this.validEmail(data.email)) {
                        this.errors.push('Indique un email válido.');
                        $('.js-email').addClass('form__error-mark');
                    }
                    if (data.phone === '' && data.phone.length > 7) {
                        this.errors.push('Indique su número telefónico.');
                        $('.js-phone').addClass('form__error-mark');
                    }
                    if (data.message === '') {
                        this.errors.push('Escriba un mensaje.');
                        $('.js-message').addClass('form__error-mark');
                    }
                    console.log('Length: ' + this.errors.length);
                    console.log('Test: ' + !this.errors.length);
                    if(!this.errors.length) {
                        // fetch(apiUrl + encodeURIComponent(this.name))
                        // .then(res => res.json())
                        // .then(res => {
                        // if (res.error) {
                        //     this.errors.push(res.error);
                        // } else {
                        //     // redirect to a new URL, or do something on success
                        //     alert('ok!');
                        // }
                        // });
                        alert('OK!');
                        $('.js-submit').attr('disabled', 'disabled');
                    } else {
                        //$('.js-form').addClass('form__error-container--active');
                        $('.js-form').addClass('form--error');
                        $('html, body').scrollTop($(".js-form").offset().top-60);
                        console.log(this.errors.map(x => console.log(x)));
                        console.log('Inside Vue send function: ' + data.name + ' ' + data.email + ' ' + data.phone + ' ' + data.message);
                        // var self = this;
                        // $.ajax({
                        //     url: '/items',
                        //     method: 'GET',
                        //     success: function (data) {
                        //         self.items = data;
                        //     },
                        //     error: function (error) {
                        //         console.log(error);
                        //     }
                        // });
                    }
                }
            }
        });
    };

    var bindEventsToUI = function () {
        vueForm();
    };

    var init = function () {
        // uncomment the following line to access the DOM element invoking this component
        // var element = arguments[0];
        console.log('APP.form');
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
