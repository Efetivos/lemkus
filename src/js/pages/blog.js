
import { gsap } from 'gsap'
class Blog {
    constructor() {
        return;
    }

    init() {
        this.contentPage = document
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)


        this.verifyTag()
    }


    //? - =========================  VERIFY TAGS  ========================= -//
    //? - =========================  VERIFY TAGS  ========================= -//
    verifyTag() {

        let currentUrl = window.location.href
        

        if (window.location.href.indexOf('/tagged/') > 0) {
            let getDomain = currentUrl.substr(0, currentUrl.indexOf('/tagged/'));
            console.log(getDomain);
        }
        else {
            console.log('normal');
        }


    }

}
export const blog = new Blog()