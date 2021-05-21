
import { gsap } from 'gsap'
class AccordionMenu {
    constructor() {
        return;
    }

    init(contentPage) {
        this.contentPage = contentPage
        let doc = this.contentPage

        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)
        this.accd = {
            hold: this.qsa('.menu-fs__menu .menu-fs__drop'),
            trg: this.qsa('.menu-fs__title'),
        }
        gsap.set(this.accd.hold, { height: 0, autoAlpha: 0 });

        // silence is golden
        let time = .6,
            animating = false;

        let that = this
        $(this.accd.trg).click(function () {
            if (!animating) {
                if ($(this).hasClass("active-item")) {
                    animating = true;
                    $(this).removeClass('active-item');
                    gsap.to(that.accd.hold, .3, { autoAlpha: 0 });
                    gsap.to(that.accd.hold, time, { height: 0, ease: 'power3.inOut', onComplete: ()=> animating = false   });
                }


                else {
                    animating = true;
                    $(that.accd.trg).removeClass('active-item');
                    $(this).addClass('active-item');
                    gsap.to(that.accd.hold, .3, { autoAlpha: 0 });
                    gsap.to(that.accd.hold, time, { height: 0, ease: 'power3.inOut' })

                    //--------- entrada
                    gsap.from($(this).closest('.menu-fs__menu').find('.menu-fs__drop'), time, { height: 0, ease: 'power3.inOut' })
                    gsap.set($(this).closest('.menu-fs__menu').find('.menu-fs__drop'), { height: 'auto' });
                    gsap.to($(this).closest('.menu-fs__menu').find('.menu-fs__drop'), .2, { delay: time - .15, autoAlpha: 1, onComplete: function () {
                            animating = false
                        }
                    });

                }//close else
            } //close animating
        }); //close click
    }

}
export const accordion_menu = new AccordionMenu()