
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText)
import { countdown } from '../utils_global/countdown';
class GlobalApp {
    constructor() {
        return;
    }

    init() {
        this.body = document.querySelector('body')
        this.contentPage = document
        let doc = document
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.ariaPage()

        //? ---- hover scale
        this.each_hover = $('.hover-img-js') || null
        this.each_hover.length > 0 ? this.hoverScale() : null

        //? ---- forgot button
        this.fgt_btn = $('button.create-forg__forgot') || null
        this.fgt_btn.length > 0 ? this.showForgot() : null

        //? ---- forgot button
        this.countdowns = document.querySelectorAll('.countdown') || null
        this.countdowns.length > 0 ? countdown.init() : null

        //? ---- popup
        this.popup = document.querySelectorAll('.popup') || null
        this.popup.length > 0 ? this.onPopup() : null

        //? ---- split_text
        this.split_text = document.querySelectorAll('.js-split') || null
        this.split_text.length > 0 ? this.onSplitText() : null



    }












    //? - =========================  SPLIT TEXT  ========================= -//
    //? - =========================  SPLIT TEXT  ========================= -//
    onSplitText() {
        this.split_text.forEach(function (el) {
            new SplitText(el, { type: "words,chars", wordsClass: 'wrapped-split' })
        })
        gsap.set('.wrapped-split div', { yPercent: 110 })

        ScrollTrigger.batch(this.split_text, {
            onEnter: (elements) => {
                gsap.fromTo($(elements).find('.wrapped-split div'), { yPercent: 110 }, { duration: 2.6, yPercent: 0, ease: 'expo.out', stagger: .06 })
            },
            start: 'top 75%',
            once: true
        })

    }







    //? - =========================  SHOW FORGOT  ========================= -//
    //? - =========================  SHOW FORGOT  ========================= -//
    showForgot() {
        $(this.fgt_btn).click(function () {
            $('.forgot-form').toggleClass('show-form')
        });
    }






    //? - =========================  HOVER SCALE  ========================= -//
    //? - =========================  HOVER SCALE  ========================= -//
    hoverScale() {
        $(this.each_hover).hover(
            function () {
                $(this).closest('.js-find-hover').find('.hover-img img').css('transform', 'scale(1.1)')
            }, function () {
                $(this).closest('.js-find-hover').find('.hover-img img').css('transform', 'scale(1)')
            });
    }









    //? - =========================  VERIFY ARIA PAGE  ========================= -//
    //? - =========================  VERIFY ARIA PAGE  ========================= -//
    ariaPage() {
        this.body = document.querySelector('body')
        this.is_aria = $(this.body).data('ariapage')
        this.is_aria === 'page.launches' ? $('.link-launches').addClass('aria-page') : null
        this.is_aria === 'blog' ? $('.link-culture').addClass('aria-page') : null
        this.is_aria === 'search' ? $('.link-search').addClass('aria-page') : null
        this.is_aria === 'customers/login' ? $('.link-account').addClass('aria-page') : null
        console.log(this.is_aria);
        if (this.is_aria === 'collection') {
            let is_colle = $(this.body).data('colle')
            $(`.link-${is_colle}`).addClass('aria-page')
        }
    }










    //? - =========================  POPUP  ========================= -//
    //? - =========================  POPUP  ========================= -//
    onPopup() {
        let that = this
        this.popoup_close = this.qs('.popup__close')

        let is_on_time = $(this.popup).data('showsup')

        function closePopup() {
            $('.popup__close').add('.popup__fader').click(function () { gsap.to('.popup', { autoAlpha: 0, duration: .3, onComplete: () => $(that.body).removeClass('enable-popup') }) })
            $(document).on('keydown', function (event) {
                if (event.key == "Escape" && $(that.body).hasClass('enable-popup')) {
                    $('.popup__close').trigger('click')
                }
            })
        }

        //if trigger on footer
        if (is_on_time === 'footer') {
            ScrollTrigger.create({
                trigger: "footer",
                start: "top 100%",
                once: true,
                onEnter: () => {
                    $(this.body).addClass('enable-popup')
                    closePopup()
                }
            });
        }
        //else
        else {
            gsap.delayedCall(12, () => {
                $(this.body).addClass('enable-popup')
                closePopup()
            })//close gsap delayed
        }
    }






}
export const global_app = new GlobalApp()