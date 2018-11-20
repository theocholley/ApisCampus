module.exports = class SwarmList {

    constructor() {
        this.list = [];
    }

    get(id) {
        let swarmId = this.list.findIndex(i => i.getId() === id);
        return this.list[swarmId];
    }


    hasSwarm(idSwarm){
        return (this.list.findIndex(i => i.getId() === idSwarm) !== -1);
    }


    push(swarm) {
        this.list.push(swarm);
    }

    getSize(){
        return this.list.length;
    }

    getList(){
        return this.list;
    }
}
