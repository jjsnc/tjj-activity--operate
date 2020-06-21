function rem750() {
    var docEl = document.documentElement;
    var clientWidth = docEl.clientWidth;
    var _num = 100 * (clientWidth / 750);
    docEl.style.fontSize = _num + "px";
    var _fontSize = parseFloat(
        window.getComputedStyle(document.documentElement).fontSize
    );
    if (_fontSize / _num != 1) {
        docEl.style.fontSize = _num / (_fontSize / _num) + "px";
    }
}

function rem() {
    var docEl = document.documentElement;
    var clientWidth = docEl.clientWidth;
    var _num = 50 * (clientWidth / 600);
    docEl.style.fontSize = _num + "px";
    var _fontSize = parseFloat(
        window.getComputedStyle(document.documentElement).fontSize
    );
    if (_fontSize / _num != 1) {
        docEl.style.fontSize = _num / (_fontSize / _num) + "px";
    }
}
export default {
    rem750,
    rem
};
