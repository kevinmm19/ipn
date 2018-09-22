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
                save(data) {
                    try {
                        $.ajax({
                            url: '/user',
                            method: 'POST',
                            dataType: 'json',
                            data: data
                        }).done(function(res) {
                            window.location.href = res.url;
                        }).fail(function (error) {
                            window.location.href = '/status/e';
                        });
                    } catch (err) {
                        window.location.href = '/status/e';
                    }
                },
                send(e) {
                    try {
                        e.preventDefault();
                        $('.js-submit').prop('disabled', true);
                        var self = this;
                        if(this.errors.length) {
                            $('.js-form').removeClass('form--error');
                            $('.js-name').removeClass('form__error-mark');
                            $('.js-email').removeClass('form__error-mark');
                            $('.js-phone').removeClass('form__error-mark');
                            $('.js-message').removeClass('form__error-mark');
                            $('.js-captcha').removeClass('form__error-mark');
                        }
                        this.errors = [];
                        let data = {
                            name: this.form__name,
                            email: this.form__email,
                            phone: this.form__phone,
                            message: this.form__message,
                            captcha: grecaptcha.getResponse()
                        };
                        if (data.name === '') {
                            this.errors.push('Indique su nombre completo.');
                            $('.js-name').addClass('form__error-mark');
                        }
                        if (data.email === '' && !this.validEmail(data.email)) {
                            this.errors.push('Indique un email válido.');
                            $('.js-email').addClass('form__error-mark');
                        }
                        if (data.phone === '' || data.phone.length < 8) {
                            this.errors.push('Indique su número telefónico.');
                            $('.js-phone').addClass('form__error-mark');
                        }
                        if (data.message === '') {
                            this.errors.push('Escriba un mensaje.');
                            $('.js-message').addClass('form__error-mark');
                        }
                        if (!data.captcha.length) {
                            this.errors.push('El CAPTCHA debe marcarse.');
                            $('.js-captcha').addClass('form__error-mark');
                        }
                        if(!this.errors.length) {
                            $.ajax({
                                url: '/captcha',
                                method: 'POST',
                                dataType: 'json',
                                data: {
                                    response: data.captcha
                                }
                            }).done(function(res) {
                                if(res.success) {
                                    self.save(data);
                                } else {
                                    this.errors.push('El CAPTCHA ha fallado. Favor intentarlo nuevamente.');
                                    this.scrollErrorTop(true);
                                }
                            }).fail(function (error) {
                                this.errors.push('El CAPTCHA ha fallado. Favor intentarlo nuevamente.');
                                this.scrollErrorTop(true);
                            });
                        } else {
                            this.scrollErrorTop(false);
                        }
                    } catch (err) {
                        window.location.href = '/status/e';
                    }
                },
                scrollErrorTop: function (errorCAPTCHA) {
                    if(errorCAPTCHA) {
                        $('.js-captcha').addClass('form__error-mark');
                    }
                    $('.js-form').addClass('form--error');
                    $('html, body').scrollTop($('.js-form').offset().top-60);
                    $('.js-submit').prop('disabled', false);
                },
                validEmail: function (email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                }
            }
        });
    };

    var bindEventsToUI = function () {
        vueForm();
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
