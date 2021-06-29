
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

        this.cart = {
            cart_counter: this.qs('.cart-counter'),
            subtotal: this.qs('.cart__infos .subtotal'),
            current: null
        }


        this.onClick()
        this.onRemove()
    }










    //? - =========================  ONCLICK  ========================= -//
    //? - =========================  ONCLICK  ========================= -//
    onClick() {
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
                $input_qty.attr('value', `${parseInt(qty_parameter) - 1}`)
                qty_parameter = parseInt(qty_parameter) - 1
                $btn_plus.removeClass('disabled')
                that.current_line = $input_qty
                that.onChangeQty(that.current_line)
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
                $input_qty.attr('value', `${parseInt(qty_parameter) + 1}`)
                qty_parameter = parseInt(qty_parameter) + 1
                $btn_minus.removeClass('disabled')
                that.current_line = $input_qty
                that.onChangeQty(that.current_line)
            }

            qty_parameter == parseInt($input_qty.attr('max')) ? $btn_plus.addClass('disabled') : null
        })

    }













    //? - =========================  CHANGE QTY  ========================= -//
    //? - =========================  CHANGE QTY  ========================= -//
    onChangeQty(el) {
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
                that.updateCart()
                return response.json();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }













    //? - =========================  GETTING DATA  ========================= -//
    //? - =========================  GETTING DATA  ========================= -//
    updateCart() {
        let that = this
        $.ajax({ url: '/cart.js', dataType: 'json' })
            .done(function (data) {
                $(that.cart.subtotal).text(`${new Intl.NumberFormat('en', { style: 'currency', currency: 'ZAR' }).format(data.total_price)}`)
                $(that.cart.cart_counter).text(`${data.item_count}`)
            });

    }










    //? - =========================  REMOVE ITEM  ========================= -//
    //? - =========================  REMOVE ITEM  ========================= -//
    onRemove() {
        let that = this
        let remove_item = this.qsa('.item-remove')
        $(remove_item).click(function (e) {

            let changes = {
                line: $(this).data('line'),
                quantity: 0
            }
            e.preventDefault()
            fetch('/cart/change.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(changes)
            })
                .then(response => {
                    $(that.line_cart.el).eq(`${(changes.line) - 1}`).remove()
                    that.updateCart()
                    return response.json();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        });
    }




}
export const qty_picker = new QtyPicker()