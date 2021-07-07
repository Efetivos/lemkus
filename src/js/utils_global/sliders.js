
import { gsap } from 'gsap'
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);
export default class DragSlider {
    constructor(el) {
        this.el = el
        this.slider = {
            el: this.el,
            holder: this.el.querySelector('.js-slider__holder'),
            each: this.el.querySelectorAll('.js-slider__each')
        }

        this.setters()
        this.onResize()
        this.onDrag()
    }

    // setters
    // -------------------------------------------
    setters() {
        this.slider.holder.style.display = 'inline-flex'
    }






    //
    // resize
    // -------------------------------------------
    onResize() {
    }




    //
    // progress
    // -------------------------------------------



    //
    // onDrag
    // -------------------------------------------
    onDrag() {
        let that = this
        Draggable.create(that.slider.holder, {
            type: "x",
            //edgeResistance: 0.5,
            bounds: that.slider.el,
            inertia: true,
            onPress: () => $('body').addClass('is-dragging'),
            onRelease: () => $('body').removeClass('is-dragging')
        });

    }

}
