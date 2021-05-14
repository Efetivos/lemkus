//* --------------- STYLE
const css = require('./sass/app.sass');

//* --------------- LIBS
import { gsap } from 'gsap'
gsap.config({ nullTargetWarn: false });
import FontFaceObserver from 'fontfaceobserver'



//___ instancing
import { menu } from './js/utils_global/menu';
//import { minicart } from './js/utils_shopify/minicart';
//import { ajaxify } from './js/utils_shopify/ajaxify';
import { preloader } from './js/utils/preloader';
import { scroll } from './js/scroll';



//___ calling
menu.init()
menu.fixMobile()
//minicart.init()
//ajaxify.init()
preloader.init()
scroll.init()

const fontDharma = new FontFaceObserver('DharmaGothicE-Bold', {
    weight: 900
})

Promise.all([
    fontDharma.load()
]).then(_ => {
    console.log({ fontDharma });
    alert('dharma')
}).catch(_ => {
    console.log('catch');
    console.log({ fontDharma });
})

const { consoleTag } = require('./js/utils/console.js');
consoleTag()
