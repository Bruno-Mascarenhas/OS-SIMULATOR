import Process from './process/process.js';
import PriorityQueue from './utils/priorityqueue.js';

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
            if(aux1 != 0){
                for(var j = 0; j < aux1; j++){
                    processTime.push([i+1,"white"]); //adiciona as cordenadas em branco no array
                }
            }
            for(var j = aux1; j < aux2; j++){
                processTime.push([processes[i].id,"green"]); //adiciona as cordenadas do primeiro processo no array
            }      
        } else { 
            if(processes[i].arrive <= aux2) { //quando o proximo processo está em espera
                aux1 = aux2;
                aux2 = aux1 + processes[i].executionTime;
                //adiciona o turnaround do processo no array
                partial.push(processes[i].executionTime + partial[i-1]);
            } else { //quando o processo anterior termina antes do atual chegar
                for(var j = aux2; j < processes[i].arrive; j++){
                    processTime.push([i+1,"white"]); //adiciona as cordenadas em branco no array
                }
                aux1 = processes[i].arrive;
                aux2 = aux1 + processes[i].executionTime;
                //adiciona o turnaround do processo no array
                partial.push(processes[i].executionTime + partial[i-1]);
            }
            for(var j = aux1; j < aux2; j++){
                //adicionando coordenadas do processo no array
                processTime.push([processes[i].id,"green"]);
            }   
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
    console.log(processTime);

    return [processTime,turnaround];
}

