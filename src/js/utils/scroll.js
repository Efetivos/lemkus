
import { gsap } from 'gsap'
import { index } from '../pages';
import { about } from '../pages/about';
import { article } from '../pages/article';
import { blog } from '../pages/blog';
import { collection } from '../pages/collection';
import { contact } from '../pages/contact';
import { global_app } from '../pages/global_app';
import { product } from '../pages/product';
import { cursor } from '../utils_global/cursor';
import DragSection from '../utils_global/drag-section';
import SliderDrag from '../utils_global/drag-slider';
import DragSlider from '../utils_global/sliders';
import { ajaxify } from '../utils_shopify/ajaxify';
import { qty_picker } from '../utils_shopify/qty-picker';
import { accordion } from './accordion'
import { accordion_filters } from './accordion-filters';
import { add_to_cart } from './add-to-cart';
class Smooth {
    constructor() {
        return;
    }

    bindMethods() {
        ['scroll', 'run', 'resize']
            .forEach((fn) => this[fn] = this[fn].bind(this))
    }

    setStyles() {
        this.dom.el.style.position = 'fixed';
        this.dom.el.style.top = 0;
        this.dom.el.style.left = 0;
        this.dom.el.style.height = '100%'
        this.dom.el.style.width = '100%'
        this.dom.el.style.overflow = 'hidden'
    }

    setHeight() {
        document.body.style.height = `${this.dom.content.offsetHeight}px`
    }

    resize() {
        this.setHeight()
        this.scroll()
    }
    scroll() {
        this.data.current = window.scrollY
    }

    run() {
        this.data.last = this.math.lerp(this.data.last, this.data.current, this.data.ease)
        this.data.last = Math.floor(this.data.last * 100) / 100

        const diff = this.data.current - this.data.last
        const acc = diff / this.config.width
        const velo = + acc

        if ($(window).width() > 1024 && this.isPage != 'collection') {
            this.dom.content.style.transform = `translate3d(0, -${this.data.last.toFixed(0)}px, 0)`
        }




        //! - =========================  conditions  ========================= -//



        if (this.isPage === 'index') {
            if (!this.once) {
                cursor.init()
                index.init(this.contentPage)
                this.once = true
                if($('.cols_index__drag').length > 0 && window.innerWidth > 1024 ) { new SliderDrag(this.contentPage.querySelector('#shopify-section-index-cols'),'cols') }
                if($('.dropped-index .cols_index__drag').length > 0 && window.innerWidth > 1024 ) { new SliderDrag(this.contentPage.querySelector('#shopify-section-index-dropped'),'drag__cntrl') }
            }
                
            index.onScroll()
        }




        // ______________ launches
        if (this.isPage === 'launches') {
            if (!this.once) {
                this.once = true
                if($('.drag').length > 0 && window.innerWidth > 1024 ) { new SliderDrag(this.contentPage, 'header-launch') }
                
            }
        }






        // ______________ about
        if (this.isPage === 'about') {
            if (!this.once) {
                this.once = true
                about.init()
            }
            about.onScroll()
        }


        // ______________ contact
        if (this.isPage === 'contact') {
            if (!this.once) {
                this.once = true
                contact.init()
            }
            contact.onScroll()
        }



        // ______________ collection
        if (this.isPage === 'collection') {
            if (!this.once) {
                accordion_filters.init()
                this.once = true
                collection.init()
            }
            collection.onScroll()
        }


        // ______________ PRODUCT
        if (this.isPage === 'product') {
            if (!this.once) {
                this.once = true
                ajaxify.init()
                ajaxify.onClick(this.contentPage)
                add_to_cart.init(this.contentPage)
                accordion.init(this.contentPage)
                product.init()
                //if($('.drag').length > 0 && window.innerWidth > 1024 ) { new SliderDrag(this.contentPage, 'cross-sell') }
            }
            product.onScroll()
        }




        // ______________ blog
        if (this.isPage === 'blog') {
            if (!this.once) {
                this.once = true
                blog.init()
            }
        }




        // ______________ article
        if (this.isPage === 'article') {
            if (!this.once) {
                this.once = true
                article.init()
            }
        }




        // ______________ cart
        if (this.isPage === 'cart') {
            if (!this.once) {
                this.once = true
                qty_picker.init()
            }
        }




        // ______________ wishlist
        if (this.isPage === 'wishlist') {
            if (!this.once) {
                this.once = true
                var checkExist = setInterval(function () {
                    if ($('.ZoomyWishlistPageGrid').length) {
                        console.log("Exists!");
                        window.dispatchEvent(new Event('resize'))
                        clearInterval(checkExist);
                    }
                }, 100); // check every 100ms
                gsap.delayedCall(5, () => window.dispatchEvent(new Event('resize')) )
            }
        }


        this.requestAnimationFrame()
    }

    on(requestAnimationFrame = true) {
        if ($(window).width() > 1024 && this.isPage != 'collection') {
            this.setStyles()
            this.setHeight()
        }
        this.addEvents()

        requestAnimationFrame && this.requestAnimationFrame()
    }

    off(cancelAnimationFrame = true) {
        cancelAnimationFrame && this.cancelAnimationFrame()

        this.removeEvents()
    }

    requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.run)
    }

    cancelAnimationFrame() {
        cancelAnimationFrame(this.rAF)
    }

    destroy() {
        this.off()
        document.body.style.height = ''
        this.data = null

    }

    resize() {
        this.setHeight()
    }

    addEvents() {
        window.addEventListener('resize', this.resize, { passive: true })
        window.addEventListener('scroll', this.scroll, { passive: true })
    }

    removeEvents() {
        window.removeEventListener('resize', this.resize, { passive: true })
        window.removeEventListener('scroll', this.scroll, { passive: true })
    }

    
    
    
    
    
    
    
    
    
    
    //? - =========================  verify drag  ========================= -//
    //? - =========================  verify drag  ========================= -//
    verifyDrag() {
        //mobile
        this.slider = this.contentPage.querySelectorAll('.js-slider') || null
        if($(window).width() < 1025 && this.slider.length > 0) {
            this.slider.forEach((el) => {
                new DragSlider(el)
            })
        }
        
        //this.slider_section = this.contentPage.querySelectorAll('.js-slider-section') || null
        //if(this.slider_section.length > 0) {
        //    this.slider_section.forEach((el) => {
        //        new DragSection(el)
        //    })
        //}

    }
    
    init() {
        //this.contentPage = contentPage
        //this.isPage = isPage
        //this.once = once
        this.contentPage = document.querySelector('[data-scroll-content]')
        this.isPage = $(this.contentPage).data('ispage')
        this.once = false
        this.math = {
            lerp: (a, b, n) => {
                return (1 - n) * a + n * b
            },
            norm: (value, min, max) => {
                return (value - min) / (max - min)
            }
        }

        this.config = {
            height: window.innerHeight,
            width: window.innerWidth
        }
        this.bindMethods()
        this.data = {
            ease: 0.06,
            current: 0,
            last: 0
        }

        this.dom = {
            el: document.querySelector('[data-scroll]'),
            content: document.querySelector('[data-scroll-content]')
        }

        this.rAF = null
        this.on()
        this.verifyDrag()
        global_app.init()
    }
}


export const scroll = new Smooth()