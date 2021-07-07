
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
class Launches {
    constructor() {
        return;
    }

    init() {
        this.body = document.querySelector('body')

        this.contentPage = document
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.btn_viewall = document.querySelector('button.scroll-down')


        if ($(window).width() > 1024) { this.viewALl() }
    }










    //? - =========================  VIEW ALL BTn  ========================= -//
    //? - =========================  VIEW ALL BTn  ========================= -//
    viewALl() {


        $(this.btn_viewall).click(function () {
            gsap.to(window, { duration: .5, scrollTo: { y: '.main-launches', offsetY: window.innerWidth * 0.03 } })
        });
    }
}
export const launches = new Launches()