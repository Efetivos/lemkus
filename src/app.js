//* --------------- STYLE
const css = require('./sass/app.sass');

//* --------------- LIBS
import { gsap } from 'gsap'
gsap.config({ nullTargetWarn: false });



//___ instancing
import { menu } from './js/utils_global/menu';
import { minicart } from './js/utils_shopify/minicart';
import { preloader } from './js/utils/preloader';
import { scroll } from './js/utils/scroll';
import { accordion_menu } from './js/utils/accordion-menu';
import { menu_blog } from './js/utils_global/menu_blog';
import { dropdown } from './js/utils/dropdown';



//___ calling
menu.init()
menu.verifySO()
menu_blog.init()
menu.fixMobile()
minicart.init()
preloader.init()
preloader.font()
scroll.init()
dropdown.init()

if($('.page-about').length > 0 || $('.page-contact').length > 0 || $('.page-blog').length > 0  ) {
    gsap.set('html', { '--dark':'#fdfbf5', '--soft': '#191919' })
}

history.scrollRestoration = "manual"
const { consoleTag } = require('./js/utils/console.js');
consoleTag()



accordion_menu.init(document.querySelector('body'))