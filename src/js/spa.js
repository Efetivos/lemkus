
import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import { gsap } from 'gsap'
import { scroll } from './scroll'
import { preloader } from './preloader';
import { ajaxify } from './ajaxify';
import { loginpage } from './login-page';
import { wishlist } from './wishlist';
import { account } from './account';
//import { firstload } from './first-load';
barba.use(barbaPrefetch);

export default class Spa {
    constructor() {
        this.init()
    }



    init() {

        this.pagesFromMenu = document.querySelectorAll('.menu-fs__each')
        let that = this
        barba.init({
            preventRunning: true,
            timeout: 5000,
            //? - =========================  VIEWS  ========================= -//
            //? - =========================  VIEWS  ========================= -//

            views: [
                //? --- home
                {
                    namespace: 'home',
                    beforeEnter(data) {
                    }
                },
                //? --- about
                {
                    namespace: 'about',
                    beforeEnter(data) {
                        //console.log(data);
                    }
                },
                //? --- login
                {
                    namespace: 'login',
                    beforeEnter(data) {

                        let btn_forgot = $('.toggle-forgot')
                        let form_forgot = $('.forgot-form')
                        $(btn_forgot).click(function () {
                            $(form_forgot).toggleClass('js-hidden')
                        });
                    }
                },
                //? --- register
                {
                    namespace: 'register',
                    beforeEnter(data) {

                        let btn_forgot = $('.toggle-forgot')
                        let form_forgot = $('.forgot-form')
                        $(btn_forgot).click(function () {
                            $(form_forgot).toggleClass('js-hidden')
                        });
                    }
                },

                //? --- account
                {
                    namespace: 'account',
                    beforeEnter(data) {
                        account.init(data.next.container)
                    }
                },

                //? --- wishlist
                {
                    namespace: 'wishlist',
                    beforeEnter(data) {
                        wishlist.init(data.next.container)
                    }
                },
            ],




            //? - =========================  TRANSITIONS  ========================= -//
            //? - =========================  TRANSITIONS  ========================= -//

            transitions: [{
                //sync: true,
                preventRunning: true,

                //? ---------   LEAVE
                leave(data) {
                    const done = this.async();
                    gsap.set('body', { overflow: 'hidden' })
                    scroll.destroy()
                    let $trgClicked = data.trigger

                    // ---- FROM MENU
                    gsap.to('#barba-wrapper', { duration: .5, opacity: 0, onComplete: () => { done(); } });
                },


                //? ---------   ENTER
                enter(data) {
                    let thisOld = data.current.namespace, thisNext = data.next.namespace
                },

                //? ---------   AFTER
                after({ next }) {
                    gsap.set('body', { overflowY: 'auto' })
                    gsap.to('#barba-wrapper', { delay: .5, duration: .5, opacity: 1 });
                    that.callingFunctions(next)
                    // ---- PRELOAD

                },


                //? ---------   once
                once({ next }) {
                    that.callingFunctions(next)
                    //$('.preloader-master, .intro').remove()

                }
            }],

        }) //close BarbaJS


    } //close Init



    //? - =========================  GLOBAL EVENTS  ========================= -//
    //? - =========================  GLOBAL EVENTS  ========================= -//



    callingFunctions(next) {
        window.scrollTo(0, 0)
        history.scrollRestoration = "manual"
        ajaxify.onClick(next.container)
        next.namespace != 'wishlist' ? scroll.init(next.namespace, false, next.container) : null
        preloader.init()
        this.preventLink()



        //? ------ GOOGLE ANALYTICS 
        /*window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        var path = (window.location.href).replace(window.location.origin, '').toLowerCase();
        gtag('js', new Date());
        gtag('config', 'G-1X96ZJZ1BM', {
            'anonymize_ip': true, // for GDPR
            'page_title': document.title,
            'page_path': path
        });*/
    }


    //? - =========================  PREVENT LINK  ========================= -//
    //? - =========================  PREVENT LINK  ========================= -//

    preventLink() {
        let links = document.querySelectorAll('a[href]');

        let cbk = function (e) {
            if (e.currentTarget.href === window.location.href) {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', cbk);
        }

    }



}
