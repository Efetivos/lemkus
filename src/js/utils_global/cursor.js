import { gsap } from 'gsap'
class Cursor {
    constructor() {
        return;
    }

    //?  -------------------------- INIT -------------------------- //
    //? -------------------------- INIT -------------------------- //
    init() {


        this.DOM = {
            cursor: document.querySelector('.cursor'),
            arrow: document.querySelector('.cursor__arrow'),
            bg: document.querySelector('.cursor__bg'),
            expl: document.querySelector('.cursor__expl'),
            mail: document.querySelector('.cursor__mail'),
            drag: document.querySelector('.cursor__drag'),
            cases_members: document.querySelectorAll('.members .post__img'),
            cases_leg_members: document.querySelectorAll('.members .cases-legacy__posts__each.hover-js.hover-expl '),
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
            that.mouse.moved = true;
            that.mouse.x = e.clientX;
            that.mouse.y = e.clientY;
            gsap.to(that.DOM.cursor, { duration: .8, ease: 'power2.out', y: that.mouse.y, x: that.mouse.x })
        });
    }




    getEls(contentPage) {
        this.trgs = {
            hover: contentPage.querySelectorAll('.hover-js') || null,
            expl: contentPage.querySelectorAll('.hover-expl') || null,
        }
    }


    //?  -------------------------- ON HOVER -------------------------- //
    //?  -------------------------- ON HOVER -------------------------- //
    onHovers(contentPage) {
        let that = this
        this.getEls(contentPage)

        //? ----- hover BG
        $(this.trgs.hover).add(this.DOM.cases_members).add(this.DOM.cases_leg_members).hover(
            function () {
                $(that.DOM.cursor).addClass('cursor-hover')
            }, function () {
                $(that.DOM.cursor).removeClass('cursor-hover')
            })
        $(this.trgs.hover).click(function () {
            $(that.trgs.hover).trigger('mouseleave')
        })


        //? ----- hover expl
        $(this.trgs.expl).add(this.DOM.cases_members).add(this.DOM.cases_leg_members).hover(
            function () {
                $(that.DOM.cursor).addClass('hover-expl')
            }, function () {
                $(that.DOM.cursor).removeClass('hover-expl')
            })



        //? ----- INVERT COLOR
        $(this.DOM.cases_leg_members).hover(
            function () {
                $(that.DOM.cursor).addClass('cursor-invert')
            }, function () {
                $(that.DOM.cursor).removeClass('cursor-invert')
            })
        $(this.trgs.hover).click(function () {
            $(that.trgs.hover).trigger('mouseleave')
        })
    }
}
export const cursor = new Cursor