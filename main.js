import Process from './process.js'

function FIFO(processes, quantum, overload) {
    /*
    processes = array da estrutura de dados process
    */
    processes.sort((x, y) => {
        return x.arrive - y.arrive;
    });

    var soma = 0;

    for(var i of processes){
        soma += soma + i.arrive;
    }

    var media = soma/processes.length;

}

function SJF(processes, quantum, overload) {
    /*
    processes = array da estrutura de dados process
    */
    processes.sort((x, y) => {
        return x.priority - y.priority;
    });

    var soma = 0;

    for(var i of processes){
        soma += soma + i.arrive;
    }

    var media = soma/processes.length;
}

function RoundRobin(processes, quantum, overload) {
    /*
    processes = array da estrutura de dados process
    */
    
}

function EDF(processes, quantum, overload) {
    /*
    processes = array da estrutura de dados process
    */
    processes.sort((x, y) => {
        return x.deadline - y.deadline;
    });

    var soma = 0;

    for(var i of processes){
        soma += soma + i.arrive;
    }

    var media = soma/processes.length;

}

EDF()