module.exports = class BeekeeperList {

    constructor() {
        this.list = [];
    }

    get(id) {
        let beekeeperId = this.list.findIndex(i => i.getId() === id);
        return this.list[beekeeperId];
    }


    hasBeekeeper(beekeeperId){
        return (this.list.findIndex(i => i.getId() === beekeeperId) !== -1);
    }


    push(beekeeper) {
        this.list.push(beekeeper);
    }

    getSize(){
        return this.list.length;
    }

    getList(){
        return this.list;
    }
}