//Shortest Job First
function SJF(processes) {
    //Nesse caso o quantum e o overload não são necessários.

    console.log("Processos antes da ordenação");
    console.table(processes); //printa em uma tabela os processos recebidos

    //Ordena os processos por tempo de chegada.
    processes.sort((x, y) => {
        return x.arrive - y.arrive;
    });

    //variáveis para a posição inicial e final de cada processo
    var processTime = [];
    var aux1, aux2;
    //parciais para calcular o turnaround médio
    var partial = [];

    var aux;
    //ordenando o vetor com base na ordem de chegada e o tempo de execução.
    for(var i = 1; i<processes.length-1; i++){
        for(var j = i+1; j < processes.length; j++){
            if(processes[i].arrive == processes[j].arrive || (processes[i].arrive + processes[i].executionTime) >= processes[j].arrive){
                if(processes[i].executionTime > processes[j].executionTime){
                    aux = processes[j];
                    processes[j] = processes[i];
                    processes[i] = aux;
                }
            }
        }
    }

    console.log("Processos depois da ordenação");
    console.table(processes);

    for(var i = 0; i<processes.length; i++){
        if(i == 0){
            aux1 = processes[i].arrive;
            aux2 = aux1 + processes[i].executionTime;
            partial.push(processes[i].executionTime); //adiciona o turnaround do primeiro processo no array
            if(aux1 != 0){
                for(var j = 0; j < aux1; j++){
                    processTime.push([i+1,"white"]); //adiciona as cordenadas do primeiro processo no array
                }
            }
            for(var j = aux1; j < aux2; j++){
                processTime.push([processes[i].id,"green"]); //adiciona as cordenadas do primeiro processo no array
            }      
        } else {
            if(processes[i].arrive <= aux2) { //quando o proximo processo está em espera
                aux1 = aux2;
                aux2 = aux1 + processes[i].executionTime;
                //adiciona o turnaround do processo no array
                partial.push(processes[i].executionTime + partial[i-1]);
            } else { //quando o processo anterior termina antes do atual chegar
                for(var j = aux2; j < processes[i].arrive; j++){
                    processTime.push([i+1,"white"]); //adiciona as cordenadas em branco no array
                }
                aux1 = processes[i].arrive;
                aux2 = aux1 + processes[i].executionTime;
                //adiciona o turnaround do processo no array
                partial.push(processes[i].executionTime + partial[i-1]);
            }
            for(var j = aux1; j < aux2; j++){
                //adicionando coordenadas do processo no array
                processTime.push([processes[i].id,"green"]);
            }
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
    console.log(processTime);

    return [processTime,turnaround];
}

function RoundRobin(processes, quantum, overload) {
    //Roda o processo até o valor do quantum do sistema
    let sys_time = 0;
    let processes_time = new Array(processes.length).fill(0).map((x) => new Array().fill(0))
    let processes_bkp = processes.map((x) => x);
    let times = []

    while(processes.length > 0) {
        let process = processes.shift();

        if(process.arrive > sys_time){
            processes.push(process);
            let find = 0;
            for(let i=0; i<processes.lenght; i++){
                if(processes[i].arrive <= sys_time){
                    find = 1;
                }
            }
            if(find == 0){
                let tmp = 999999999;
                for(let i=0; i<processes.length; i++){
                    tmp = min(tmp, processes[i].arrive);
                }
                for(let i=sys_time; i<tmp; i++){
                    times.push([i, "white"]);
                }
                sys_time = tmp;
            }
        }
        else if(process.executionTime > quantum) {
            process.executionTime -= quantum;
            processes_time[process.id].push([sys_time, sys_time + quantum]);

            for(let i=sys_time; i<sys_time + quantum; i++){
                times.push([process.id, "green"]);
            }

            for(let i=sys_time + quantum; i<sys_time + quantum + overload; i++){
                times.push([process.id, "red"]);
            }

            sys_time += quantum + overload;
            processes.push(process);
        } else {
            processes_time[process.id].push([sys_time, sys_time + process.executionTime]);

            for(let i=sys_time; i<sys_time + process.executionTime; i++){
                times.push([process.id, "green"]);
            }

            sys_time += process.executionTime;
        }
    }

    let turnaround = 0;
    processes_time.forEach((times,i) => {
        //console.log(`times ${i} = `,times)
        //console.log(times[times.length-1][1], processes_bkp[i].arrive), '\n';
        turnaround += times[times.length-1][1] - processes_bkp[i].arrive;
    });

    turnaround = turnaround / processes_bkp.length;
    console.table(processes_time)
    console.log(turnaround);
    console.log(times);
    return [times, turnaround];
}

function EDF(processes, quantum, overload) {
    //Roda os processos de acordo o deadline e vai adicionando o quantum
    let sys_time = 0;
    let processes_time = new Array(processes.length).fill(0).map((x) => new Array().fill(0))
    let processes_bkp = processes.map((x) => x);

    let pq = new PriorityQueue((x, y) => x.deadline > y.deadline)
    processes.forEach((x) => pq.push(x))

    while(processes.length > 0) {
        let process = processes.shift();

        if(process.arrive > sys_time){
            processes.push(process);
            let find = 0;
            for(let i=0; i<processes.lenght; i++){
                if(processes[i].arrive <= sys_time){
                    find = 1;
                }
            }
            if(find == 0){
                let tmp = 999999999;
                for(let i=0; i<processes.length; i++){
                    tmp = min(tmp, processes[i].arrive);
                }
                sys_time = tmp;
            }
        }
        else if(process.executionTime > quantum) {
            process.executionTime -= quantum;
            processes_time[process.id].push([sys_time, sys_time + quantum]);
            sys_time += quantum + overload;
            processes.push(process);
        } else {
            processes_time[process.id].push([sys_time, sys_time + process.executionTime]);
            sys_time += process.executionTime;
        }
    }
}

let a = new Process(0,0,2,20,1);
let b = new Process(1,1,3,20,1);
let c = new Process(2,2,1,20,1);
let d = new Process(3,3,4,20,1);

let x = new Process(0,0,3,10,1);
let y = new Process(1,0,5,10,1);

RoundRobin([y,x],2,1)
//SJF([d,c,b,b,a,a,c]);

export {FIFO,SJF,RoundRobin,EDF}