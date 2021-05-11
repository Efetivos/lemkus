
import { gsap } from 'gsap'
class Home {
    constructor() {
        return;
    }

    init(contentPage) {
        this.contentPage = contentPage
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

    }
}
export const home = new Home()