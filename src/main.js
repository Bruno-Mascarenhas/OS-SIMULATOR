import Process from './process/process.js';
import PriorityQueue from './utils/priorityqueue.js';
import MemoryScheduler from './memory/memoryScheduler.js';

//First In FIrst Out
function FIFO(processes, memory_scheduler) {
    let mem_array = [];
    
    memory_scheduler = memory_scheduler.trim()
    let mem_scheduler = new MemoryScheduler(memory_scheduler, processes.length);
    
    //Ordena os processos por tempo de chegada
    processes.sort((x, y) => {
        return x.arrive - y.arrive;
    });

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
                    mem_array.push(mem_scheduler.blank());
                }
            }
            let tmp = Object.create(processes[i]);
            tmp.id -= 1;
            let x = mem_scheduler.manage(tmp);

            for(var j = aux1; j < aux2; j++){
                processTime.push([processes[i].id,"green"]); //adiciona as cordenadas do primeiro processo no array
                mem_array.push(x);
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
                    mem_array.push(mem_scheduler.blank());
                }
                aux1 = processes[i].arrive;
                aux2 = aux1 + processes[i].executionTime;
                //adiciona o turnaround do processo no array
                partial.push(processes[i].executionTime + partial[i-1]);
            }

            let tmp = Object.create(processes[i]);
            tmp.id -= 1;
            let x = mem_scheduler.manage(tmp);

            for(var j = aux1; j < aux2; j++){
                //adicionando coordenadas do processo no array
                processTime.push([processes[i].id,"green"]);
                mem_array.push(x);
            }   
        }
    }

    //soma todos os valores do array partial
    var sum = partial.reduce(function(sum,i){
        return sum + i;
    });

    //turnaround médio
    var turnaround = sum/processes.length;
    return [processTime,turnaround,mem_array];
}

//Shortest Job First
function SJF(processes, memory_scheduler) {
    let mem_array = [];

    memory_scheduler = memory_scheduler.trim()
    let mem_scheduler = new MemoryScheduler(memory_scheduler, processes.length);

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

    for(var i = 0; i<processes.length; i++){
        if(i == 0){
            aux1 = processes[i].arrive;
            aux2 = aux1 + processes[i].executionTime;
            partial.push(processes[i].executionTime); //adiciona o turnaround do primeiro processo no array
            if(aux1 != 0){
                for(var j = 0; j < aux1; j++){
                    processTime.push([i+1,"white"]); //adiciona as cordenadas do primeiro processo no array
                    mem_array.push(mem_scheduler.blank());
                }
            }

            let tmp = Object.create(processes[i]);
            tmp.id -= 1;
            let x = mem_scheduler.manage(tmp);

            for(var j = aux1; j < aux2; j++){
                processTime.push([processes[i].id,"green"]); //adiciona as cordenadas do primeiro processo no array
                mem_array.push(x);
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
                    mem_array.push(mem_scheduler.blank());
                }
                aux1 = processes[i].arrive;
                aux2 = aux1 + processes[i].executionTime;
                //adiciona o turnaround do processo no array
                partial.push(processes[i].executionTime + partial[i-1]);
            }

            let tmp = Object.create(processes[i]);
            tmp.id -= 1;
            let x = mem_scheduler.manage(tmp);

            for(var j = aux1; j < aux2; j++){
                //adicionando coordenadas do processo no array
                processTime.push([processes[i].id,"green"]);
                mem_array.push(x);
            }
        }
    }

    //soma todos os valores do array partial
    var sum = partial.reduce(function(sum,i){
        return sum + i;
    });

    //turnaround médio
    var turnaround = sum/processes.length;
    return [processTime,turnaround,mem_array];
}

function RoundRobin(processes, quantum, overload, memory_scheduler) {
    //semelhante ao fifo, porém é preemptivo (considera quantum e overload)
    let sys_time = 0;
    let processes_time = new Array(processes.length+1).fill(0).map((x) => new Array().fill(0));
    let processes_bkp = processes.map((x) => x);
    let times = []
    let mem_array = [];

    //inicializa a classe que vai tratar da paginação
    memory_scheduler = memory_scheduler.trim()
    let mem_scheduler = new MemoryScheduler(memory_scheduler, processes.length);

    while(processes.length > 0) {
        let process = processes.shift();

        //caso o primeiro processo da fila esteja com a chegada maior que o tempo do sistema atual
        //vai esperar até que o tempo do sistema seja maior que a chegada do primeiro processo
        if(process.arrive > sys_time){
            processes.push(process);
            let find = 0;
            for(let i=0; i<processes.length; i++){
                if(processes[i].arrive <= sys_time){
                    find = 1;
                }
            }
            if(find == 0){
                let tmp = 999999999;
                for(let i=0; i<processes.length; i++){
                    tmp = Math.min(tmp, processes[i].arrive);
                }
                for(let i=sys_time; i<tmp; i++){
                    times.push([1, "white"]);
                    mem_array.push(mem_scheduler.blank());
                }
                sys_time = tmp;
            }
        }
        //caso o tempo de execução do processo seja maior que o quantum do sistema
        //vai executar o processo até o fim do quantum e adicionar o processo na fila de próximos
        else if(process.executionTime > quantum) {
            process.executionTime -= quantum;
            processes_time[process.id].push([sys_time, sys_time + quantum]);

            let tmp = Object.create(process);
            tmp.id -= 1;
            let x = mem_scheduler.manage(tmp);

            for(let i=sys_time; i<sys_time + quantum; i++){
                times.push([process.id, "green"]);
                mem_array.push(x);
            }

            for(let i=sys_time + quantum; i<sys_time + quantum + overload; i++){
                times.push([process.id, "red"]);
                mem_array.push(x);
            }

            sys_time += quantum + overload;
            processes.push(process);
        } else {
        //caso o tempo de execução do processo seja menor que o quantum do sistema
            //vai executar o processo até o fim do tempo de execução e remover o processo da fila
            processes_time[process.id].push([sys_time, sys_time + process.executionTime]);

            let tmp = Object.create(process);
            tmp.id -= 1;
            let x = mem_scheduler.manage(tmp);

            for(let i=sys_time; i<sys_time + process.executionTime; i++){
                times.push([process.id, "green"]);
                mem_array.push(x);
            }

            sys_time += process.executionTime;
        }
    }

    let turnaround = 0;
    processes_time.forEach((times,i) => {
        if(i != 0)
            turnaround += times[times.length-1][1] - processes_bkp[i-1].arrive;
    });

    turnaround = turnaround / processes_bkp.length;
    return [times, turnaround, mem_array];
}

