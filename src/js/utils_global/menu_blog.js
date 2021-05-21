
import { gsap } from 'gsap'
class MenuBlog {
    constructor() {
        return;
    }

    init() {
        let doc = document
        this.body = document.querySelector('body')
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.menu_blog =  {
            main: this.qs('.menu-blog'),
            close: this.qs('.trg-close-menublog'),
            trg: this.qs('.header-blog .btn-hover')
        }

        this.onClick()
    }













    //? - =========================  ON CLICK  ========================= -//
    //? - =========================  ON CLICK  ========================= -//
    onClick() {
        let that = this
        //____ open menu
        $(this.menu_blog.trg).click(function(){
            $(that.body).toggleClass('is-menublog')
        });
        $(this.menu_blog.close).click(function(){
            $(that.body).toggleClass('is-menublog')
        });

    }

}
export const menu_blog = new MenuBlog()