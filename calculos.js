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
