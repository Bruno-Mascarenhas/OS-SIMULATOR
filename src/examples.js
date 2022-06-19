function loadExample(example) {

    fetch("./src/examples.json")
        .then(response => response.json())
        .then(data => {
            let exemplo = data[example]

            const escalonamento = document.getElementById('algoritimo')
            switch (exemplo.escalonamento) {
                case 'FIFO':
                    escalonamento.selectedIndex = "0"
                    break;
                case 'SJF':
                    escalonamento.selectedIndex = "1"
                    break;
                case 'Round Robin':
                    escalonamento.selectedIndex = "2"
                    break;
                case 'EDF':
                    escalonamento.selectedIndex = "3"
                    break;

                default:
                    break;
            }

            const algoritimoMemoria = document.getElementById('algoritimoMemoria')
            switch (exemplo.memoria) {
                case 'FIFO':
                    algoritimoMemoria.selectedIndex = "0"
                    break;
                case 'LRU':
                    algoritimoMemoria.selectedIndex = "1"
                    break;

                default:
                    break;
            }

            const n_processos = document.getElementById('n-processos')
            n_processos.value = exemplo.numero_procesos
            n_processos.dispatchEvent(new Event("change"));

            const quantum = document.getElementById('quantum')
            quantum.value = exemplo.quantum

            const sobrecarga = document.getElementById('sobrecarga')
            sobrecarga.value = exemplo.sobrecarga

            const chegada = document.getElementsByClassName('chegada')
            const execucao = document.getElementsByClassName('execucao')
            const deadline = document.getElementsByClassName('deadline')
            const prioridade = document.getElementsByClassName('prioridade')
            const n_paginas = document.getElementsByClassName('n_paginas')

            for (let i = 0; i < exemplo.numero_procesos; i++) {
                chegada[i].value = exemplo.processos[i].chegada
                execucao[i].value = exemplo.processos[i].execucao
                deadline[i].value = exemplo.processos[i].deadline
                prioridade[i].value = exemplo.processos[i].prioridade
                n_paginas[i].value = exemplo.processos[i].n_paginas
            }
        })

}

function createExampleForm() {
    fetch("./src/examples.json")
        .then(response => response.json())
        .then(data => {
            const example = document.getElementById('example')
            for (let i = 1; i <= data.length;i++) {
                const option = document.createElement('option')
                option.value = i
                option.innerText = i
                example.appendChild(option)
            }
        })
}

const example = document.getElementById('example')
example.addEventListener('change', (e) => {
    let exemplo = eval(e.target.value)-1
    if (exemplo >=0){
        loadExample(exemplo)
    }
});

createExampleForm()
