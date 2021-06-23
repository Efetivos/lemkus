export default class {
    constructor(el) {
        this.el = el.element
        this.index = el.index
        this.el_height = this.el.getBoundingClientRect().height
        this.total_height = el.total_height
        this.extra = 0

    }



    //? - =========================  UPDATE POSITION  ========================= -//
    //? - =========================  UPDATE POSITION  ========================= -//

    update(posY, direction) {
        this.posY = posY
        let thisOffset = this.el.getBoundingClientRect().top
        this.el_height = this.el.getBoundingClientRect().height
        this.el.style.transform = `translate3d(0, ${this.posY.current - this.extra}px, 0)`

        if (direction === 'up' && thisOffset < - (this.el_height)) {
            this.extra -= (this.total_height / 2)
        }

        if (direction === 'down' && thisOffset > ((this.total_height * 0.75))) {
            this.extra += (this.total_height / 2)
        }

    }

    onResize(total_height) {
        this.posY = 0
        this.total_height = total_height
        this.extra = 0
        this.el_height = this.el.getBoundingClientRect().height
    }
}