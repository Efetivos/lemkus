
import { gsap } from 'gsap'
import normalizeWheel from 'normalize-wheel'; // npm i normalize-wheel -D
import Media from './Media';

class InfinityScroll {
    constructor() {
        return;
    }

    init() {
        let doc = document
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

            $('ul.menu-blog__hold.infinity__hold.no-desk').remove()

        this.body = document.querySelector('body')
        this.scroll = {
            ease: 0.05,
            current: 0,
            target: 0,
            last: 0
        }

        this.createMedias()
        this.update()
        this.addEventListeners()
        this.onResize()

    }





    //? - =========================  createmedias  ========================= -//
    //? - =========================  createmedias  ========================= -//
    createMedias() {
        let that = this
        this.imgs = this.qsa('.infinity__each')
        this.hold = this.qs('.infinity__hold')
        this.total_height = this.hold.getBoundingClientRect().height
        this.imgs = this.qsa('.infinity__each')
        this.medias = Array.from(this.imgs).map((element, index) => {
            let media = new Media({
                element,
                total_height: that.total_height,
                index
            })
            return media
        })

    }



    //? - =========================  ONWHEEL  ========================= -//
    //? - =========================  ONWHEEL  ========================= -//
    onResize(event) {

        this.scroll = {
            ease: 0.05,
            current: 0,
            target: 0,
            last: 0
        }

        this.total_height = this.hold.getBoundingClientRect().height
        if (this.medias) {
            this.medias.forEach(media => media.onResize(this.total_height))
        }
    }





    //? - =========================  lerp  ========================= -//
    //? - =========================  lerp  ========================= -//
    lerp(p1, p2, t) {
        return p1 + (p2 - p1) * t
    }



    onTouchDown(event) {
        this.isDown = true

        this.scroll.position = this.scroll.target
        this.start = event.touches ? event.touches[0].clientY : event.clientY
    }

    onTouchMove(event) {
        if (!this.isDown) return

        const y = event.touches ? event.touches[0].clientY : event.clientY
        const distance = (this.start - y) * 2.5

        this.scroll.target = this.scroll.position - distance
    }

    onTouchUp(event) {
        this.isDown = false
    }

    //? - =========================  ONWHEEL  ========================= -//
    //? - =========================  ONWHEEL  ========================= -//
    onWheel(event) {
        const normalized = normalizeWheel(event)
        const speed = normalized.pixelY
        this.scroll.target -= speed * 0.9
    }




    //? - =========================  UPDATE  ========================= -//
    //? - =========================  UPDATE  ========================= -//
    update() {
        if($(this.body).hasClass('is-menublog')){

            this.scroll.current = this.lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
            
            if (this.scroll.current > this.scroll.last) {
                this.direction = 'down'
            } else if (this.scroll.current < this.scroll.last) {
                this.direction = 'up'
            }
            
            if (this.medias) {
                this.medias.forEach(media => media.update(this.scroll, this.direction))
            }
            
            this.scroll.last = this.scroll.current
        }
        window.requestAnimationFrame(this.update.bind(this), { passive: true })
    }



    //? - =========================  LISTENERS  ========================= -//
    //? - =========================  LISTENERS  ========================= -//
    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this), { passive: true })

        window.addEventListener('mousewheel', this.onWheel.bind(this), { passive: true })
        window.addEventListener('wheel', this.onWheel.bind(this), { passive: true })

        window.addEventListener('mousedown', this.onTouchDown.bind(this), { passive: true })
        window.addEventListener('mousemove', this.onTouchMove.bind(this), { passive: true })
        window.addEventListener('mouseup', this.onTouchUp.bind(this), { passive: true })

        window.addEventListener('touchstart', this.onTouchDown.bind(this), { passive: true })
        window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true })
        window.addEventListener('touchend', this.onTouchUp.bind(this), { passive: true })
    }
}
export const infinity = new InfinityScroll()