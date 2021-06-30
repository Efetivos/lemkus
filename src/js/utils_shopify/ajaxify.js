
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







    //? - =========================  QTYCHANGE  ========================= -//
    //? - =========================  QTYCHANGE  ========================= -//
    onQtyChange(el) {
        let that = this
        let $picker_minus = el.querySelectorAll('.js-qty-btn-minus')
        let $picker_plus = el.querySelectorAll('.js-qty-btn-plus')


        //? - ___________  minus
        $($picker_minus).click(function () {
            let $input_qty = $(this).closest('.cart__each').find('.js-qty-field'),
                qty_parameter = $input_qty.val(),
                $text_qty = $(this).closest('.cart__each').find('.js-qty-text'),
                $btn_minus = $(this).closest('.cart__each').find('.js-qty-btn-minus'),
                $btn_plus = $(this).closest('.cart__each').find('.js-qty-btn-plus')


            if (qty_parameter > 1) {
                $text_qty.text(`${parseInt(qty_parameter) - 1}`)
                $input_qty.val(`${parseInt(qty_parameter) - 1}`)
                $input_qty.attr('value', `${parseInt(qty_parameter) - 1}`)
                qty_parameter = parseInt(qty_parameter) - 1
                $btn_plus.removeClass('disabled')
                that.current_line = $input_qty
                that.changeQty(that.current_line)
            }

            qty_parameter == 1 ? $btn_minus.addClass('disabled') : null
        })


        //? - ___________  plus
        $($picker_plus).click(function () {
            let $input_qty = $(this).closest('.cart__each').find('.js-qty-field'),
                qty_parameter = $input_qty.val(),
                $text_qty = $(this).closest('.cart__each').find('.js-qty-text'),
                $btn_minus = $(this).closest('.cart__each').find('.js-qty-btn-minus'),
                $btn_plus = $(this).closest('.cart__each').find('.js-qty-btn-plus')

            if (qty_parameter <= $input_qty.attr('max')) {
                $text_qty.text(`${parseInt(qty_parameter) + 1}`)
                $input_qty.val(`${parseInt(qty_parameter) + 1}`)
                $input_qty.attr('value', `${parseInt(qty_parameter) + 1}`)
                qty_parameter = parseInt(qty_parameter) + 1
                $btn_minus.removeClass('disabled')
                that.current_line = $input_qty
                that.changeQty(that.current_line)
            }

            qty_parameter == parseInt($input_qty.attr('max')) ? $btn_plus.addClass('disabled') : null
        })

    }



    //? - =========================  CHANGE QTY  ========================= -//
    //? - =========================  CHANGE QTY  ========================= -//
    changeQty(el) {
        let that = this
        let changes = {
            id: $(el).data('id'),
            quantity: $(el).attr('value')
        }

        fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changes)
        })
            .then(response => {
                minicart.insertCart()
                return response.json();
            })
            .catch((error) => {
                console.error('Error:', error);
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
        minicart.insertCart()
    }





}
export const ajaxify = new Ajaxify()