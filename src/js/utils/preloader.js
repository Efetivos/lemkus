var imagesLoaded = require('imagesloaded');
var $ = require('jquery');
import FontFaceObserver from 'fontfaceobserver'
import { infinity } from './infinity-scroll';
import { intro_home } from './intro-home';

class Preloader {
    constructor() {
        return
    }

    init() {
        $('body').hasClass('index') && window.innerWidth > 1024 ? intro_home.init() : null
        //? - =========================  PRELOAD
        imagesLoaded.makeJQueryPlugin($);
        let i = 0,
            $imgClass = $('.img-load'),
            imgLoad = imagesLoaded('.img-load')

        $imgClass.imagesLoaded()
            .always(function (instance) {
                window.dispatchEvent(new Event('resize'));
                intro_home.startIntro()
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
            $('.preloader-master').remove()
            $('.infinity').length > 0 && window.innerWidth > 1024 ? infinity.init() : null
        }).catch(_ => {
            console.log('catch');
            window.dispatchEvent(new Event('resize'))
            $('.preloader-master').remove()
        })
    }
}
export const preloader = new Preloader()