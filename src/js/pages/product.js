
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
import { swipe_product } from '../utils/swipe-product';
class Product {
    constructor() {
        return;
    }

    init() {
        this.contentPage = document
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        if ($(window).width() < 1025) {
            swipe_product.init(document)
        } else {

            ScrollTrigger.scrollerProxy('[data-scroll-content]', {
                scrollTop(value) {
                    return arguments.length ? null : (document.querySelector('[data-scroll-content]').getBoundingClientRect().top) * -1
                },
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                },
            });
            ScrollTrigger.defaults({ scroller: '[data-scroll-content]' })
            ScrollTrigger.refresh()

            this.anchorsImgs()
            this.pinObjects()
        }
    }












    //? - =========================  ANCHORS  ========================= -//
    //? - =========================  ANCHORS  ========================= -//

    anchorsImgs() {
        this.thumbs = {
            each: this.qsa('.header-prod__thumbs__each'),
            bg_fixed: this.qs('.bg-fixed-els'),
            each_img_galle: this.qsa('.header-prod__gallery__each')
        }

        let that = this
        $(this.thumbs.each).click(function () {

            let indexThis = $(that.thumbs.each).index(this)
            let $gallery_target = $(that.thumbs.each_img_galle).eq(indexThis)
            gsap.to(window, { duration: .6, scrollTo: { y: $gallery_target, offsetY: window.innerWidth * 0.045 } })

            $(that.thumbs.each).removeClass('thumbs-active')
            //$(this).addClass('thumbs-active')
        })
    }















    //? - =========================  PIN OBJECTS  ========================= -//
    //? - =========================  PIN OBJECTS  ========================= -//
    pinObjects() {
        let that = this

        //_ pin infos
        this.prod_descr_hold = this.qs('.header-prod__infos__hold')
        ScrollTrigger.create({
            trigger: '.header-prod__infos',
            start: 'top 12%',
            pin: this.prod_descr_hold,
            endTrigger: 'main.main-prod',
            end: 'top 120%',
            toggleClass: "floating"
        })


        //_ pin thumbs
        this.prod_thumbs = this.qsa('.header-prod__thumbs__travel')
        ScrollTrigger.create({
            trigger: '.header-prod__infos',
            start: 'top 8.5%',
            pin: this.prod_thumbs,
            endTrigger: 'main.main-prod',
            end: 'top 120%',
            toggleClass: "floating"
        })

        this.thumbs.each_img_galle.forEach((el, index) => {

            ScrollTrigger.create({
                trigger: el,
                start: 'top 15%',
                end: 'bottom 15%',
                onEnter: () => $(that.thumbs.each).eq(index).addClass('thumbs-active') ,
                onLeave: () => $(that.thumbs.each).eq(index).removeClass('thumbs-active') ,
                onEnterBack: () => $(that.thumbs.each).eq(index).addClass('thumbs-active') ,
                onLeaveBack: () => $(that.thumbs.each).eq(index).removeClass('thumbs-active')
            })


        })
    }








    //? - =========================  ONSCROLL  ========================= -//
    //? - =========================  ONSCROLL  ========================= -//


    onScroll(scrolled) {
        ScrollTrigger.update()
    }

}
export const product = new Product()