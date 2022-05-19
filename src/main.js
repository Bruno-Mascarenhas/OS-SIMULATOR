import Process from './process/process.js';

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

}

var a = new Process(0, 1, 2, 3);
var b = new Process(1, 2, 3, 4);
var c = new Process(2, 3, 4, 5);
var d = new Process(3, 4, 5, 6);

var quantum = 10
var overload = 10

FIFO([a,b,c,d], quantum, overload)
EDF()