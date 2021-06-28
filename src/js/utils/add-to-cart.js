
import { gsap } from 'gsap'
class AddToCart {
    constructor() {
        return;
    }

    init(contentPage) {
        this.contentPage = contentPage
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.onClick()
    }


    changeVal(val, $minus_btn, $qty_text){
        val < 2 ? $minus_btn.prop('disabled', true).addClass('disabled') : $minus_btn.prop('disabled', false).removeClass('disabled')
        $qty_text.text(val)
    }
    

    //? - =========================  ONCLICK  ========================= -//
    //? - =========================  ONCLICK  ========================= -//
    onClick(){
        let that = this
        this.qty_btns = this.qsa('.js-qty-btn')
        this.qty_fields = this.qsa('.js-qty-field')
        this.variant_radio = this.qsa('.js-variant-radio')
        
        
        
        
        //_____ click add to cart btn
        let $add_to_cart_all = this.qsa('#add-to-cart-button')
        $($add_to_cart_all).click(function(){
            if($(this).hasClass('disabled-add-cart')) {
                $(this).closest('.add-cart-btns').addClass('size-selected')
            }
            else {
                $(this).addClass('loading-item')
            }
        })


        
        //_____ click btn qty
        $(this.qty_btns).click(function(){
            let $button = $(this),
                $form = $button.closest('form'),
                $qty_field = $form.find('.js-qty-field'),
                $qty_text = $form.find('.js-qty-text'),
                $minus_btn = $form.find('.minus'),
                qty_value = parseInt($qty_field.val()),
                max = $qty_field.attr('max') ? parseInt($qty_field.attr('max')) : null


                // this is minus btn
                if($button.hasClass('minus')) {
                    $qty_field.val(qty_value - 1)
                    that.changeVal(parseInt($qty_field.val()), $minus_btn, $qty_text)
                }
                
                // this is plus btn
                if($button.hasClass('plus') && (max === null || qty_value+1 <= max)) {
                    $qty_field.val(qty_value + 1)
                    that.changeVal(parseInt($qty_field.val()), $minus_btn, $qty_text)
                }
        });




        //_____ change input qty
        $(this.qty_fields).change(function(){
            let $form = $(this).closest('form'),
            $qty_text = $form.find('.js-qty-text'),
            $minus_btn = $form.find('.minus'),
            this_value = parseInt($(this).val())
            that.changeVal(this_value, $minus_btn, $qty_text)
        });



        //_____ click variants
        $(this.variant_radio).change(function(){
            let $radio = $(this),
                $form = $(this).closest('form'),
                $qty_field = $form.find('.js-qty-field'),
                $add_to_cart = $form.find('#add-to-cart-button'),
                max = $radio.data('inventory-qty')

                //$add_to_cart.hasClass('disabled') ? $add_to_cart.removeClass('disabled') : null
                if($add_to_cart.hasClass('disabled-add-cart')) { 
                    $add_to_cart.removeClass('disabled-add-cart')
                    $('.add-cart-btns').removeClass('size-selected')
                }
                if($add_to_cart.prop)
                $qty_field.attr('max', max)
                if(parseInt($qty_field.val()) > max) {
                    $qty_field.val(max).change();
                }
        });
    }
}
export const add_to_cart = new AddToCart()