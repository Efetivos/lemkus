
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

        if ($(window).width() > 1024) {
            this.onHover()
        }
    }












    //? - =========================  onhover  ========================= -//
    //? - =========================  onhover  ========================= -//
    onHover() {
        this.trg_active = null
        this.dd_active = null
        let that = this

        //trg hover
        $(this.dd.trg).hover(
            function () {
                let thisIndex = $(that.dd.trg).index(this)
                that.trg_active = $(this).data('trgdd')
                $(that.dd.els).eq(thisIndex).addClass('dd-active')
                $(that.body).addClass('is-dropd')
                console.log(that.trg_active )
            }, function () {
                let thisIndex = $(that.dd.trg).index(this)
                
                //if($("#myDiv:hover").length != 0){
                //} else{
                //}
                
                
                setTimeout(function () {
                    if (!$(that.body).hasClass(''+that.trg_active)) {
                        //console.log("that.trg_active: " + that.trg_active);
                        //console.log("that.dd_active: " + that.dd_active);
                        $(that.dd.els).eq(thisIndex).removeClass('dd-active')
                        $(that.body).removeClass('is-dropd')
                    } else { console.log('same ') }
                }, 100);
            })



        //dd hover
        $(this.dd.els).hover(
            function () {
                $(that.body).addClass($(this).data('dd'))
            }, function () {
                let thisIndex = $(that.dd.els).index(this)
                $(that.body).removeClass($(this).data('dd'))
                $(that.body).removeClass('is-dropd')
                $(that.dd.trg).eq(thisIndex).trigger('mouseleave')
            })

    }

}
export const dropdown = new Dropdown()