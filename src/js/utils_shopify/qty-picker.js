
import { gsap } from 'gsap'
import { minicart } from './minicart';
class QtyPicker {
    constructor() {
        return;
    }

    init() {
        let doc = document
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.line_cart = {
            el: this.qsa('.cart__each'),
            minus: this.qsa('.js-qty-btn-minus'),
            plus: this.qsa('.js-qty-btn-plus')
        }

        this.onCLick()
    }










    //? - =========================  ONCLICK  ========================= -//
    //? - =========================  ONCLICK  ========================= -//
    onCLick() {
        let that = this

        //? - ___________  minus
        $(this.line_cart.minus).click(function () {
            let $input_qty = $(this).closest('.cart__each').find('.js-qty-field'),
                qty_parameter = $input_qty.val(),
                $text_qty = $(this).closest('.cart__each').find('.js-qty-text'),
                $btn_minus = $(this).closest('.cart__each').find('.js-qty-btn-minus'),
                $btn_plus = $(this).closest('.cart__each').find('.js-qty-btn-plus')


            if (qty_parameter > 1) {
                $text_qty.text(`${parseInt(qty_parameter) - 1}`)
                $input_qty.val(`${parseInt(qty_parameter) - 1}`)
                qty_parameter = parseInt(qty_parameter) - 1
                $btn_plus.removeClass('disabled')
            }

            qty_parameter == 1 ? $btn_minus.addClass('disabled') : null
        })


        //? - ___________  plus
        $(this.line_cart.plus).click(function () {
            let $input_qty = $(this).closest('.cart__each').find('.js-qty-field'),
                qty_parameter = $input_qty.val(),
                $text_qty = $(this).closest('.cart__each').find('.js-qty-text'),
                $btn_minus = $(this).closest('.cart__each').find('.js-qty-btn-minus'),
                $btn_plus = $(this).closest('.cart__each').find('.js-qty-btn-plus')

            if (qty_parameter <= $input_qty.attr('max')) {
                $text_qty.text(`${parseInt(qty_parameter) + 1}`)
                $input_qty.val(`${parseInt(qty_parameter) + 1}`)
                $input_qty.attr('value',`${parseInt(qty_parameter) + 1}`)
                qty_parameter = parseInt(qty_parameter) + 1
                $btn_minus.removeClass('disabled')
                that.onChangeQty($input_qty)
            }


            qty_parameter == parseInt($input_qty.attr('max')) ? $btn_plus.addClass('disabled') : null
        })

    }













    //? - =========================  CHANGE QTY  ========================= -//
    //? - =========================  CHANGE QTY  ========================= -//
    onChangeQty(el) {
        let id = $(el).data('id'),
            qty = $(el).attr('value')

        console.log(id, qty);

        fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'line': id,
                'quantity': qty
            })
        })
            .then(response => {
                console.log('done')
                return response.json();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }




}
export const qty_picker = new QtyPicker()