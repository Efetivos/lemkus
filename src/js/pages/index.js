
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
            setInterval(this.hourCapeTown, 1000);
            this.onScene()
        }
        

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