
import { gsap } from 'gsap'
class Index {
    constructor() {
        return;
    }

    init(contentPage) {
        this.contentPage = contentPage
        this.body = document.querySelector('body')
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.vh = window.innerHeight
        this.onResize()
        
    }






    //? - =========================  ONSCROLL  ========================= -//
    //? - =========================  ONSCROLL  ========================= -//
    onScroll(scrolled) {
        //if($(window).width() > 1024) {
        //    if(scrolled < this.vh * 0.02) {
        //        $(this.body).addClass('is-top-home')
        //    } else {
        //        $(this.body).hasClass('is-top-home') ? $(this.body).removeClass('is-top-home') : null
        //        
        //    }
        //}
    }


    
    
    
    
    
    
    
    //? - =========================  resize  ========================= -//
    //? - =========================  resize  ========================= -//
    onResize() {
        let that = this
        $(window).resize(function() {
            that.vh = window.innerHeight
        })
    }
}
export const index = new Index()