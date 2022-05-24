import Process from './process/process.js';

//First In FIrst Out
function FIFO(processes) {
    //Nesse caso o quantum e o overload não são necessários.
    //Ordena os processos por tempo de chegada

    console.log("Processos antes da ordenação");
    console.table(processes); //printa em uma tabela os processos recebidos

    processes.sort((x, y) => {
        return x.arrive - y.arrive;
    });

    console.log("Processos depois da ordenação");
    console.table(processes);

    //variáveis para a posição inicial e final de cada processo
    var processTime = [];
    var aux1, aux2;
    //parciais para calcular o turnaround médio
    var partial = [];

    for(var i = 0; i<processes.length; i++){
        if(i == 0){
            aux1 = processes[i].arrive;
            aux2 = aux1 + processes[i].executionTime;
            partial.push(processes[i].executionTime); //adiciona o turnaround do primeiro processo no array
            processTime.push([aux1,aux2]) //adiciona as cordenadas do primeiro processo no array
        } else { 
            if(processes[i].arrive <= aux2) { //quando o proximo processo está em espera
                aux1 = aux2;
                aux2 = aux1 + processes[i].executionTime;
                //adiciona o turnaround do processo no array
                partial.push(processes[i].executionTime + partial[i-1]);
            } else { //quando o processo anterior termina antes do atual chegar
                aux1 = processes[i].arrive;
                aux2 = aux1 + processes[i].executionTime;
                //adiciona o turnaround do processo no array
                partial.push(processes[i].executionTime + partial[i-1]);
            }
            //adicionando coordenadas do processo no array
            processTime.push([aux1,aux2]);
        }
    }

    //soma todos os valores do array partial
    var sum = partial.reduce(function(sum,i){
        return sum + i;
    });

    //turnaround médio
    var turnaround = sum/processes.length;

    console.log("Partial: ",partial);
    console.log("Sum: ",sum);
    console.log("Process Time: ",processTime);
    console.log("Trunaround: ",turnaround);
}

//Shortest Job First
function SJF(processes) {
    //Nesse caso o quantum e o overload não são necessários.

    console.log("Processos antes da ordenação");
    console.table(processes); //printa em uma tabela os processos recebidos

    //Ordena os processos por tempo de execução.
    processes.sort((x, y) => {
        return x.executionTime - y.executionTime;
    });

    console.log("Processos depois da ordenação");
    console.table(processes);

    //variáveis para a posição inicial e final de cada processo
    var processTime = [];
    var aux1, aux2;
    //parciais para calcular o turnaround médio
    var partial = [];

    for(var i = 0; i<processes.length; i++){
        if(i == 0){
            aux1 = processes[i].arrive;
            aux2 = aux1 + processes[i].executionTime;
            partial.push(processes[i].executionTime); //adiciona o turnaround do primeiro processo no array
            processTime.push([aux1,aux2]) //adiciona as cordenadas do primeiro processo no array
        } else { 
            if(processes[i].arrive <= aux2) { //quando o proximo processo está em espera
                aux1 = aux2;
                aux2 = aux1 + processes[i].executionTime;
                //adiciona o turnaround do processo no array
                partial.push(processes[i].executionTime + partial[i-1]);
            } else { //quando o processo anterior termina antes do atual chegar
                aux1 = processes[i].arrive;
                aux2 = aux1 + processes[i].executionTime;
                //adiciona o turnaround do processo no array
                partial.push(processes[i].executionTime + partial[i-1]);
            }
            //adicionando coordenadas do processo no array
            processTime.push([aux1,aux2]);
        }
    }

    //soma todos os valores do array partial
    var sum = partial.reduce(function(sum,i){
        return sum + i;
    });

    //turnaround médio
    var turnaround = sum/processes.length;

    console.log("Partial: ",partial);
    console.log("Sum: ",sum);
    console.log("Process Time: ",processTime);
    console.log("Trunaround: ",turnaround);
}

function RoundRobin(processes, quantum, overload) {
    /*
    processes = array da estrutura de dados process
    */
    
}

function EDF(processes, quantum, overload) {
    //Nesse caso o quantum e o overload são necessários.

    console.log("Processos antes da ordenação");
    console.table(processes); //printa em uma tabela os processos recebidos

    //Ordena os processos por deadline.
    processes.sort((x, y) => {
        return x.deadline - y.deadline;
    });

    console.log("Processos depois da ordenação");
    console.table(processes);

    //variáveis para a posição inicial e final de cada processo
    //processTime vai precisar serr uma amtriz pois os processos são executados mais de uma vez
    var processTime = [];
    var aux1, aux2;
    //parciais para calcular o turnaround médio
    var partial = [];
    //variável com as deadlines de cada processo, já em ordem por deadline. Preciso no gráfico.
    var deadlines = [];

    for(var i = 0; i<processes.length; i++){ // preenche o vetor de deadlines
        deadlines[i] = processes[i].deadline;
    }

    if(overload == 0) { //Quando não há sobrecarga, o quantum nem importa
        for(var i = 0; i<processes.length; i++){
            if(i == 0){
                aux1 = processes[i].arrive;
                aux2 = aux1 + processes[i].executionTime;
                partial.push(processes[i].executionTime); //adiciona o turnaround do primeiro processo no array
                processTime.push([aux1,aux2]) //adiciona as cordenadas do primeiro processo no array
            } else { 
                if(processes[i].arrive <= aux2) { //quando o proximo processo está em espera
                    aux1 = aux2;
                    aux2 = aux1 + processes[i].executionTime;
                    //adiciona o turnaround do processo no array
                    partial.push(processes[i].executionTime + partial[i-1]);
                } else { //quando o processo anterior termina antes do atual chegar
                    aux1 = processes[i].arrive;
                    aux2 = aux1 + processes[i].executionTime;
                    //adiciona o turnaround do processo no array
                    partial.push(processes[i].executionTime + partial[i-1]);
                }
                //adicionando coordenadas do processo no array
                processTime.push([aux1,aux2]);
            }
        }
    } else {
        //?
    }

    //soma todos os valores do array partial
    var sum = partial.reduce(function(sum,i){
        return sum + i;
    });

    //turnaround médio
    var turnaround = sum/processes.length;

    console.log("Partial: ",partial);
    console.log("Sum: ",sum);
    console.log("Process Time: ",processTime);
    console.log("Trunaround: ",turnaround);
    console.log("Deadlines: ",deadlines);

}

var a = new Process(1,10,0,0);
var b = new Process(5,6,0,1);
var c = new Process(7,2,0,2);
var d = new Process(12,4,0,3);
var e = new Process(13,8,0,4);
var f = new Process(1,4,7,0);
var g = new Process(5,2,5,1);
var h = new Process(7,1,8,2);
var i = new Process(12,3,10,3);

var quantum = 0;
var overload = 0;

//FIFO([a,b,c,d,e]);
//SJF([a,b,c,d,e]);
//EDF([f,g,h,i],quantum,overload);

export {FIFO,SJF,RoundRobin,EDF}