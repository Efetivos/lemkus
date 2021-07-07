import { gsap } from 'gsap'
class Cursor {
    constructor() {
        return;
    }

    //?  -------------------------- INIT -------------------------- //
    //? -------------------------- INIT -------------------------- //
    init() {
        this.body = $('body')
        this.DOM = {
            cursor: document.querySelector('.cursor')
        }

        this.mouse = { x: 0, y: 0, moved: false };
        gsap.set(this.DOM.cursor, { xPercent: -50, yPercent: -50 })

        this.onMouseMove()
    } //close Init


    //?  -------------------------- MOUSE MOVE -------------------------- //
    //?  -------------------------- MOUSE MOVE -------------------------- //
    onMouseMove() {
        let that = this

        $(window).mousemove(function (e) {
            if(that.body.hasClass('is-drag')){
                that.mouse.moved = true;
                that.mouse.x = e.clientX;
                that.mouse.y = e.clientY;
                gsap.to(that.DOM.cursor, { duration: .8, ease: 'power2.out', y: that.mouse.y, x: that.mouse.x })
            }
        });


        this.onHovers()
    }



    //?  -------------------------- ON HOVER -------------------------- //
    //?  -------------------------- ON HOVER -------------------------- //
    onHovers() {
        let that = this
        this.trg_drag = document.querySelectorAll('.js-slider__holder')
        //? ----- hover expl
        $(this.trg_drag).hover(
            function () {
                that.body.addClass('is-drag')
            }, function () {
                that.body.removeClass('is-drag')
        })
    }
}
export const cursor = new Cursor