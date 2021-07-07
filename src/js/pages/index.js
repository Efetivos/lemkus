
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger);
class Index {
    constructor() {
        return;
    }

    init() {
        this.body = document.querySelector('body')

        this.contentPage = document
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.vh = window.innerHeight
        this.onResize()
        if($(window).width() > 1024) {
            

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


            
            setInterval(this.hourCapeTown, 1000);
            this.onScene()
            this.isTop()
            
        }
        

    }

    
    
    
    
    isTop() {
        this.tl_istop = gsap.timeline( { scrollTrigger: { trigger: 'body', start: 'top 0', end: window.innerWidth * 0.15989, scrub: true } } )
            //.fromTo('.logo-main', { top: window.innerWidth * 0.0489, width: window.innerWidth * 0.964 }, { duration: 3, top: window.innerWidth * 0.014, width: window.innerWidth * 0.092, ease: 'none' })
            //.fromTo('.logo-main', { xPercent: 473.1, yPercent: 729, scale: 10.44 }, { duration: 3, xPercent: 0, yPercent: 0, scale: 1, ease: 'none' })
            .fromTo('.logo-main', { xPercent: 0, yPercent: 0, scale: 1 }, { duration: 3, xPercent: -45.2, yPercent: -70.6, scale: 0.0935, ease: 'none' })
            .fromTo('.cape-hour', { opacity: 1 }, { duration: 1, opacity: 0, ease: 'none' }, 1.5)
    }
    
    
    
    
    
    
    //? - =========================  ONSCENE  ========================= -//
    //? - =========================  ONSCENE  ========================= -//
    onScene() {
        this.each_cols = this.qsa('.stagger-it')
        gsap.timeline({ scrollTrigger: { trigger: '.cols_index', start: 'top 75%' }})
            .fromTo(this.each_cols, { webkitClipPath: 'inset(100% 0% 0% 0%)', clipPath: 'inset(100% 0% 0% 0%)' }, { duration: 2, webkitClipPath: 'inset(0% 0% 0% 0%)', clipPath: 'inset(0% 0% 0% 0%)', ease: 'expo.out', stagger: .15 })
    }










    //? - =========================  CAPETOWN TIME  ========================= -//
    //? - =========================  CAPETOWN TIME  ========================= -//
    hourCapeTown() {
        this.cape_hour = document.querySelector('.cape-hour .hour')
        this.d = new Date();
        this.utc = this.d.getTime() + (this.d.getTimezoneOffset() * 60000);
        this.nd = new Date(this.utc + (3600000 * (2)));

        $(this.cape_hour).text(this.nd.toLocaleTimeString([], {
            hourCycle: 'h23',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }))
    }




    //? - =========================  ONSCROLL  ========================= -//
    //? - =========================  ONSCROLL  ========================= -//
    onScroll(scrolled) {
        if ($(window).width() > 1024) {
            ScrollTrigger.update()
            
            if (scrolled < this.vh * 0.02) {
                $(this.body).addClass('is-top-home')
            } else {
                $(this.body).hasClass('is-top-home') ? $(this.body).removeClass('is-top-home') : null

            }
        }
    }









    //? - =========================  resize  ========================= -//
    //? - =========================  resize  ========================= -//
    onResize() {
        let that = this
        $(window).resize(function () {
            that.vh = window.innerHeight
        })
    }
}
export const index = new Index()