const cart = getArray('.cart'),
    box = getArray('.cart__box'),
    round = getArray('.cart__round'),
    descrDefault = getArray('.descr_default'),
    descrSelected = getArray('.descr_selected'),
    descrDisabled = getArray('.descr_disabled'),
    cartSubtitle = getArray('.cart__subtitle_default'),
    cartSubtitleHover = getArray('.cart__subtitle_hover'),
    cartLinks = document.querySelectorAll('.descr__link');


function getArray(elem) {
    return Array.from(document.querySelectorAll(elem));
}

document.querySelectorAll('.descr__link').forEach((elem, i) => {
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        let item = event.target.parentElement.previousElementSibling;
        switchCondition(item, i);
    });
});

cart.forEach((item, i) => {
    item.addEventListener('click', () => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(navigator.userAgent)) {
            switchCondition(item, i);
        } else {
            item.onmouseleave = () => {
                switchCondition(item, i);
            }
        }
    });
});


function switchCondition(item, i) {
    changeDescription(item, i);
    if (item.classList.contains('is-default')) toSelected(i);
    else if (item.classList.contains('is-selected')) toDisabled(i);
    else backToSelected(i);
}

function toSelected(i) {
    selected(i, cart, 'cart_selected');
    selected(i, cart, 'is-selected');
    selected(i, cart, 'cart_selected');
    selected(i, box, 'cart__box_selected');
    selected(i, descrSelected, 'active');
    selected(i, round, 'cart__round_selected');
    unSelected(i, cart, 'is-default');
    unSelected(i, descrDefault, 'active');
}

function toDisabled(i) {
    selected(i, cart, 'cart_disabled');
    selected(i, round, 'cart__round_disabled');
    selected(i, box, 'cart__box_disabled');
    selected(i, cartSubtitle, 'active');
    selected(i, descrDisabled, 'active');
    unSelected(i, cart, 'is-selected');
    unSelected(i, cart, 'cart_selected');
    unSelected(i, cart, 'cart__box_selected');
    unSelected(i, round, 'cart__round_selected');
    unSelected(i, cartSubtitleHover, 'active');
    unSelected(i, descrSelected, 'active');
}

function backToSelected(i) {
    selected(i, cart, 'is-selected');
    selected(i, cart, 'cart_selected');
    selected(i, box, 'cart__box_selected');
    selected(i, round, 'cart__round_selected');
    selected(i, descrSelected, 'active');
    unSelected(i, cart, 'cart_disabled');
    unSelected(i, box, 'cart__box_disabled');
    unSelected(i, round, 'cart__round_disabled');
    unSelected(i, descrDisabled, 'active');
}

function changeDescription(item, i) {
    item.onmouseenter = () => {
        if (item.classList.contains('is-selected')) {
            selected(i, cartSubtitleHover, 'active');
            unSelected(i, cartSubtitle, 'active');
        }
    }
    item.onmouseleave = () => {
        if (item.classList.contains('is-selected')) {
            selected(i, cartSubtitle, 'active');
            unSelected(i, cartSubtitleHover, 'active');
        }
    }
}

function selected(i, arr, elem) {
    arr[i].classList.add(elem);
}

function unSelected(i, arr, elem) {
    arr[i].classList.remove(elem);
}



