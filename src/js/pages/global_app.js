
import { gsap } from 'gsap'
class GlobalApp {
    constructor() {
        return;
    }

    init(contentPage) {
        this.contentPage = contentPage
        let doc = this.contentPage
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.ariaPage()
    }


    
    
    
    
    
    
    
    
    
    
    //? - =========================  VERIFY ARIA PAGE  ========================= -//
    //? - =========================  VERIFY ARIA PAGE  ========================= -//
    ariaPage() {
        this.body = document.querySelector('body')
        this.is_aria = $(this.body).data('ariapage')
        this.is_aria === 'page.launches' ? $('.link-launches').addClass('aria-page') : null
        this.is_aria === 'blog' ? $('.link-culture').addClass('aria-page') : null
        this.is_aria === 'search' ? $('.link-search').addClass('aria-page') : null
        this.is_aria === 'customers/login' ? $('.link-account').addClass('aria-page') : null
        console.log(this.is_aria);
        if(this.is_aria === 'collection') {
            let is_colle = $(this.body).data('colle')
            console.log(is_colle);
            $(`.link-${is_colle}`).addClass('aria-page')
            console.log(`.link-${is_colle}`);
        } 
    }
}
export const global_app = new GlobalApp ()