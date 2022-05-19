export default class Process {

    
    constructor(arrive, executionTime, deadline, priority){
        this.arrive = arrive;
        this.executionTime = executionTime;
        this.deadline = deadline;
        this.priority = priority;
    }

    get arrive () {
        return this.arrive;
    }

    get executionTime () {
        return this.executionTime;
    }

    get deadline () {
        return this.deadline;
    }

    get priority () {
        return this.priority;
    }

}