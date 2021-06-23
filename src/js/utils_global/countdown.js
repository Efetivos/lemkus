class Countdown {
    constructor() {
        return;
    }

    init() {
        this.countdowns = document.querySelectorAll('.countdown')

        let that = this
        this.countdowns.forEach((el) =>{
            setInterval(function(){ that.eachCounter(el) }, 1000)
        })
    }

    eachCounter(el) {

            let thisCounter = el
            let counterParams = {
                days: $(thisCounter).data('month')  > 10 ? $(thisCounter).data('month') : `${$(thisCounter).data('month')}`
            }

            //let future = Date.parse("Aug 19, 2021 13:00:00");
            let future = Date.parse(`${$(thisCounter).data('month')} ${$(thisCounter).data('day')} , 2021 ${$(thisCounter).data('hour')}`);
            let now = new Date();
            let diff = future - now;
        
            let days = Math.floor(diff / (1000 * 60 * 60 * 24));
            let hours = Math.floor(diff / (1000 * 60 * 60));
            let mins = Math.floor(diff / (1000 * 60));
            let secs = Math.floor(diff / 1000);
        
            let d = days;
            let h = hours - days * 24;
            let m = mins - hours * 60;
            let s = secs - mins * 60;

            let counter = {
                days: el.querySelector('.countdown__days'),
                hours: el.querySelector('.countdown__hours'),
                mins: el.querySelector('.countdown__mins'),
                secs: el.querySelector('.countdown__secs'),
            }

        
            d > 9 ? d = d : d = `0${d}`
            h > 9 ? h = h : h = `0${h}`
            m > 9 ? m = m : m = `0${m}`
            s > 9 ? s = s : s = `0${s}`
            $(counter.days).text(d)
            $(counter.hours).text(h)
            $(counter.mins).text(m)
            $(counter.secs).text(s)

    }
}


export const countdown = new Countdown()