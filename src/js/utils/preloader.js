var imagesLoaded = require('imagesloaded');
var $ = require('jquery');

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
}
export const preloader = new Preloader()