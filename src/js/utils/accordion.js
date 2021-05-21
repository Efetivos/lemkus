
import { gsap } from 'gsap'
class Accordion {
    constructor() {
        return;
    }

    init(contentPage) {
        this.contentPage = contentPage
        let doc = this.contentPage

        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.accd = {
            hold: this.qsa('.ctn-accord .hold-content'),
            trg: this.qsa('.ctn-accord__item'),
        }
        gsap.set(this.accd.hold, { height: 0, opacity: 0 });

        // silence is golden
        let $trgAccord = $(this.accd.trg),
            time = .6,
            animating = false;

        $trgAccord.click(function () {
            if (!animating) {
                if ($(this).hasClass("active-accd")) {
                    animating = true;
                    $(this).removeClass('active-accd');
                    gsap.to('.hold-content', .3, { opacity: 0 });
                    gsap.to($trgAccord.find('.svg-arrow svg'), time, { rotation: 0, ease: 'power3.inOut' });
                    gsap.to($trgAccord.find('.trg-acc h5'), time, { ease: 'power3.inOut' });
                    gsap.to('.hold-content', time, {
                        height: 0, ease: 'power3.inOut', onComplete: function () {
                            window.dispatchEvent(new Event('resize'));
                            animating = false
                        }
                    });
                }//close if
                else {
                    animating = true;
                    $('.ctn-accord__item').removeClass('active-accd');
                    $(this).addClass('active-accd');
                    gsap.to('.hold-content', .3, { autoAlpha: 0 });
                    gsap.to('.hold-content', time, { height: 0, ease: 'power3.inOut' });
                    gsap.to($trgAccord.find('.svg-arrow svg'), time, { rotation: 0, ease: 'power3.inOut' });
                    gsap.to($trgAccord.find('.trg-acc h5'), time, { ease: 'power3.inOut' });

                    //--------- entrada
                    gsap.from($(this).find('.hold-content'), time, { height: 0, ease: 'power3.inOut' })
                    gsap.set($(this).find('.hold-content'), { height: 'auto' });
                    gsap.to($(this).find('.hold-content'), .2, {
                        delay: time - .15, autoAlpha: 1, onComplete: function () {
                            window.dispatchEvent(new Event('resize'));
                            animating = false
                        }
                    });
                    gsap.to($(this).find('.svg-arrow svg'), time, { rotation: 180, transformOrigin: 'center center', ease: 'power3.inOut' })
                    gsap.to($(this).find('.trg-acc h5'), time, { transformOrigin: 'center center', ease: 'power3.inOut' })

                }//close else
            } //close animating
        }); //close click
    }

}
export const accordion = new Accordion()