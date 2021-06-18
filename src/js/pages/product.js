
import { gsap } from 'gsap'
class Product {
    constructor() {
        return;
    }

    init(contentPage) {
        this.contentPage = contentPage
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        if ($(window).width() < 1025) {
            this.swipeMobile()
            this.onSwipe()
        }
    }




    //? - =========================  SWIPE MOBILE  ========================= -//
    //? - =========================  SWIPE MOBILE  ========================= -//

    swipeMobile() {
        this.swipe = {
            el: document.querySelector('.header-prod__gallery'),
            travel: document.querySelector('.header-prod__gallery__travel'),
            prev: document.querySelector('.count-dyna'),
            next: document.querySelector('.count-static')
        }
        this.travel_size = $('.header-prod__gallery__each').eq(1).outerWidth(true)
        this.options = {
            time: .75,
            animating: false,
            prev: -1,
            current: 0,
            length: $('.header-prod__gallery__each').length
        }

        $(this.swipe.next).text('/'+this.options.length)
        this.getSizeSwipe()
        this.onClickSwipe()

        let that = this
        $(window).resize(function () {
            that.getSizeSwipe()
        })
    }

    getSizeSwipe() {
        this.travel_size = $('.header-prod__gallery__each').eq(1).outerWidth(true)
        this.options.current = 0
        gsap.set(this.swipe.travel, { x: 0 })
    }

    goSwipe() {
        let that = this
        gsap.to(this.swipe.travel, { duration: this.options.time, x: `-=${this.travel_size}`, ease: 'expo.out', onComplete() { that.options.animating = false } })
    }

    backSwipe() {
        let that = this
        gsap.to(this.swipe.travel, { duration: this.options.time, x: `+=${this.travel_size}`, ease: 'expo.out', onComplete() { that.options.animating = false } })
    }


    onClickSwipe() {
        let that = this
        $(this.swipe.next).click(function () {
            if (!that.options.animating && that.options.current < (that.options.length - 1)) {
                that.options.animating = true
                that.options.current++
                that.options.prev = that.options.current - 1
                that.goSwipe(that.options.current)
                $(that.swipe.prev).text(that.options.current + 1)
            }
        })


        $(this.swipe.prev).click(function () {
            if (!that.options.animating && that.options.current > 0) {
                that.options.animating = true
                that.options.current--
                that.options.prev = that.options.current + 1
                that.backSwipe(that.options.current)
                $(that.swipe.prev).text(that.options.current + 1)
            }
        })
    }



    onSwipe() {
        this.swipe.el.addEventListener('touchstart', handleTouchStart, false);
        this.swipe.el.addEventListener('touchmove', handleTouchMove, false);

        let xDown = null,  yDown = null;
        let that = this

        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        };


        function handleTouchMove(evt) {
            if (!xDown || !yDown) {
                return;
            }

            let xUp = evt.touches[0].clientX;
            let yUp = evt.touches[0].clientY;

            let xDiff = xDown - xUp;
            let yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) { 
                xDiff > 0 ? $(that.swipe.next).trigger('click') :  $(that.swipe.prev).trigger('click')
            } else { }
            /* reset values */
            xDown = null;
            yDown = null;
        };
    }






}
export const product = new Product()