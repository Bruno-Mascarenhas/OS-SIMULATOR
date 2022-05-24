class ProcessForm extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <p class="h3 mb-3"><h1>${this.getAttribute('n-processo')}</h1></p>
        <div class="form-floating mb-3">
            <input type="number" name=${"chegada" + this.getAttribute('n-processo')} class="form-control" id="floatingInput">
            <label for="floatingInput">Tempo de Chegada</label>
        </div>
        <div class="form-floating mb-3">
            <input type="number" name=${"execucao" + this.getAttribute('n-processo')} class="form-control" id="floatingInput">
            <label for="floatingInput">Tempo de Execução</label>
        </div>
        <div class="form-floating mb-3">
            <input type="number" name=${"deadline" + this.getAttribute('n-processo')} class="form-control" id="floatingPassword">
            <label for="floatingPassword">Deadline</label>
        </div>
        <div class="form-floating mb-3">
            <input type="number" name=${"prioridade" + this.getAttribute('n-processo')} class="form-control" id="floatingPassword">
            <label for="floatingPassword">Prioridade</label>
        </div>`;
    }
}

window.customElements.define("process-form", ProcessForm);