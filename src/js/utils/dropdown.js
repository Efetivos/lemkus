
import { gsap } from 'gsap'
class Dropdown {
    constructor() {
        return;
    }

    init() {
        this.contentPage = document
        let doc = this.contentPage

        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)

        this.body = this.qs('body')
        this.dd = {
            trg: this.qsa('.trg-dd'),
            els: this.qsa('.menu-dd'),
            els_links: this.qsa('.menu-dd__links'),
            els_featured: this.qsa('.menu-dd__featured'),
            fader: this.qs('.menu-dd__fader'),
        }

        this.animating = false
        if ($(window).width() > 1024) {
            //this.onHover()
            this.setters()
            this.onClick()
        }
    }















    //? - =========================  SETTERS  ========================= -//
    //? - =========================  SETTERS  ========================= -//
    setters() {
        gsap.set(this.dd.els, { webkitClipPath: `inset(0% 0% 100% 0%)`, clipPath: `inset(0% 0% 100% 0%)` })
        gsap.set([this.dd.els_links, this.dd.els_featured], { opacity: 0, yPercent: 30 })
        gsap.set(this.dd.fader, { autoAlpha: 0 })
    }










    //? - =========================  ACTIVE  ========================= -//
    //? - =========================  ACTIVE  ========================= -//
    activeDD(el, trg) {
        let clip = { y: 100 },
            $links = el.find('.menu-dd__links'),
            $featured = el.find('.menu-dd__featured')

        trg.addClass('trg-dd-active')
        el.addClass('dd-active')
        $(this.body).addClass('is-dropd')
        gsap.set(el, { opacity: 1 })
        gsap.to(clip, {
            duration: 1, y: 0, ease: 'expo.inOut', overwrite: 'true', onUpdate: () => {
                gsap.set(el, { webkitClipPath: `inset(0% 0% ${clip.y}% 0%)`, clipPath: `inset(0% 0% ${clip.y}% 0%)` })
            }
        })
        gsap.fromTo([$links, $featured], { yPercent: 50 }, { delay: .3, duration: 1, yPercent: 0, opacity: 1, ease: 'expo.out', stagger: .16, overwrite: 'true' })

        gsap.delayedCall(1, () => this.animating = false)
    }













    //? - ========================= DESACTIVE  ========================= -//
    //? - ========================= DESACTIVE  ========================= -//
    desactiveDD(el, trg) {
        let clip = { y: 0 },
            $links = el.find('.menu-dd__links'),
            $featured = el.find('.menu-dd__featured')

        el.removeClass('dd-active')

        trg.removeClass('trg-dd-active')

        gsap.to(el, { duration: .8, opacity: .75, ease: 'none', overwrite: 'true' })
        gsap.to(clip, {
            duration: .8, y: 100, ease: 'expo.inOut', overwrite: 'true', onUpdate: () => {
                gsap.set(el, { webkitClipPath: `inset(0% 0% ${clip.y}% 0%)`, clipPath: `inset(0% 0% ${clip.y}% 0%)` })
            }
        })
        gsap.to([$links, $featured], { duration: .8, yPercent: 20, ease: 'expo.inOut', overwrite: 'true' })


    }




    //? - =========================  CLICK  ========================= -//
    //? - =========================  CLICK  ========================= -//
    onClick() {
        this.dd_active = null

        let that = this

        $(this.dd.trg).click(function () {
            if (!that.animating) {
                that.animating = true

                let thisIndex = $(that.dd.trg).index(this)

                if ($(this).hasClass('trg-dd-active')) {
                    that.desactiveDD($(that.dd.els).eq(thisIndex), $(this))
                    $(that.body).removeClass('is-dropd')
                    gsap.to(that.dd.fader, { delay: .5, duration: .6, autoAlpha: 0, ease: 'none', overwrite: true })
                    gsap.delayedCall(1, () => that.animating = false)
                }


                else if ($(that.body).hasClass('is-dropd')) {
                    that.desactiveDD($('.dd-active'), $('.trg-dd-active'))
                    gsap.delayedCall(.1, () => that.activeDD($(that.dd.els).eq(thisIndex), $(this)))
                }

                else {
                    that.activeDD($(that.dd.els).eq(thisIndex), $(this))
                    gsap.to(that.dd.fader, { duration: .6, autoAlpha: 1, ease: 'none', overwrite: true })
                }
            } //close if animating

        })// close click


        $(this.dd.fader).click(function () {
            $('.trg-dd-active').trigger('click')
        });

        $(document).on('keydown', function (event) {
            if (event.key == "Escape") {
                $('.trg-dd-active').trigger('click')
            }
        });

    }











    //? - =========================  onhover  ========================= -//
    //? - =========================  onhover  ========================= -//
    onHover() {
        this.trg_active = null
        this.dd_active = null
        let that = this

        //trg hover
        $(this.dd.trg).hover(
            function () {
                let thisIndex = $(that.dd.trg).index(this)
                that.trg_active = $(this).data('trgdd')
                $(that.dd.els).eq(thisIndex).addClass('dd-active')
                $(that.body).addClass('is-dropd')
            }, function () {
                let thisIndex = $(that.dd.trg).index(this)


                setTimeout(function () {
                    if (!$(that.body).hasClass('' + that.trg_active)) {
                        //console.log("that.trg_active: " + that.trg_active);
                        //console.log("that.dd_active: " + that.dd_active);
                        $(that.dd.els).eq(thisIndex).removeClass('dd-active')
                        $(that.body).removeClass('is-dropd')
                    } else {
                        $(that.body).addClass('is-dropd')
                    }
                }, 100);
            })



        //dd hover
        $(this.dd.els).hover(
            function () {
                $(that.body).addClass($(this).data('dd'))
            }, function () {
                let thisIndex = $(that.dd.els).index(this)
                $(that.body).removeClass($(this).data('dd'))
                $(that.dd.trg).eq(thisIndex).trigger('mouseleave')
            })

    }

}
export const dropdown = new Dropdown()