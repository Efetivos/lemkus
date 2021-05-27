var imagesLoaded = require('imagesloaded');
var $ = require('jquery');
import FontFaceObserver from 'fontfaceobserver'

class Preloader {
    constructor() {
        return
    }

    init() {
        //? - =========================  PRELOAD
        imagesLoaded.makeJQueryPlugin($);
        let i = 0,
            $imgClass = $('.img-load'),
            imgLoad = imagesLoaded('.img-load')

        $imgClass.imagesLoaded()
            .always(function (instance) {
                window.dispatchEvent(new Event('resize'));
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
            console.log({ fontDharma });
            window.dispatchEvent(new Event('resize'))
            $('.preloader-master').remove()
        }).catch(_ => {
            console.log('catch');
            window.dispatchEvent(new Event('resize'))
            $('.preloader-master').remove()
        })
    }
}
export const preloader = new Preloader()