'use strict';

var APP = window.APP = window.APP || {};

APP.form = (function () {

    var vueForm = function () {
        const vue = new Vue({
            el: '.form',
            data() {
                return {
                    form__name: '',
                    form__email: '',
                    form__number: '',
                    form__message: '',
                }
            },
            methods: {
                send() {
                    let data = {
                        form__name: this.form__name,
                        form__email: this.form__email,
                        form__number: this.form__number,
                        form__message: this.form__message,
                    };
                    console.log('Inside Vue send function: ' + data.form__name + ' ' + data.form__email + ' ' + data.form__number + ' ' + data.form__message);
                    //emailjs.send("<YOUR SERVICE ID>","<YOUR TEMPLATE ID>", data)
                    // .then(function(response) {
                    //     if(response.text === 'OK'){
                    //         alert('El correo se ha enviado de forma exitosa');
                    //     }
                    //    console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
                    // }, function(err) {
                    //     alert('Ocurrió un problema al enviar el correo');
                    //     console.log("FAILED. error=", err);
                    // });
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
