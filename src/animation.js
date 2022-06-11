import Process from './process/process.js';
import {FIFO,SJF,RoundRobin,EDF} from './main.js'

//drawMemoryTable()

// Cria 1 formulario para cada processo
// ******************************************************************
const n_processos = document.getElementById('n-processos')
n_processos.addEventListener('change', (e) => {
    document.getElementById("processos").innerHTML = "";
    createAllFormProcess(e.target.value)
});

function createAllFormProcess(n_processos) {
    for (let i = 1; i <= n_processos; i++) {
        createFormProcess(i);
    }
}

function createFormProcess(n_processo) {
    let container = document.getElementById("processos");
    let form = document.createElement("process-form");
    form.setAttribute("n-processo", n_processo)
    form.classList.add("m-2", "p-4", "shadow");
    container.appendChild(form)
}
// ******************************************************************


// Pega os dados ao clicar no botao simular
document.getElementById('formInput').addEventListener('submit', (e) => {
    e.preventDefault()
    let data = Array.from(document.querySelectorAll('#formInput input')).reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});
    let algoritimo = document.getElementById('algoritimo')
    let value = algoritimo.options[algoritimo.selectedIndex].value;
    //console.log(value)
    //console.log(data)
    let processos = []
    for (let i = 1; i <= data.n_processos; i++) {
        //processos.push(new Process(+eval('data.chegada'+i),+eval('data.execucao'+i),+eval('data.deadline'+i),+eval('data.prioridade'+i)));
        processos.push(new Process(+i,+eval('data.chegada'+i),+eval('data.execucao'+i),+eval('data.deadline'+i),+eval('data.prioridade'+i)));
    }
    let time = []
    let turnaround = 0
    switch(value) {
        case 'FIFO':
            [time,turnaround] = FIFO(processos)
            break;
        case 'SJF':
            [time,turnaround] = SJF(processos)
            break;
        case 'Round Robin':
            [time,turnaround] = RoundRobin(processos,eval(data.quantum),eval(data.sobrecarga))
            break;
        case 'EDF':
            [time,turnaround] = EDF(processos,eval(data.quantum),eval(data.sobrecarga))
            break;
    }
    document.getElementById("turnAround").textContent = `Turnaround = ${turnaround}`;
    //console.log(processos)
    start(time,data.n_processos);
})





// Animação
function start(time,nProcessos) {
    // Variaveis do sistema
    // ************************************************
    // let nProcessos = 4;
    const animatioDelay = 0.5;

    // let time = [
    //     [1, 'green'],
    //     [1, 'green'],
    //     [1, 'red'],
    //     [2, 'green'],
    //     [2, 'green'],
    //     [3, 'green'],
    //     [3, 'green'],
    //     [3, 'green'],
    //     [3, 'red'],
    //     [4, 'green'],
    // ]
    // ************************************************

    let tempoTotal = time.length;
    let tempoAtual = 0;

    let myInterval = setInterval(animation, animatioDelay * 1000);
    createTable();

    function animation() {
        tempoAtual += 1;

        changeColor(time[tempoAtual - 1][0], tempoAtual, time[tempoAtual - 1][1]);

        if (tempoAtual == tempoTotal) {
            clearInterval(myInterval);
        }
    }

    function createTable() {
        let table = document.getElementById("table");
        table.innerHTML = "";
        for (let i = 1; i <= nProcessos; i++) {
            createRow(i,table);
        }
    }

    function createRow(nProcesso,table) {
        let tableRow = document.createElement("tr");
        let tableHead = document.createElement("th");
        tableHead.innerHTML = nProcesso;
        tableRow.append(tableHead);
        for (let j = 1; j <= tempoTotal; j++) {
            let tableCell = document.createElement("td");
            tableCell.setAttribute("id", nProcesso + "." + j);
            tableRow.appendChild(tableCell);
            table.appendChild(tableRow);
        }
    }

    function changeColor(nProcesso, tempo, cor) {
        document.getElementById(nProcesso + "." + tempo).style.backgroundColor = cor;
        // document.getElementById("1.1").style.borderRightColor = "pink";
    }
}

function drawMemoryTable(){
    let memoryTable = document.getElementById("memoria");
    for (let i = 0; i < 50; i++) {
        let tableCell = document.createElement("td");
        tableCell.setAttribute("id", i);
        memoryTable.appendChild(tableCell);
    }
}



