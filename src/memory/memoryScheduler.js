export default class MemoryScheduler {
    constructor(kind, n_processes){
        this.kind = kind;
        this.ram = new Array(50).fill(-1);
        this.disk = new Array(n_processes).fill(-1);
        this.queue = []
        this.utilization_map = new Array(n_processes).fill(-1);
        this.sys_time = 0;
        this.n_disk = 0;
    }

    manage(process) {
        if(this.kind == "FIFO"){
            return this.FIFO(process);
        }
        else {
            return this.LRU(process);
        }
    }

    check(process) {
        let ok = 0;
        for(let i = 0; i < 50; i++){
            if(this.ram[i] == process.id) {
                let j = i;
                while(this.ram[j] == process.id && j < 50) j++;
                if(j-i >= process.n_pages){
                    ok = 1;
                    break;
                }
            }
        }
        return ok;
    }

    max_space() {
        let max = -1;
        for(let i = 0; i < 50; i++){
            if(this.ram[i] == -1) {
                let j = i;
                while(this.ram[j] == -1 && j < 50) j++;
                if(j - i > max) max = j - i;
            }
        }
        return max;
    }

    fill(id, n_pages) {
        let idx;
        for(let i = 0; i < 50; i++){
            if(this.ram[i] == -1) {
                let j = i;
                while(this.ram[j] == -1 && j < 50) j++;
                if(j-i >= n_pages){
                    idx = i;
                    break;
                }
            }
        }
        for(let i = idx; i < idx + n_pages; i++){
            this.ram[i] = id;
        }
        return;
    }

    FIFO(process) {
        if(this.check(process)){
            return [this.ram.map((x) => x!=-1 ? x+1 : x), this.disk.map((x) => x)];
        }

        if(this.disk[process.id] == -1){
            this.disk[this.n_disk] = process.id + 1;
            this.n_disk++;
        }
            
        let find = -1;
        for(let i = 0 ; i < 50; i++){
            if(this.ram[i] == -1){
                let j = i;
                while(this.ram[j] == -1 && j < 50) j++;
                if(j - i >= process.n_pages){
                    find = i;
                    break;
                }
            }
        }

        if(find == -1){
            let need = process.n_pages, cap = 0;
            while(need > cap){
                let rem = this.queue.shift();
                for(let i = 0; i < 50; i++){
                    if(this.ram[i] == rem){
                        this.ram[i] = -1;
                    }
                }
                cap = this.max_space();
            }

            this.fill(process.id, process.n_pages);
            this.queue.push(process.id);
        } else {
            this.fill(process.id, process.n_pages);
            this.queue.push(process.id);
        }

        return [this.ram.map((x) => x!=-1 ? x+1 : x), this.disk.map((x) => x)];
    }

    LRU(process) {
        this.sys_time++;

        if(this.check(process)){
            this.utilization_map[process.id] = this.sys_time;
            return [this.ram.map((x) => x!=-1 ? x+1 : x), this.disk.map((x) => x)];
        }

        if(this.disk[process.id] == -1){
            this.disk[this.n_disk] = process.id + 1;
            this.n_disk++;
        }

        let find = -1;
        for(let i = 0 ; i < 50; i++){
            if(this.ram[i] == -1){
                let j = i;
                while(this.ram[j] == -1 && j < 50) j++;
                if(j - i >= process.n_pages){
                    find = i;
                    break;
                }
            }
        }

        if(find == -1){
            let need = process.n_pages, cap = 0;
            while(need > cap){
                let inside = this.ram.filter((x) => x != -1);
                let rem = 9999999, pid = -1;

                for(let i = 0; i < inside.length; i++){
                    if(this.utilization_map[inside[i]] < rem){
                        rem = this.utilization_map[inside[i]];
                        pid = inside[i];
                    }
                }

                for(let i = 0; i < 50; i++){
                    if(this.ram[i] == pid){
                        this.ram[i] = -1;
                    }
                }
                
                this.utilization_map[pid] = -1;

                cap = this.max_space();
            }

            this.fill(process.id, process.n_pages);
            this.utilization_map[process.id] = this.sys_time;
        } else {
            this.fill(process.id, process.n_pages);
            this.utilization_map[process.id] = this.sys_time;
        }

        return [this.ram.map((x) => x!=-1 ? x+1 : x), this.disk.map((x) => x)];
    }
}