
import { gsap } from 'gsap'
class IntroHome {
    constructor() {
        return;
    }

    init() {
        this.body = document.querySelector('body')
        this.contentPage = document
        let doc = document
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.intro = {
            text_header: this.qsa('.header-index__hl__texts span, .header-index__hl__texts a'),
            els_fixed: this.qsa('.cape-hour, .menu-acc-wish, .menu-search-bag, .main-menu ul li'),
            bg_menu: this.qsa('.bg-fixed-els'),
            header_hold: this.qsa('.header-index__hold'),
            header_imgs: this.qsa('.header-index__hl__img, .header-index__imgs'),
            logo_paths: this.qsa('a.logo-main svg path, a.logo-main svg polygon'),
        }

        this.setters()

    }









    //? - =========================  SETTERS  ========================= -//
    //? - =========================  SETTERS  ========================= -//
    setters() {
        this.time = 1.5
        this.tl_texts = gsap.timeline().from(text_header, { duration: this.time, opacity: 0, y: window.innerHeight * 0.1, ease: 'expo.out'})

        this.tl_fixeds = gsap.timeline().from(els_fixed, { duration: this.time, opacity: 0, y: - (window.innerHeight * 0.05), ease: 'expo.out'})

        this.tl_bg_menu = gsap.timeline().from(bg_menu, { duration: this.time, webkitClipPath: 'inset(0% 100% 0% 0%)', clipPath: 'inset(0% 100% 0% 0%)', ease: 'expo.out'})

        this.tl_header_imgs = gsap.timeline().from(header_imgs, { duration: this.time, webkitClipPath: 'inset(12% 40% 12% 40%)', clipPath: 'inset(12% 40% 12% 40%)', ease: 'expo.out'})

        this.tl_header_hold = gsap.timeline().from(header_hold, { duration: this.time, opacity: 0, y: - (window.innerHeight * 0.26), ease: 'expo.out'})

        this.logo_paths = gsap.timeline().from(text_header, { duration: this.time, opacity: 0, yPercent: 100, ease: 'expo.out'})

        this.goTimeline()
    }









    //? - =========================  TIMELINE MASTER  ========================= -//
    //? - =========================  TIMELINE MASTER  ========================= -//
    goTimeline() {
        this.time = 1.5
        this.tl_master = gsap.timeline( { delay: 3 } )
            .add(this.tl_texts)
            .add(this.tl_fixeds)
            .add(this.tl_bg_menu)
            .add(this.tl_header_imgs)
            .add(this.tl_header_hold)
            .add(this.logo_paths)
    }





}
export const intro_home = new IntroHome()