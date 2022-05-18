import Process from './process'

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

    var media = soma/processes.

}

function SJF(processes, quantum, overload) {
    /*
    processes = array da estrutura de dados process
    */

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
   x = new Process(1,2,3,4)
   console.log(x)

}