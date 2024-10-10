function Calcula_Rectcoilair() {
    n1n = parseFloat(Rectcoilair.n1.value);
    x1n = parseFloat(Rectcoilair.x1.value);
    b1n = parseFloat(Rectcoilair.b1.value);
    y1n = parseFloat(Rectcoilair.y1.value);
    c1n = parseFloat(Rectcoilair.c1.value);
    if (isNaN(n1n) || isNaN(x1n) || isNaN(y1n) || isNaN(c1n)) {
        alert("Entre numeros formato XX.XX");
    } else {
        aux = x1n + y1n + 2 * c1n;
        Bob = Math.pow((0.0276 * (aux * n1n)), 2) / (1.908 * aux + 9 * b1n + 10 * c1n);
        document.Rectcoilair.Bobina.value = Bob;
    }
}

function Calcula_OneTurnCoilAir() {
    a1n = parseFloat(OneTurnCoilAir.a1.value);
    d1n = parseFloat(OneTurnCoilAir.d1.value);
    if (isNaN(a1n) || isNaN(d1n)) {
        alert("Entre numeros formato XX.XX");
    } else {
        Bob = 0.01257 * a1n * (2.303 * Math.log10((16 * a1n / d1n) - 2));
        document.OneTurnCoilAir.Bobina.value = Bob;
    }
}
function Calcula_Fiocoilair() {
    w1n = parseFloat(Fiocoilair.w1.value);
    l1n = parseFloat(Fiocoilair.l1.value);
    t1n = parseFloat(Fiocoilair.t1.value);
    if (isNaN(w1n) || isNaN(l1n) || isNaN(t1n)) {
        alert("Entre numeros formato XX.XX");
    } else {
        Bob = 0.002 * l1n * (Math.log10(2 * l1n / (w1n + t1n)) + 0.50049 + (w1n + t1n) / (3 * l1n));
        document.Fiocoilair.Bobina.value = Bob;
    }
}
function Calcula_Oneturnairan() {
    la1n = parseFloat(Oneturnairan.la1.value);
    lb1n = parseFloat(Oneturnairan.lb1.value);
    a1n = parseFloat(Oneturnairan.a1.value);
    if (isNaN(la1n) || isNaN(lb1n) || isNaN(a1n)) {
        alert("Entre numeros formato XX.XX");
    } else {
        a1aux = la1n * lb1n;
        lc8 = Math.sqrt(la1n * la1n + lb1n * lb1n);
        H8aux1 = lb1n * Math.log10(2 * a1aux / (a1n * (lb1n + lc8)));
        H8aux2 = lb1n * Math.log10(2 * a1aux / (a1n * (lb1n + lc8)));
        H8aux3 = 2 * (a1n + lc8 - la1n - lb1n);
        Bob = 4 * (H8aux1 + H8aux2 + H8aux3);
        document.Oneturnairan.Bobina.value = Bob;
    }
}


document.addEventListener("DOMContentLoaded", function() {
    let divc = document.querySelectorAll('div[style]');
    for (let i = 0, len = divc.length; i < len; i++) {
        let actdisplay = window.getComputedStyle(divc[i], null).display;
        let actclear = window.getComputedStyle(divc[i], null).clear;
        if (actdisplay == 'block' && actclear == 'both') {
            divc[i].remove();
        }
    }
});

function Calcula_SingleTurnCoilAir() {
    n1n = parseFloat(SingleTurnCoilAir.n1.value);
    a1n = parseFloat(SingleTurnCoilAir.a1.value);
    l1n = parseFloat(SingleTurnCoilAir.l1.value);
    if (isNaN(n1n) || isNaN(a1n) || isNaN(l1n)) {
        alert("Entre numeros formato XX.XX");
    } else {
        Bob = Math.pow((a1n * n1n), 2) / (22.9 * a1n + 25.4 * l1n);
        document.SingleTurnCoilAir.Bobina.value = Bob;
    }
}

