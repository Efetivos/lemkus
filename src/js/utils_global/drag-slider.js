
import { gsap } from 'gsap'
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);



export default class SliderDrag {
    constructor(el) {
        this.drag = {
            btn: el.querySelector('.drag'),
            width: el.querySelector('.drag').getBoundingClientRect().width,
            travel: el.querySelector('.header-laun__colle__hold'),
            line: el.querySelector(".drag__cntrl__lines"),
            line_dyna: el.querySelector(".drag-line.line-dyna"),
        }

        this.createTimeline()
        this.createDrag()
    }


    //create timelines
    createTimeline() {
        this.wallk_btn = window.innerWidth * 0.85
        this.width_drag = this.drag.line.getBoundingClientRect().width * 0.915
        this.t1_drag_btn = gsap.timeline({ paused: true })
            .to(this.drag.btn, { duration: 100, xPercent: 986, ease: "none" })
            .from(this.drag.line_dyna, { duration: 100, scaleX: 0, transformOrigin: 'left', ease: "none" }, 0)
            
            this.t1_drag = gsap.timeline({ paused: true })
            .to(this.drag.travel, { duration: 100, xPercent: - 186, ease: "none" }, 0)

    }




    //create drags
    createDrag() {
        let that = this
        let progressProxy = null
        const proxy = document.createElement("div");
        Draggable.create(proxy, {
            type: 'x',
            trigger: this.drag.btn,
            onDragStart: function () {
                that.t1_drag.pause();
            },
            onDrag: function () {

                progressProxy = this.x / that.width_drag
                gsap.to(that.t1_drag, { duration: 1.25, progress: progressProxy, ease: 'expo.out', overwrite: true })
                gsap.to(that.t1_drag_btn, { duration: .6, progress: progressProxy, ease: 'expo.out', overwrite: true })
            },
            onPress: function () {
                this.update();
            },
            bounds: { minX: 0, maxX: that.width_drag },
        });

    }




    //create drags
    onResize() {
        let that = this
        $(window).resize(function () {
            that.t1_drag.progress = 0
            that.wallk_btn = window.innerWidth * 0.85
            that.width_drag = that.drag.line.getBoundingClientRect().width
        })
    }


}
