
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger"
class Collection {
    constructor() {
        return;
    }

    init() {
        this.contentPage = document
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        if ($(window).width() > 1024) {

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
            this.stickyFilter()
        }
    }




    //? - =========================  STICKY FILTER  ========================= -//
    //? - =========================  STICKY FILTER  ========================= -//

    stickyFilter() {
        let that = this

        //_ pin infos
        this.filter_prod = this.qs('.filter-prod')
        ScrollTrigger.create({
            trigger: '#shopify-section-filter-prod',
            start: 'top top',
            pin: this.filter_prod,
            endTrigger: 'footer',
        })

    }











    //? - =========================  ONSCROLL  ========================= -//
    //? - =========================  ONSCROLL  ========================= -//
    onScroll(scrolled) {
        ScrollTrigger.update()
    }


}
export const collection = new Collection()