
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
            preloader: this.qsa('.header-index__preloader'),
            text_header: this.qsa('.header-index__hl__texts span, .header-index__hl__texts a'),
            els_fixed: this.qsa('.cape-hour, .menu-acc-wish, .menu-search-bag, .main-menu ul li'),
            bg_menu: this.qsa('.bg-fixed-els'),
            header_hold: this.qsa('.header-index__hold'),
            each_header_img: this.qsa('.header-index__imgs__each'),
            header_hl_img: this.qsa('.header-index__hl__img img'),
            header_hold_imgs: this.qsa('.header-index__hl__img, .header-index__imgs'),
            logo_paths: this.qsa('a.logo-main svg path, a.logo-main svg polygon'),
            cookie: this.qs('.cookies') || null
        }

        this.setters()

    }









    //? - =========================  SETTERS  ========================= -//
    //? - =========================  SETTERS  ========================= -//
    setters() {
        this.time = 1
        
        this.tl_header_hold_init = gsap.timeline()
            .fromTo(this.intro.header_hold, {  y: - (window.innerHeight * 5) }, { duration: this.time * 2.2, y: - (window.innerHeight * 0.26), ease: 'expo.out' })
            .from(this.intro.header_hold, { duration: this.time * 1.8, opacity: 0 , ease: 'power1.out' }, 0)
        

        this.tl_each_header_img = gsap.timeline( { paused: true } ).from($(this.intro.each_header_img).not($(this.intro.each_header_img).eq(0)), { duration: this.time * 0.1, opacity: 0 , ease: 'none', stagger: 1 })

        this.header_hl_img = gsap.timeline().from(this.intro.header_hl_img, { duration: this.time * 0.1, opacity: 0 , ease: 'none' })
            
            
            
        //second stage
        this.tl_header_hold_done = gsap.timeline().to(this.intro.header_hold, { duration: this.time * 1.8, y: 0, ease: 'expo.inOut' })
        
        
        this.tl_header_imgs = gsap.timeline().from(this.intro.header_hold_imgs, { duration: this.time * 1.8, webkitClipPath: 'inset(12% 40% 12% 40%)', clipPath: 'inset(12% 40% 12% 40%)', ease: 'expo.inOut' })
        this.logo_paths = gsap.timeline().from(this.intro.logo_paths, { duration: this.time, yPercent: 115, ease: 'expo.out', stagger: - .1 })
        
        this.tl_fixeds = gsap.timeline().from(this.intro.els_fixed, { duration: this.time, opacity: 0, y: - (window.innerHeight * 0.05), ease: 'expo.out', stagger: .02  })
        
        this.tl_bg_menu = gsap.timeline().from(this.intro.bg_menu, { duration: this.time * 1.4, webkitClipPath: 'inset(0% 100% 0% 0%)', clipPath: 'inset(0% 100% 0% 0%)', ease: 'expo.inOut' })
        
        this.tl_texts = gsap.timeline().from(this.intro.text_header, { duration: this.time * 1.6, opacity: 0, y: window.innerHeight * 0.065, ease: 'expo.out', stagger: .08 })
        
        this.tl_border_holder = gsap.from(this.intro.header_hold, { duration: .01,  border: 'none' })
        
        $(this.intro.cookie).length > 0 ? this.tl_cookies = gsap.from(this.intro.cookie, { duration: this.time,  autoAlpha: 0  }) : null
        this.goTimeline()
    }









    //? - =========================  TIMELINE MASTER  ========================= -//
    //? - =========================  TIMELINE MASTER  ========================= -//
    goTimeline() {
        this.time = 1.5
        this.tl_master = gsap.timeline( { paused: true } )
            .add( ()=> $(this.intro.preloader).remove() )
            .add(this.tl_header_hold_init)
            .add(this.tl_each_header_img.tweenFromTo(0,this.tl_each_header_img.totalDuration(), { duration: 2, ease: 'none' } ), "<+=1")
            .add(this.header_hl_img)


            //second stage
            .add(this.tl_header_hold_done)
            .add(this.tl_header_imgs, "<" )
            .add(this.logo_paths, '-=.4')
            .add(this.tl_fixeds, '-=.25')
            .add(this.tl_bg_menu, "-=1.75")
            .add(this.tl_texts, "-=.7")
            .add(this.tl_border_holder)
            .set('.index', { overflowY: 'auto', pointerEvents: 'inherit' }, "-=1" )


            $(this.intro.cookie).length > 0 ? this.tl_master.add(this.tl_cookies) : null
    }


    startIntro() {
        this.tl_master.play(0)
    }



}
export const intro_home = new IntroHome()