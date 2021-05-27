import { ajaxify } from './ajaxify'

class Minicart {
    constructor() {
        return
    }

    init() {
        let doc = document
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)
        this.body = this.qs('body')
        this.cart_counter = this.qsa('.cart-counter ')
        this.firstload = false

        this.cart = {
            receiver: this.qs('.minicart__hold'),
            trg: this.qsa('.trg-cart'),
            close: this.qsa('.cart__close'),
            fader_close: this.qsa('.minicart__fader'),
            links: this.qsa('.cart a'),
            trg_close: null
        }


        this.insertCart()
    }





    //? _____________________ fetch drawer
    insertCart() {
        let that = this
        let cart_url = 'https://lemkus-staging.myshopify.com/cart' //STORY DOMAIN


        fetch(cart_url).then(function (response) {
            return response.text();
        })
            .then(function (html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                var cart_body = doc.querySelector('.page-cart__content')
                that.cart.receiver.appendChild(cart_body)
                that.verifyNew()
                that.onClick(cart_body)
                $(that.cart_counter).text($(cart_body).data('cartcounter'))
                ajaxify.removeItem(cart_body)
                
                setTimeout(function () { $('.add-cart-btns').removeClass('loading-item') }, 500);
                
            }).catch(function (err) {
                console.warn('Something went wrong.', err);
            });
    }




    //? - =========================  ON CLICK  ========================= -//
    //? - =========================  ON CLICK  ========================= -//
    onClick(el) {
        let that = this
        // ____ open cart
        $(this.cart.trg).click(function () {
            $(that.body).addClass('is-minicart')
        });

        // ____ open cart
        this.cart.close = el.querySelectorAll('.cart__close, .browse, .cart a')
        $(this.cart.close).add(this.cart.fader_close).click(function () {
            $(that.body).removeClass('is-minicart')
            console.log('remove cart');
        });
    }




    //? - =========================  VERIFY NEW  ========================= -//
    //? - =========================  VERIFY NEW  ========================= -//
    verifyNew() {
        if (!this.firstload) {
            this.firstload = true
        }
        else {
            console.log('verify');
            $('.page-cart__content').not($('.page-cart__content').eq(-1)).remove()
            $(this.cart.trg).trigger('click')
        }
    }


}
export const minicart = new Minicart()