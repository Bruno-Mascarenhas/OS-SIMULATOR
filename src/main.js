import Process from './process/process.js';

function FIFO(processes, quantum, overload) {
    //Nesse caso o quantum e o overload não são necessários.
    //Ordena os processos por tempo de chegada
    processes.sort((x, y) => {
        return x.arrive - y.arrive;
    });

    //variáveis para a posição inicial e final de cada processo
    var processTime = [];
    var aux1, aux2;
    //parciais para calcular o turnaround médio
    var partial = [];

    for(var i=0; i<processes.length; i++){
        if(i == 0){
            aux1 = processes[i].arrive;
            aux2 = aux1 + processes[i].executionTime;
            partial.push(processes[i].executionTime); //adiciona o turnaround do primeiro processo no array
            processTime.push([aux1,aux2]) //adiciona as cordenadas do primeiro processo no array
        } else { 
            //variável para armazenar o tempo de chegada do processo
            var aux3 = processes[i].arrive;
            if(aux3 <= aux2) { //quando o proximo processo está em espera
                aux1 = aux2;
                aux2 = aux1 + processes[i].executionTime;
            } else { //quando o processo anterior termina antes do atual chegar
                aux1 = processes[i].arrive;
                aux2 = aux1 + processes[i].executionTime;
            }
            //adicionando coordenadas do processo no array
            processTime.push([aux1,aux2]);
            //adiciona o turnaround do processo no array
            partial.push(processTime[i].executionTime + partial[i-1]);
        }
    }

    //soma todos os valores do array partial
    var sum = partial.reduce(function(sum,i){
        return sum + i;
    });

    //turnaround médio
    var turnaround = sum/processes.length;

    console.log(sum);
    console.log(processTime);
    console.log(turnaround);
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

var a = new Process(1,4,0,0);
var b = new Process(5,2,0,1);
var c = new Process(7,4,0,2);
var d = new Process(12,1,0,3);

var quantum = 0;
var overload = 0;

console.log(a,b,c,d)

FIFO([a,b,c,d]);