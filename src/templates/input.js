const n_processos = document.getElementById('n-processos')
n_processos.addEventListener('change', (e) => {
    document.getElementById("processos").innerHTML = "";
    createAllFormProcess(e.target.value)
});

document.getElementById('formInput').addEventListener('submit', (e) => {
    e.preventDefault()
    let data = Array.from(document.querySelectorAll('#formInput input')).reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});
    let algoritimo = document.getElementById('algoritimo')
    let value = algoritimo.options[algoritimo.selectedIndex].value;
    console.log(value)
    console.log(data)
    start();
})

function createAllFormProcess(n_processos) {
    for (i = 1; i <= n_processos; i++) {
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

// Animação
function start() {
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
    createTable();

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
        // document.getElementById("1.1").style.borderRightColor = "pink";
    }

    // const teste = document.querySelector('.teste')
    // fetch('test.html')
    // .then(res=>res.text())
    // .then(data=>{
    //     teste.innerHTML = data
    // })
}



