

const cart = getArray('.cart'),
    box = getArray('.cart__box'),
    round = getArray('.cart__round'),
    descrDefault = getArray('.descr_default'),
    descrSelected = getArray('.descr_selected'),
    descrDisabled = getArray('.descr_disabled'),
    cartSubtitle = getArray('.cart__subtitle_default'),
    cartSubtitleHover = getArray('.cart__subtitle_hover');

function getArray(elem) {
    return Array.from(document.querySelectorAll(elem));
}

document.querySelectorAll('.descr__link').forEach((elem) => {
    elem.addEventListener('click', (e) => {
        e.preventDefault();
        let attr = event.target.parentElement.getAttribute('data-taste');
        let item = event.target.parentElement.previousElementSibling;
        switchCondition(item, attr);
    });
});

cart.forEach((item) => {
    item.addEventListener('click', () => {
        let attr = item.getAttribute('data-taste');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            switchCondition(item, attr);
        } else {
            item.onmouseleave = () => {
                switchCondition(item, attr);
            }
        }
    });
});

function switchCondition(item, attr) {
    changeDescription(item, attr);
    if (item.classList.contains('is-default')) toSelected(attr);
    else if (item.classList.contains('is-selected')) toDisabled(attr);
    else backToSelected(attr);
}

function toSelected(attr) {
    selected(attr, cart, 'cart_selected');
    selected(attr, cart, 'is-selected');
    selected(attr, cart, 'cart_selected');
    selected(attr, box, 'cart__box_selected');
    selected(attr, descrSelected, 'active');
    selected(attr, round, 'cart__round_selected');
    unSelected(attr, cart, 'is-default');
    unSelected(attr, descrDefault, 'active');
}

function toDisabled(attr) {
    selected(attr, cart, 'cart_disabled');
    selected(attr, round, 'cart__round_disabled');
    selected(attr, box, 'cart__box_disabled');
    selected(attr, cartSubtitle, 'active');
    selected(attr, descrDisabled, 'active');
    unSelected(attr, cart, 'is-selected');
    unSelected(attr, cart, 'cart_selected');
    unSelected(attr, cart, 'cart__box_selected');
    unSelected(attr, round, 'cart__round_selected');
    unSelected(attr, cartSubtitleHover, 'active');
    unSelected(attr, descrSelected, 'active');
}

function backToSelected(attr) {
    selected(attr, cart, 'is-selected');
    selected(attr, cart, 'cart_selected');
    selected(attr, box, 'cart__box_selected');
    selected(attr, round, 'cart__round_selected');
    selected(attr, descrSelected, 'active');
    unSelected(attr, cart, 'cart_disabled');
    unSelected(attr, box, 'cart__box_disabled');
    unSelected(attr, round, 'cart__round_disabled');
    unSelected(attr, descrDisabled, 'active');
}

function changeDescription(item, attr) {
    item.onmouseenter = () => {
        if (item.classList.contains('is-selected')) {
            selected(attr, cartSubtitleHover, 'active');
            unSelected(attr, cartSubtitle, 'active');
        }
    }
    item.onmouseleave = () => {
        if (item.classList.contains('is-selected')) {
            selected(attr, cartSubtitle, 'active');
            unSelected(attr, cartSubtitleHover, 'active');
        }
    }
}

function selected(attr, arr, elem) {
    for (let i in arr) {
        if (attr == arr[i].getAttribute('data-taste')) {
            arr[i].classList.add(elem);
        }
    }
}

function unSelected(attr, arr, elem) {
    for (let i in arr) {
        if (attr == arr[i].getAttribute('data-taste')) {
            arr[i].classList.remove(elem);
        }
    }
}



