"use strict";

module.exports = class Reclamation {

    constructor(id, group, building, flat,content) {
        this.id = id;
        this.group = group;
        this.building = building;
        this.flat = flat;
        this.content = content;
    }

    getGroup(){
        return this.group;
    }

    getBuilding(){
        return this.building;
    }

    getFlat(){
        return this.flat;
    }

    getContent(){
        return this.content;
    }

    getId(){
        return this.id;
    }
}