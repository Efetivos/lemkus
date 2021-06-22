
import { gsap } from 'gsap'
class GlobalApp {
    constructor() {
        return;
    }

    init() {
        this.contentPage = document
        let doc = document
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.ariaPage()

        //? ---- hover scale
        this.each_hover = $('.hover-img-js') || null
        this.each_hover.length > 0 ? this.hoverScale() : null
        
        //? ---- forgot button
        this.fgt_btn = $('button.create-forg__forgot') || null
        this.fgt_btn.length > 0 ? this.showForgot() : null
    }


    
    
    
    
    
    
    
    //? - =========================  SHOW FORGOT  ========================= -//
    //? - =========================  SHOW FORGOT  ========================= -//
    showForgot() {
        $(this.fgt_btn).click(function(){
            $('.forgot-form').toggleClass('show-form')
        });
    }
    
    
    
    
    
    
    //? - =========================  HOVER SCALE  ========================= -//
    //? - =========================  HOVER SCALE  ========================= -//
    hoverScale() {
        $(this.each_hover).hover(
            function(){
                $(this).closest('.js-find-hover').find('.hover-img img').css('transform','scale(1.1)')
            }, function(){
                $(this).closest('.js-find-hover').find('.hover-img img').css('transform','scale(1)')
        });
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