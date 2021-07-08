
import { gsap } from 'gsap'
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger, Flip)
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
            $('.shopify-section').eq(0).remove()

            this.resizing()
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
            //this.stickyFilter()

            this.awaitFilter()
        }


        //this.sortBy()
    }




    //? - =========================  STICKY FILTER  ========================= -//
    //? - =========================  STICKY FILTER  ========================= -//

    stickyFilter() {
        let that = this

        //_ pin infos
        this.filter_prod = this.qs('.filter-prod')
        ScrollTrigger.create({
            trigger: '.header-coll__btn-filter.no-mobile',
            start: 'top 10%',
            pin: this.filter_prod,
            endTrigger: 'footer',
        })

    }







    //? - =========================  MOBILE  ========================= -//
    //? - =========================  MOBILE  ========================= -//
    sortBy() {

        $("#SortBy").change(function () {

            let currentUrl = window.location.href
            var selectOptionBlogNavigation = $(this).children("option:selected").val();

            console.log(currentUrl);
            console.log(selectOptionBlogNavigation);

            if (window.location.href.indexOf('?sort_') > 0) {
                let getDomain = currentUrl.substr(0, currentUrl.indexOf('?'));
                window.location.href = getDomain + `${selectOptionBlogNavigation}`
                //Barba.Pjax.goTo(getDomain + `${selectOptionBlogNavigation}`)
            }
            else {
                window.location.href = currentUrl + `${selectOptionBlogNavigation}`
                //Barba.Pjax.goTo(currentUrl + `${selectOptionBlogNavigation}`)
            }
        });
    }













    //? - =========================  AWAIT FILTER  ========================= -//
    //? - =========================  AWAIT FILTER  ========================= -//
    awaitFilter() {
        let that = this
        var checkExist = setInterval(function () {
            if ($('.toggle-filter').length) {
                let $searchClone = $('#gf-controls-container').clone()
                $('.products').addClass('loaded-filter')
                $('#gf-controls-container').remove()
                $searchClone.prependTo($('main.main-collection'))
                that.flipFilter()
                clearInterval(checkExist);
            }
        }, 100); // check every 100ms
    }

    flipFilter() {
        let that = this
        this.body = document.querySelector('body')
        this.filter = {
            filter_el: this.qs('#gf-tree'),
            btn_trigger: this.qs('.toggle-filter'),
            each_prod: this.qsa('.prod-card__each '),
            grid: this.qsa('#gf-grid'),
            toggle_text: this.qsa('#gf-grid')
        }

        //$(this.body).addClass('is-filter')
        //gsap.set(this.filter.filter_el, { xPercent: -100})
        //let tl_filter_els = gsap.timeline().to(this.filter.filter_el, { xPercent: 0, duration: 0.5, ease: "expo.inOut" }).reverse(-1).reversed(true);
        let tl_filter_els = gsap.timeline().to(this.filter.filter_el, { xPercent: - 100, duration: 0.5, ease: "expo.inOut" }).reverse(-1).reversed(true);
        this.filter.btn_trigger.addEventListener("click", () => {
            const state = Flip.getState([that.filter.grid, that.filter.each_prod]);
            $(that.body).toggleClass('is-filter')
            $(that.body).addClass('flipping')
            $(that.body).hasClass('is-filter') ? $(this.filter.btn_trigger).text('SHOW FILTER') : $(this.filter.btn_trigger).text('HIDE FILTER') 
            

            Flip.from(state, { absolute: true, duration: 0.5, ease: "expo.inOut", onComplete: () => $(that.body).removeClass('flipping') })
            tl_filter_els.reversed(!tl_filter_els.reversed());
        });
    }










    //? - =========================  ONSCROLL  ========================= -//
    //? - =========================  ONSCROLL  ========================= -//
    onScroll(scrolled) {
        ScrollTrigger.update()
    }










    resizing() {
        this.rem = (window.innerWidth / (1366 * 10))

        console.log(this.rem)
        console.log(document.querySelector('.bg-fixed-els').getBoundingClientRect().height)
    }


    //? - =========================  ONRESIZE  ========================= -//
    //? - =========================  ONRESIZE  ========================= -//
    onResize() {
        let that = this
        $(window).resize(function () {
            that.resizing()
        })
    }

}
export const collection = new Collection()