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

    return processTime;
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

    return processTime;
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

export {FIFO,SJF,RoundRobin,EDF}