
import { gsap } from 'gsap'
import { index } from '../pages';
import { ajaxify } from '../utils_shopify/ajaxify';
import { accordion } from './accordion'
import { accordion_filters } from './accordion-filters';
import { add_to_cart } from './add-to-cart';
class Smooth {
    constructor() {
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

        if ($(window).width() > 1024) {
            this.dom.content.style.transform = `translate3d(0, -${this.data.last.toFixed(0)}px, 0)`
        }




        //! - =========================  conditions  ========================= -//



        //if (this.isPage === 'index') {
        //    if (!this.once) {
        //        index.init(this.contentPage)
        //        this.once = true
        //    }
        //        
        //    index.onScroll(this.data.last)
        //}



        // ______________ shop
        if (this.isPage === 'collection') {
            if (!this.once) {
                accordion_filters.init()
                this.once = true
            }
        }


        // ______________ PRODUCT
        if (this.isPage === 'product') {
            if (!this.once) {
                ajaxify.init()
                ajaxify.onClick(this.contentPage)
                add_to_cart.init(this.contentPage)
                accordion.init(this.contentPage)
                this.once = true
            }
        }




        this.requestAnimationFrame()
    }

    on(requestAnimationFrame = true) {
        if ($(window).width() > 1024) {
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
    }
}


export const scroll = new Smooth()