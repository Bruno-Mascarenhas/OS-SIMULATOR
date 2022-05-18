export default class Process {
    constructor(arrive, executionTime, deadline, priority){
        this.arrive = arrive,
        this.executionTime = executionTime,
        this.deadline = deadline,
        this.priority = priority
    }
}