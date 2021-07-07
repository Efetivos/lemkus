
import { gsap } from 'gsap'
import { SplitText } from "gsap/SplitText"
gsap.registerPlugin(SplitText)

class Article {
    constructor() {
        return;
    }

    init() {
        this.contentPage = document
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)
        

    }


    //? - =========================  HEADER ABOUT  ========================= -//
    onEnter() {
        this.header = {
            title: document.querySelector('.header-article__title'),
            infos: document.querySelector('.header-article__infos'),
        }


        new SplitText(this.header.title, { type: "lines", linesClass: "line-wrap line++" })
        new SplitText(this.header.title, { type: "words,chars", wordsClass: 'wrapped-split' })
        gsap.set('.wrapped-split div', { yPercent: 110 })


        this.tl_header = gsap.timeline({ paused: true })
            .to('.wrapped-split div', { duration: 2, yPercent: 2, ease: 'expo.out', stagger: .04 })
            .from(this.header.infos, { duration: 2, yPercent: 50, opacity: 0, ease: 'expo.out' }, .65)
            .from('main.main-article', { duration: 2, y: window.innerHeight * 0.3, opacity: 0, ease: 'expo.out' }, .8)
    }
    goEnter() {
        this.tl_header.play(0)
    }
    


}
export const article = new Article()