
import { gsap } from 'gsap'
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);



export default class SliderDrag {
    constructor(el, type) {
        this.el = el
        this.type = type
        this.drag = {
            btn: this.el.querySelector('.drag'),
            width: this.el.querySelector('.drag').getBoundingClientRect().width,
            line: this.el.querySelector(".drag__cntrl__lines"),
            line_dyna: this.el.querySelector(".drag-line.line-dyna"),
        }

        this.detectType()
        this.createTimeline()
        this.createDrag()
    }


    
    
    
    
    
    
    
    
    
    
    //? - =========================  DETECT TYPE  ========================= -//
    //? - =========================  DETECT TYPE  ========================= -//
    detectType() {
        if(this.type == 'cols') { 
            this.travel = this.el.querySelector('ul.cols_index__items')
            this.drag_force = 0.92
            this.drag_move =  66.82
            this.drag_move_btn =  1141.44
        }
        if(this.type == 'header-launch') { 
            this.travel = this.el.querySelector('.header-laun__colle__hold')
            this.drag_force = 0.915  
            this.drag_move =  186
            this.drag_move_btn =  986
        }
        if(this.type == 'cross-sell') { 
            this.travel = this.el.querySelector('.cross-sell__hold')
            this.drag_force = 0.92
            this.drag_move =  66.9
            this.drag_move_btn =  1141.44
        }
    }






    //create timelines
    createTimeline() {
        this.wallk_btn = window.innerWidth * 0.85
        this.width_drag = this.drag.line.getBoundingClientRect().width * this.drag_force
        this.t1_drag_btn = gsap.timeline({ paused: true })
            .to(this.drag.btn, { duration: 100, xPercent: (this.drag_move_btn), ease: "none" })
            .from(this.drag.line_dyna, { duration: 100, scaleX: 0, transformOrigin: 'left', ease: "none" }, 0)
            
            this.t1_drag = gsap.timeline({ paused: true })
            .to(this.travel, { duration: 100, xPercent: - (this.drag_move), ease: "none" }, 0)

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
