
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
        }

        
        this.sortBy()
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