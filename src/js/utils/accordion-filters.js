
import { gsap } from 'gsap'
class AccordionFilters {
    constructor() {
        return;
    }

    init(contentPage) {
        this.contentPage = document
        let doc = this.contentPage

        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)
        this.accd = {
            hold: this.qsa('.filter-prod__each .filter-prod__items'),
            trg: this.qsa('.filter-prod__each__cat'),
        }
        gsap.set(this.accd.hold, { height: 0, autoAlpha: 0 });

        // silence is golden
        let time = .6,
            animating = false;

        let that = this
        $(this.accd.trg).click(function () {
            if (!animating) {
                if ($(this).closest('.filter-prod__each').hasClass("cat-filter-active")) {
                    animating = true;
                    $(this).closest('.filter-prod__each').removeClass('cat-filter-active');
                    gsap.to(that.accd.hold, .3, { autoAlpha: 0 });
                    gsap.to(that.accd.hold, time, { height: 0, ease: 'power3.inOut', onComplete: ()=> animating = false   });
                }


                else {
                    animating = true;
                    $(that.accd.trg).closest('.filter-prod__each').removeClass('cat-filter-active');
                    $(this).closest('.filter-prod__each').addClass('cat-filter-active');
                    gsap.to(that.accd.hold, .3, { autoAlpha: 0 });
                    gsap.to(that.accd.hold, time, { height: 0, ease: 'power3.inOut' })

                    //--------- entrada
                    gsap.from($(this).closest('.filter-prod__each').find('.filter-prod__items'), time, { height: 0, ease: 'power3.inOut' })
                    gsap.set($(this).closest('.filter-prod__each').find('.filter-prod__items'), { height: 'auto' });
                    gsap.to($(this).closest('.filter-prod__each').find('.filter-prod__items'), .2, { delay: time - .15, autoAlpha: 1, onComplete: ()=> animating = false   });

                }//close else
            } //close animating
        }); //close click
    }

}
export const accordion_filters = new AccordionFilters()