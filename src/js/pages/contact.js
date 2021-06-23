
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
class Contact {
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


            this.onScene()
        }


    }




    onScene() {
        this.rotate_svg = this.qs('.rotate-svg')
        gsap.timeline({
            scrollTrigger: {
                trigger: ".ctt-text",
                start: "top 100%", 
                endTrigger:'footer',
                end:'top top',
                scrub: true
            }
        })
            .to(this.rotate_svg, { duration: 1, rotation: 280, ease:'none' })

    }





    //? - =========================  ONSCROLL  ========================= -//
    //? - =========================  ONSCROLL  ========================= -//
    onScroll(scrolled) {
        ScrollTrigger.update()
    }


}
export const contact = new Contact()