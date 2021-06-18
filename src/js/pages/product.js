
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import { swipe_product } from '../utils/swipe-product';
class Product {
    constructor() {
        return;
    }

    init() {
        this.contentPage = document
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        if ($(window).width() < 1025) {
            swipe_product.init(document)
        } else {
            this.anchorsImgs()
        }
    }












    //? - =========================  ANCHORS  ========================= -//
    //? - =========================  ANCHORS  ========================= -//

    anchorsImgs() {
        this.thumbs = {
            each: this.qsa('.header-prod__thumbs__each'),
            bg_fixed: this.qs('.bg-fixed-els'),
            each_img_galle: this.qsa('.header-prod__gallery__each')
        }

        let that = this
        $(this.thumbs.each).click(function () {

            let indexThis = $(that.thumbs.each).index(this)
            let $gallery_target = $(that.thumbs.each_img_galle).eq(indexThis)
            console.log($gallery_target[0]);
            gsap.to(window, { duration: .6, scrollTo: { y: $gallery_target, offsetY: window.innerWidth * 0.045 } })

            $(that.thumbs.each).removeClass('thumbs-active')
            $(this).addClass('thumbs-active')
        })
    }

}
export const product = new Product()