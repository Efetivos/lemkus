
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
gsap.registerPlugin(ScrollTrigger, SplitText)

class About {
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


            this.onEnter()
            this.onScene()
        }


    }


    //? - =========================  HEADER ABOUT  ========================= -//
    onEnter() {
        this.header = {
            title: this.qs('.about-header__text'),
            img: this.qs('.about-header__image'),
            svg: this.qs('.about-header__svg'),
        }


        new SplitText(this.header.title, { type: "lines", linesClass: "line-wrap line++" })
        new SplitText(this.header.title, { type: "words,chars", wordsClass: 'wrapped-split' })
        gsap.set('.wrapped-split div', { yPercent: 110 })


        this.tl_header = gsap.timeline({ paused: true })
            .to('.wrapped-split div', { duration: 2, yPercent: 2, ease: 'expo.out', stagger: .04 })
            .from(this.header.svg, { duration: 2, yPercent: 50, opacity: 0, ease: 'expo.out' }, .85)
            .from(this.header.img, { duration: 2, yPercent: 25, opacity: 0, ease: 'expo.out' }, 1)
    }
    goEnter() {
        this.tl_header.play(0)
    }
    


    onScene() {

        //? - =========================  ROTATE SVG  ========================= -//
        this.rotate_svg = this.qs('.rotate-svg')
        gsap.timeline({
            scrollTrigger: {
                trigger: ".about-header",
                start: "top top",
                endTrigger: '.about-header__image',
                end: 'top top',
                scrub: true
            }
        })
            .to(this.rotate_svg, { duration: 1, rotation: 280, ease: 'none' })



        

        //? - =========================  BIG TEXT  ========================= -//
        this.big_texts = this.qs('.big-text__title')
        

        new SplitText(this.big_texts, { type: "lines", linesClass: "line-wrap line++" })
        new SplitText(this.big_texts, { type: "words,chars", wordsClass: 'wrapped-split-big' })
        gsap.set('.wrapped-split-big div', { yPercent: 110 })


        gsap.timeline( { scrollTrigger: { trigger: ".big-text__title", start: "top 50%" } } )
            .to('.wrapped-split-big div', { duration: 2, yPercent: 2, ease: 'expo.out', stagger: .04 })


    }





    //? - =========================  ONSCROLL  ========================= -//
    //? - =========================  ONSCROLL  ========================= -//
    onScroll(scrolled) {
        ScrollTrigger.update()
    }


}
export const about = new About()