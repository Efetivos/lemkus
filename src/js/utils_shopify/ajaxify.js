
import { gsap } from 'gsap'
import { minicart } from './minicart';
class Ajaxify {
    constructor() {
        return;
    }

    init() {
        let doc = document
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)
    }

    //? - =========================  ONCLICK  ========================= -//
    //? - =========================  ONCLICK  ========================= -//
    onClick(contentPage) {
        let that = this
        this.contentPage = contentPage
        //__add item
        this.add_btn = this.contentPage.querySelectorAll('.js-add-cart')
        $(this.add_btn).submit(function (e) {
            e.preventDefault()
            let el = $(this)

            if (!$('#add-to-cart-button').hasClass('disabled-add-cart')) {
                that.fecthItem(el)
                $('.add-cart-btns').addClass('loading-item')
            }
        });

        //$('.add-cart-btns').click(function () {
        //    $('.add-cart-btns').addClass('loading-item')
        //})

    }




    //? - =========================  FETCH ITEM  ========================= -//
    //? - =========================  FETCH ITEM  ========================= -//
    fecthItem(el) {
        let that = this
        let formData = new FormData(el[0]);

        fetch('/cart/add.js', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                minicart.insertCart()
                return response.json();
            })
            .then(data => {
                return data
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }







    //? - =========================  REMOVE ITEM  ========================= -//
    //? - =========================  REMOVE ITEM  ========================= -//
    removeItem(el) {
        let that = this
        let remove_item = el.querySelectorAll('.item-remove')
        $(remove_item).click(function (e) {
            e.preventDefault()
            let line = $(this).data('line')
            fetch('/cart/change.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'line': line,
                    'quantity': 0
                })
            })
                .then(response => {
                    minicart.insertCart()
                    return response.json();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        });
    }













    //? - =========================  AJAXITEM  ========================= -//
    //? - =========================  AJAXITEM  ========================= -//
    ajaxItem(el) {
        let that = this
        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: $(el).serialize(),
            dataType: 'json',
            success: that.onCartUpdated($(this).serialize()),
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest)
            }
        })
    }



    //  ________________ UPDATED
    onCartUpdated(data) {
        console.log('item Ajaxed')
        minicart.insertCart()
    }





}
export const ajaxify = new Ajaxify()