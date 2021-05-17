//* --------------- STYLE
const css = require('./sass/app.sass');

//* --------------- LIBS
import { gsap } from 'gsap'
gsap.config({ nullTargetWarn: false });



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
preloader.font()
scroll.init()

if($('.page-about').length > 0 || $('.page-contact').length > 0 || $('.page-blog').length > 0  ) {
    gsap.set('html', { '--dark':'#f6f6f6', '--soft': '#191919' })
}


const { consoleTag } = require('./js/utils/console.js');
consoleTag()
