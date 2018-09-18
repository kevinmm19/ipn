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
                // find(data) {
                //     var self = this;
                //     $.ajax({
                //         url: '/contacto/?email=' + data.email,
                //         method: 'GET',
                //         dataType: 'json'
                //     }).done(function(res) {
                //         console.log('Find User count: ' + res);
                //         if(res.length) {
                //             console.log('User already existent! ' + res);
                //             //self.update(data);
                //         } else {
                //             console.log('User non existent! '+ res);
                //             //self.save(data);
                //         }
                //     }).fail(function (error) {
                //         console.log('Error: ' + error);
                //         console.log('GET User did not work!');
                //     });
                // },
                mail(data) {
                    $.ajax({
                        url: '/mail',
                        method: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function(res) {
                        console.log('Success: ' + res.success);
                        if(res.success) {
                            console.log('MAIL OK!');
                        }
                    }).fail(function (error) {
                        console.log('Error: ' + error);
                        console.log('MAIL did not work!');
                    });
                },
                save(data) {
                    $.ajax({
                        url: '/user',
                        method: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function(res) {
                        console.log('Success: ' + res.success);
                        if(res.success) {
                            //this.mail(data);
                            //console.log('MAIL worked! ' + res.success);
                            console.log('SAVE worked! ' + res.success + ' ' + res.url);
                            window.location.href = res.url;
                        } else {
                            console.log('Error: ' + res);
                            console.log('SAVE did not work!');
                            console.log('SAVE worked! ' + res.success + ' ' + res.url);
                            window.location.href = res.url;
                        }
                    }).fail(function (error) {
                        console.log('Error: ' + error);
                        console.log('SAVE crashed!');
                    });
                },
                send(e) {
                    e.preventDefault();
                    var self = this;
                    //$('.js-submit').prop('disabled', false);
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
                    console.log('Length: ' + this.errors.length);
                    console.log('Test: ' + !this.errors.length);
                    if(!this.errors.length) {
                        console.log('Inside Vue send function: ' + data.name + ' ' + data.email + ' ' + data.phone + ' ' + data.message);
                        $.ajax({
                            url: '/captcha',
                            method: 'POST',
                            dataType: 'json',
                            data: {
                                response: data.captcha
                            }
                        }).done(function(res) {
                            console.log('Success: ' + res.success);
                            if(res.success) {
                                self.save(data);
                            }
                        }).fail(function (error) {
                            console.log('Error: ' + error);
                            console.log('CAPTCHA did not work!');
                        });
                    } else {
                        //$('.js-form').addClass('form__error-container--active');
                        $('.js-form').addClass('form--error');
                        $('html, body').scrollTop($(".js-form").offset().top-60);
                        console.log(this.errors.map(x => console.log(x)));
                    }
                },
                // update(data) {
                //     $.ajax({
                //         url: '/contact',
                //         method: 'PUT',
                //         dataType: 'json',
                //         data: data
                //     }).done(function(res) {
                //         console.log('Success: ' + res.success);
                //         if(res.success) {
                //             this.mail(data);
                //             console.log('UPDATE worked!');
                //         } else {
                //             console.log('Error: ' + res);
                //             console.log('UPDATE did not work!');
                //         }
                //     }).fail(function (error) {
                //         console.log('Error: ' + error);
                //         console.log('CAPTCHA did not work!');
                //     });
                // },
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
