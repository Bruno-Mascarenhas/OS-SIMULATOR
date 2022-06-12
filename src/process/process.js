export default class Process {
    constructor(id, arrive, executionTime, deadline, priority, n_pages){
        this.id = id;
        this.arrive = arrive;
        this.executionTime = executionTime;
        this.deadline = deadline;
        this.priority = priority;
        this.n_pages = n_pages;
    }
}