function EDF(processes, quantum, overload, memory_scheduler) {
//mantém uma fila ordenada pelo deadline (min_heap), porém é preemptivo (considera quantum e overload)
    let sys_time = 0;
    let processes_time = new Array(processes.length+1).fill(0).map((x) => new Array().fill(0));
    let processes_bkp = processes.map((x) => x);
    let times = [];
    let mem_array = [];

    //inicializa a classe que vai tratar da paginação
    memory_scheduler = memory_scheduler.trim()
    let mem_scheduler = new MemoryScheduler(memory_scheduler, processes.length);

    let pq = new PriorityQueue((x, y) => x.deadline < y.deadline);

    while(processes.length > 0 || pq.size() > 0) {
        if(processes.length > 0) {
            let process = processes[0];
            //caso o primeiro processo da fila esteja com a chegada maior que o tempo do sistema atual
            //vai esperar até que o tempo do sistema seja maior que a chegada do primeiro processo
            if(process.arrive > sys_time){
                let find = 0;
                for(let i=0; i<processes.length; i++){
                    if(processes[i].arrive <= sys_time){
                        find = 1;
                    }
                }
                if(find == 0){
                    let tmp = 999999999;
                    for(let i=0; i<processes.length; i++){
                        tmp = Math.min(tmp, processes[i].arrive);
                    }
                    for(let i=sys_time; i<tmp-1; i++){
                        times.push([1, "white"]);
                        mem_array.push(mem_scheduler.blank());
                    }
                    sys_time = tmp;
                }
            }
        }
        //remove os processos que já podem executar da fila de processos
        //e adiciona na min_heap de processos ordenada pelo deadline
        let to_rem = []
        for (let i = 0; i < processes.length; i++) {
            if(processes[i].arrive <= sys_time){
                pq.push(processes[i]);
                to_rem.push(processes[i].id);
            }
        }

        for (let i = 0; i < to_rem.length; i++) {
            processes = processes.filter((x) => x.id != to_rem[i]);
        }

        if(pq.size() > 0){
            let cur = pq.pop();
            //caso haja processos na min_heap são tratados os casos de execução
            //caso o tempo de execução do processo seja maior que o quantum do sistema
            //vai executar o processo até o fim do quantum e adicionar o processo na heap de próximos novamente
            if(cur.executionTime > quantum) {
                cur.executionTime -= quantum;
                processes_time[cur.id].push([sys_time, sys_time + quantum]);

                let tmp = Object.create(cur);
                tmp.id -= 1;
                let x = mem_scheduler.manage(tmp);

                for(let i=sys_time; i<sys_time + quantum; i++){
                    mem_array.push(x);
                    if(cur.deadline + cur.arrive >= i)
                        times.push([cur.id, "green"]);
                    else
                        times.push([cur.id, "gray"]);
                }
    
                for(let i=sys_time + quantum; i<sys_time + quantum + overload; i++){
                    mem_array.push(x);
                    times.push([cur.id, "red"]);
                }
    
                sys_time += quantum + overload;
                pq.push(cur);
            } else {
            //caso o tempo de execução do processo seja menor que o quantum do sistema
            //vai executar o processo até o fim do tempo de execução e remover o processo da min_heap
                let tmp = Object.create(cur);
                tmp.id -= 1;
                let x = mem_scheduler.manage(tmp);

                processes_time[cur.id].push([sys_time, sys_time + cur.executionTime]);
    
                for(let i=sys_time; i<sys_time + cur.executionTime; i++){
                    mem_array.push(x);
                    if(cur.deadline + cur.arrive >= i)
                        times.push([cur.id, "green"]);
                    else
                        times.push([cur.id, "gray"]);
                }
                sys_time += cur.executionTime;
            }
        }
    }

    let turnaround = 0;
    processes_time.forEach((times,i) => {
        if(i != 0)
            turnaround += times[times.length-1][1] - processes_bkp[i-1].arrive;
    });

    turnaround = turnaround / processes_bkp.length;
    return [times, turnaround, mem_array];
}

// let x = new Process(1,0,4,7,1,20);
// let y = new Process(2,2,2,5,1,20);
// let z = new Process(3,4,1,8,1,20);
// let k = new Process(4,6,3,10,1,20);

//SJF([x,y,z,k],'FIFO');
//FIFO([x,y,z,k],'FIFO')
//EDF([x,y,z,k],2,1,'LRU')
//RoundRobin([y,x],2,1,'FIFO')


export {FIFO,SJF,RoundRobin,EDF}