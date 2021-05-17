
import { gsap } from 'gsap'
class Menu {
    constructor() {
        return;
    }

    init() {
        let doc = document
        this.body = document.querySelector('body')
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)


        this.menu =  {
            main: this.qs('.menu-fs'),
            close: this.qs('.menu-fs__close'),
            trg: this.qs('.menu-trg'),
            shop_trg: this.qs('.shop-text'),
            dropd_shop: this.qs('.menu-fs__shop__link'),
            links: this.qsa('.menu-fs__links li a')
        }

        this.cookies = {
            el: this.qs('.cookies'),
            close: this.qs('.cookies__close')
        }
        this.onClick()
        $('.top-bar').length > 0 ? this.topBar() : null


    }













    //? - =========================  ON CLICK  ========================= -//
    //? - =========================  ON CLICK  ========================= -//
    onClick() {
        let that = this
        //____ open menu
        $(this.menu.trg).click(function(){
            $(that.menu.main).toggleClass('active-menu')
        });


        //____ close menu
        $(this.menu.close).add(this.menu.links).click(function(){
            $(that.menu.main).toggleClass('active-menu')
            console.log('to-close');
        });


        
        //____ open shop dropdown
        $(this.menu.shop_trg).click(function(){
            $(that.menu.dropd_shop).toggleClass('hide-drop')
        });


        
        //____ dismiss cookies
        $(this.cookies.close).click(function(){
            gsap.set(that.cookies.el, { duration: 1, autoAlpha: 0, onComplete: () => $(that.cookies.el).remove() })
        });
    }


















    //? - =========================  TOP BAR  ========================= -//
    //? - =========================  TOP BAR  ========================= -//
    topBar() {
        let that = this
        this.topbar = {
            el: this.qs('.top-bar'),
            close: this.qs('.top-bar__close')
        }

        $(this.body).addClass('is-topbar')
        $(this.topbar.close).click(function(){
            $(that.body).removeClass('is-topbar')
            $(that.topbar).remove()
        })
    }




    //? - =========================  FIX MOBILE  ========================= -//
    //? - =========================  FIX MOBILE  ========================= -//
    fixMobile() {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)

        let clientWidth = Math.max(document.documentElement.clientWidth, 320)
        let vw = clientWidth * 0.01
        document.documentElement.style.setProperty('--vw', `${vw}px`);

        $(window).resize(function () {
            vh = window.innerHeight * 0.01
            vw = clientWidth * 0.01
            document.documentElement.style.setProperty('--vh', `${vh}px`)

            clientWidth = Math.max(document.documentElement.clientWidth, 320)
            document.documentElement.style.setProperty('--vw', `${vw}px`)
        })
    }
}
export const menu = new Menu()