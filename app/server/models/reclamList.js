/**
 * Created by thiba on 28/05/2018.
 */

"use strict";

module.exports = class ReclamList {

    constructor() {
        this.list = [];
    }

    get(id) {
        let reclamId = this.list.findIndex(i => i.getId() === id);
        return this.list[reclamId];
    }


    hasBat(idBat){
        return (this.list.findIndex(i => i.getId() === idBat) !== -1);
    }


    push(reclam) {
        this.list.push(reclam);
    }

    getSize(){
        return this.list.length;
    }

    getList(){
        return this.list;
    }
}
