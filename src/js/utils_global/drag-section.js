
import { gsap } from 'gsap'
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);
export default class DragSection {
    constructor(el) {
        this.el = el
        this.slider = {
            el: this.el,
            holder: this.el.querySelector('.js-slider-section__holder'),
            each: this.el.querySelectorAll('.js-slider-section__each')
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
            edgeResistance: 0.925,
            bounds: that.slider.el,
            inertia: { velocity: 1500, max: 2000, min: 0 }
        });

    }

}
