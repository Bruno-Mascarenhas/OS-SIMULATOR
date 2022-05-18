function createAllProcess(n_processos){
    for (i = 0; i < n_processos; i++) {
        createProcess(i);
        console.log(i);
    }
}

function createProcess(n_processo) {
    let container = document.getElementById("processos");
    let form = document.createElement("p");
    form.classList.add("container","forms","shadow");
    form.innerHTML = "            <p class='h3 title-2'>Processo 2</p>
    <br>
    <div class='mb-3'>
        <label for='name' class='form-label'>Tempo de Chegada</label>
        <input type='number' class='form-control' id='name' placeholder='' required>
    </div>
    <div class='mb-3'>
        <label for='institute' class='form-label'>Tempo de Execução</label>
        <input type='number' class='form-control' id='institute' placeholder='' required>
    </div>
    <div class='mb-3'>
        <label for='institute' class='form-label'>Deadline</label>
        <input type='number' class='form-control' id='institute" placeholder='' required>
    </div>
    <div class="mb-3">
        <label for="institute" class="form-label">Prioridade</label>
        <input type="number" class="form-control" id="institute" placeholder='' required>
    </div>";
    container.appendChild(form);


}

function createTable(nRows) {
    for (i = 0; i < nRows; i++) {
        createRow(i,5);
    }
}

function createRow(headName, nColumns) {
    let table = document.getElementById("new");

    let tableRow = document.createElement("tr");
    let tableHead = document.createElement("th");
    tableHead.innerHTML = headName;
    tableRow.append(tableHead);
    for (j = 0; j < nColumns; j++) {
        let tableCell = document.createElement("td");
        tableRow.appendChild(tableCell);
        table.appendChild(tableRow);
    }
}