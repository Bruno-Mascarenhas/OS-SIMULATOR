// Variaveis do sistema

let nProcessos = 4;
const animatioDelay = 0.5;

let time = [
    [1, 'green'],
    [1, 'green'],
    [1, 'red'],
    [2, 'green'],
    [2, 'green'],
    [3, 'green'],
    [3, 'green'],
    [3, 'green'],
    [3, 'red'],
    [4, 'green'],
]

// ************************************************

let tempoTotal = time.length;
let tempoAtual = 0;

let myInterval = setInterval(animation, animatioDelay * 1000);

function animation() {
    tempoAtual += 1;

    changeColor(time[tempoAtual - 1][0], tempoAtual, time[tempoAtual - 1][1]);

    if (tempoAtual == tempoTotal) {
        clearInterval(myInterval);
    }
}

function createTable() {
    for (i = 1; i <= nProcessos; i++) {
        createRow(i);
    }
}

function createRow(nProcesso) {
    let table = document.getElementById("table");
    let tableRow = document.createElement("tr");
    let tableHead = document.createElement("th");
    tableHead.innerHTML = nProcesso;
    tableRow.append(tableHead);
    for (j = 1; j <= tempoTotal; j++) {
        let tableCell = document.createElement("td");
        tableCell.setAttribute("id", nProcesso + "." + j);
        tableRow.appendChild(tableCell);
        table.appendChild(tableRow);
    }
}

function changeColor(nProcesso, tempo, cor) {
    document.getElementById(nProcesso + "." + tempo).style.backgroundColor = cor;
}

