var imagesLoaded = require('imagesloaded');
var $ = require('jquery');
import FontFaceObserver from 'fontfaceobserver'
import { infinity } from './infinity-scroll';
import { intro_home } from './intro-home';
import { about } from '../pages/about';
import { article } from '../pages/article';
import { gsap } from 'gsap'
class Preloader {
    constructor() {
        return
    }

    init() {
        
        this.body = $('body')
        if (this.body.hasClass('index')) {
            if(localStorage.initItro !== 'true') {
                this.body.addClass('intro')
                this.isHome()
            }
            else {
                gsap.delayedCall(2, ()=> $('.preloader-master').remove())
            }
        } 
        localStorage.setItem('initItro', true)
        this.loadImages()
    }

    // ________________ is home
    isHome() {
        //toggle INTRO 

        this.loader_home = {
            el: document.querySelector('.loader-home'),
            counting: document.querySelector('.loader-home__counting'),
            counter: document.querySelector('.loader-home__counter')
        }
        if (window.innerWidth > 1024) { intro_home.init() }
        $('.preloader-master').remove()
    }
    counterLoader(progress) {
        if (progress < 10) {
            $(this.loader_home.counter).text(`00${progress}`)
        }
        else if (progress > 9 && progress < 100) {
            $(this.loader_home.counter).text(`0${progress}`)
        }
        // exit loader home
        else {
            if ($(window).width() > 1024) {
                $(this.loader_home.counter).text(`${progress}`)
                gsap.to(this.loader_home.counting, { duration: 1.2, opacity: 0, yPercent: 100, ease: 'expo.in', onComplete: () => $(this.loader_home.el).remove() })
                gsap.delayedCall(.6, () => { intro_home.startIntro() })
            } else {
                gsap.to(this.loader_home.el, { duration: 2.2, yPercent: 100, ease: 'expo.inOut', onComplete: () => $(this.loader_home.el).remove() })
            }
        }
    }










    //? - =========================  FONTS  ========================= -//
    //? - =========================  FONTS  ========================= -//

    font() {
        let fontDharma = new FontFaceObserver('DharmaGothicE-Bold', {
            weight: 900
        })

        Promise.all([
            fontDharma.load()
        ]).then(_ => {
            window.dispatchEvent(new Event('resize'))

            this.body.hasClass('index') ? null : $('.preloader-master').remove()
            $('.infinity').length > 0 && window.innerWidth > 1024 ? infinity.init() : null
            $('.article').length > 0 ? article.onEnter() : null
            
        }).catch(_ => {
            console.log('catch');
            window.dispatchEvent(new Event('resize'))
            this.body.hasClass('index') ? null : $('.preloader-master').remove()
            $('.article').length > 0 ? article.onEnter() : null
        })
    }













    //? - =========================  IMAGES LOADED  ========================= -//
    //? - =========================  IMAGES LOADED  ========================= -//
    loadImages() {
        let that = this
        //? - =========================  PRELOAD
        imagesLoaded.makeJQueryPlugin($);
        let i = 0,
            $imgClass = $('.img-load'),
            imgLoad = imagesLoaded('.img-load')

        $imgClass.imagesLoaded()
            .always(function (instance) {
                window.dispatchEvent(new Event('resize'));
                $('.about-header').length > 0 ? about.goEnter() : null
                $('.header-article').length > 0 ? article.goEnter() : null
            })

            //___________ PROGRESS
            .progress(function (instance, image) {
                //console.log('image is  for ' + image.img.src);
                i++
                let $image = imgLoad.images
                let percentage = (i / $image.length) * 100
                if (that.body.hasClass('index') && that.body.hasClass('intro')) { that.counterLoader(percentage.toFixed()) }
            });
    }


}
export const preloader = new Preloader()