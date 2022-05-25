export default class Process {
    constructor(id, arrive, executionTime, deadline, priority){
        this.id = id;
        this.arrive = arrive;
        this.executionTime = executionTime;
        this.deadline = deadline;
        this.priority = priority;
    }
}