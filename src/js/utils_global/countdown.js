
export class Countdown {
    constructor() {
        return;
    }

    init() {
        let doc = document
        this.body = document.querySelector('body')
        this.qsa = (s, o = doc) => o.querySelectorAll(s),
            this.qs = (s, o = doc) => o.querySelector(s)
    }

    generate() {
        function updateTimer() {
            future = Date.parse("Aug 19, 2021 13:00:00");
            now = new Date();
            diff = future - now;

            days = Math.floor(diff / (1000 * 60 * 60 * 24));
            hours = Math.floor(diff / (1000 * 60 * 60));
            mins = Math.floor(diff / (1000 * 60));
            secs = Math.floor(diff / 1000);

            d = days;
            h = hours - days * 24;
            m = mins - hours * 60;
            s = secs - mins * 60;

            document.getElementById("timer")
                .innerHTML =
                '<div>' + d + '<span>days</span></div>' +
                '<div>' + h + '<span>hours</span></div>' +
                '<div>' + m + '<span>minutes</span></div>' +
                '<div>' + s + '<span>seconds</span></div>';
        }
        setInterval('updateTimer()', 1000);
    }
}