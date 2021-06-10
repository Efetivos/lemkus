
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


        this.menu = {
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
        $('.size-guide').length > 0 ? this.sizeGuide() : null


    }













    //? - =========================  ON CLICK  ========================= -//
    //? - =========================  ON CLICK  ========================= -//
    onClick() {
        let that = this
        //____ open menu
        $(this.menu.trg).click(function () {
            $(that.body).toggleClass('is-menufs')
        });


        //____ close menu
        //$(this.menu.close).add(this.menu.links).click(function(){
        //    $(that.menu.main).toggleClass('is-menufs')
        //    console.log('to-close');
        //});



        //____ open shop dropdown
        $(this.menu.shop_trg).click(function () {
            $(that.menu.dropd_shop).toggleClass('hide-drop')
        });



        //____ dismiss cookies
        $(this.cookies.close).click(function () {
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
        $(this.topbar.close).click(function () {
            $(that.body).removeClass('is-topbar')
            $(that.topbar).remove()
        })
    }







    //? - =========================  TOP BAR  ========================= -//
    //? - =========================  TOP BAR  ========================= -//
    sizeGuide() {
        let that = this
        this.guide = {
            el: $('.size-guide').closest('.shopify-section'),
            close: this.qsa('.close-guid, .size-guide__close')
        }

        console.log(this.guide);
        $(this.guide.close).click(function () {
            $(this).closest('.shopify-section').remove()
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




    //? - =========================  VERIFY SO  ========================= -//
    //? - =========================  VERIFY SO  ========================= -//


    //? - =========================  FIX MOBILE  ========================= -//
    //? - =========================  FIX MOBILE  ========================= -//
    verifySO() {
        function isMacintosh() {
            return navigator.platform.indexOf('Mac') > -1
        }
        let isMac = isMacintosh()
        if (isMac) { $('body').addClass('is-mac') } //verify mac
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            $('html').addClass('is-firefox')
        }
        let isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

        if (isIOS && window.innerWidth < 980) {
            $('html').addClass('is-ios')
        }

        if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
            $('html').addClass('is-safari')

            
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browserName = navigator.appName;
            var fullVersion = '' + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;
            if ((verOffset = nAgt.indexOf("Safari")) != -1) {
                browserName = "Safari";
                fullVersion = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf("Version")) != -1)
                    fullVersion = nAgt.substring(verOffset + 8);
            }
            // In most other browsers, "name/version" is at the end of userAgent 
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
                (verOffset = nAgt.lastIndexOf('/'))) {
                browserName = nAgt.substring(nameOffset, verOffset);
                fullVersion = nAgt.substring(verOffset + 1);
                if (browserName.toLowerCase() == browserName.toUpperCase()) {
                    browserName = navigator.appName;
                }
            }
            // trim the fullVersion string at semicolon/space if present
            if ((ix = fullVersion.indexOf(";")) != -1)
                fullVersion = fullVersion.substring(0, ix);
            if ((ix = fullVersion.indexOf(" ")) != -1)
                fullVersion = fullVersion.substring(0, ix);

            majorVersion = parseInt('' + fullVersion, 10);
            if (isNaN(majorVersion)) {
                fullVersion = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }


            console.log("Safari Version: "+fullVersion);

        }


        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            $('html').addClass('is-firefox')
        }

    }

}
export const menu = new Menu()