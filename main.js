import Process from './process.js'

let processo1 {
    (1,2),(3,7),(8,9)
}

let processo2 {
    (1,2),(3,7),(8,9)
}

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

    var temposProcess1 = []
    temposProcess1.append([x1,x2])

    console.log(temposProcess1)
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

var a = new Process()
var b = new Process()
var c = new Process()
var d = new Process()

quantum = 
overload = 

FIFO([a,b,c,d], quantum, overload)
EDF()