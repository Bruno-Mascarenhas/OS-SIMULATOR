const n_processos = document.getElementById('n-processos')
n_processos.addEventListener('change', (e) => {
    document.getElementById("processos").innerHTML="";
    createAllFormProcess(e.target.value)
});

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