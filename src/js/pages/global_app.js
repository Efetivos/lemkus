
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
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
            console.log(is_colle);
            $(`.link-${is_colle}`).addClass('aria-page')
            console.log(`.link-${is_colle}`);
        }
    }










    //? - =========================  POPUP  ========================= -//
    //? - =========================  POPUP  ========================= -//
    onPopup() {
        let that = this
        this.popoup_close = this.qs('.popup__close')

        let is_on_time = $(this.popup).data('showsup')
        
        function closePopup() {
            $('.popup__close').click(function () { gsap.to('.popup', { autoAlpha: 0, duration: .3, onComplete: () => $(that.body).removeClass('enable-popup') }) })
        }

        //if trigger on footer
        if (is_on_time === 'footer') {
            ScrollTrigger.create({
                trigger: "footer",
                start: "top 100%",
                once: true, 
                onEnter: () =>{
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