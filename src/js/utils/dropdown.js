
import { gsap } from 'gsap'
class Dropdown {
    constructor() {
        return;
    }

    init() {
        this.contentPage = document
        let doc = this.contentPage

        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.body = this.qs('body')
        this.dd = {
            trg: this.qsa('.trg-dd'),
            els: this.qsa('.menu-dd')
        }

        if($(window).width() > 1024) {
            this.onHover()
        }
    }












    //? - =========================  onhover  ========================= -//
    //? - =========================  onhover  ========================= -//
    onHover() {
        let that = this
        $(this.dd.trg).hover(
            function () {
                let thisIndex = $(that.dd.trg).index(this)
                $(that.dd.els).eq(thisIndex).addClass('dd-active')
                $(that.body).addClass('is-dropd')
            }, function () {
                let thisIndex = $(that.dd.trg).index(this)
                $(that.dd.els).eq(thisIndex).removeClass('dd-active')
                $(that.body).removeClass('is-dropd')
            });

    }

}
export const dropdown = new Dropdown()