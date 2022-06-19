import Process from './process/process.js';
import { FIFO, SJF, RoundRobin, EDF } from './main.js'

drawMemoryTable()
drawDiskTable()

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
    let memoria = document.getElementById('algoritimoMemoria')
    let escalonamento = algoritimo.options[algoritimo.selectedIndex].value;
    let algoritimoMemoria = memoria.options[memoria.selectedIndex].value;

    let processos = []
    for (let i = 1; i <= data.n_processos; i++) {
        processos.push(new Process(+i, +eval('data.chegada' + i), +eval('data.execucao' + i), +eval('data.deadline' + i), +eval('data.prioridade' + i), +eval('data.n_paginas' + i)));
    }
    let time = []
    let turnaround = 0
    let memory = []
    switch (escalonamento) {
        case 'FIFO':
            [time, turnaround, memory] = FIFO(processos, algoritimoMemoria)
            break;
        case 'SJF':
            [time, turnaround, memory] = SJF(processos, algoritimoMemoria)
            break;
        case 'Round Robin':
            [time, turnaround, memory] = RoundRobin(processos, eval(data.quantum), eval(data.sobrecarga), algoritimoMemoria)
            break;
        case 'EDF':
            [time, turnaround, memory] = EDF(processos, eval(data.quantum), eval(data.sobrecarga), algoritimoMemoria)
            break;
    }


    document.getElementById("turnAround").textContent = `Turnaround = ${turnaround}`;
    start(time, data.n_processos, processos, memory, data.velocidade);
})





// Animação
function start(time, nProcessos, processos, memory, velocidade) {

    const botao = document.getElementById('botao')
    botao.disabled = true

    const velocidadeRange = document.getElementById('velocidade')
    velocidadeRange.disabled = true


    // Variaveis do sistema
    // ************************************************
    const animatioDelay = 2.5/eval(velocidade);

    let tempoTotal = time.length;
    let tempoAtual = 0;

    let myInterval = setInterval(animation, animatioDelay * 1000);
    createTable();
    setDeadlines()

    function animation() {
        tempoAtual += 1;

        changeColor(time[tempoAtual - 1][0], tempoAtual, time[tempoAtual - 1][1]);
        handleMemoria(memory[tempoAtual - 1])

        if (tempoAtual == tempoTotal) {
            clearInterval(myInterval);
            botao.disabled = false
            velocidadeRange.disabled = false
        }
    }

    function createTable() {
        let table = document.getElementById("table");
        table.innerHTML = "";
        for (let i = 1; i <= nProcessos; i++) {
            createRow(i, table);
        }
    }

    function createRow(nProcesso, table) {
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
    }

    function handleMemoria(memoriaDisco) {
        let [memoria, disco] = memoriaDisco
        for (let i = 0; i < 50; i++) {
            if (memoria[i] == -1) {
                document.getElementById(i).innerText = ""
            }
            else {
                document.getElementById(i).innerText = memoria[i]
            }
        }

        for (let i = 0; i < disco.length; i++) {
            if (disco[i] == -1) {
                document.getElementById(`d${i + 1}`).innerText = ""
            }
            else {
                document.getElementById(`d${i + 1}`).innerText = disco[i]
            }
        }
    }

    function setDeadlines() {
        processos.forEach((processo, i) => {
            if (processo.deadline != 0) {
                document.getElementById((i + 1) + "." + processo.deadline).style.borderRight = "4px solid orange";
            }
        })
    }
}

function drawMemoryTable() {
    let memoryTable = document.getElementById("memoria");
    for (let i = 0; i < 10; i++) {
        let tableRow = document.createElement("tr");

        for (let j = 0; j < 5; j++) {
            let tableCell = document.createElement("td");
            tableCell.setAttribute("id", j * 10 + i);
            tableRow.appendChild(tableCell);
        }
        memoryTable.appendChild(tableRow);
    }
}

function drawDiskTable() {
    let diskTable = document.getElementById("disco");
    for (let i = 0; i < 7; i++) {
        let tableRow = document.createElement("tr");

        for (let j = 0; j < 3; j++) {
            let tableCell = document.createElement("td");
            tableCell.setAttribute("id", `d${i * 3 + j + 1}`);
            tableRow.appendChild(tableCell);
        }
        diskTable.appendChild(tableRow);
    }
}