const consoleTag = function () {

    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        var args = ['\n %c Made with ❤️ by Victor Work %c https://victor.work/ %c %c 💎 \n\n', 'border: 1px solid #000;color: #000; background: #aaa000; padding:5px 0;', 'color: #fff; background: #1c1c1c; padding:5px 0;border: 1px solid #000;', 'background: red; padding:5px 0;', 'color: #b0976d; background: #aaa000; padding:5px 0;'];
        window.console.log.apply(console, args);
    } else if (window.console) {
        window.console.log('Made with love ❤️ Victor Work - https://victor.work/  ❤️');
    }

    let testing = function test() {
        console.log('test');
        
    }
    return testing = 0
}


module.exports = {
    consoleTag
}