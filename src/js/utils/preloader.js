var imagesLoaded = require('imagesloaded');
var $ = require('jquery');
import FontFaceObserver from 'fontfaceobserver'
import { infinity } from './infinity-scroll';
import { intro_home } from './intro-home';
import { about } from '../pages/about';
import { article } from '../pages/article';
class Preloader {
    constructor() {
        return
    }

    init() {
        //toggle INTRO 
        if ($('body').hasClass('index')) {
            //if(window.innerWidth > 1024) { intro_home.init() }            
            $('.preloader-master').remove()
        }



        //? - =========================  PRELOAD
        imagesLoaded.makeJQueryPlugin($);
        let i = 0,
            $imgClass = $('.img-load'),
            imgLoad = imagesLoaded('.img-load')

        $imgClass.imagesLoaded()
            .always(function (instance) {
                window.dispatchEvent(new Event('resize'));
                // if($('body').hasClass('index')) {  intro_home.startIntro() }
                $('.about-header').length > 0 ? about.goEnter() : null
                $('.header-article').length > 0 ? article.goEnter() : null
            })

            //___________ PROGRESS
            .progress(function (instance, image) {
                //console.log('image is  for ' + image.img.src);
            });
    }


    font() {

        let fontDharma = new FontFaceObserver('DharmaGothicE-Bold', {
            weight: 900
        })


        Promise.all([
            fontDharma.load()
        ]).then(_ => {
            window.dispatchEvent(new Event('resize'))

            $('body').hasClass('index') ? null : $('.preloader-master').remove()
            $('.infinity').length > 0 && window.innerWidth > 1024 ? infinity.init() : null
        }).catch(_ => {
            console.log('catch');
            window.dispatchEvent(new Event('resize'))
            $('body').hasClass('index') ? null : $('.preloader-master').remove()
        })
    }
}
export const preloader = new Preloader()