"use strict";

module.exports = class Swarm {

    constructor(id, longitude, latitude, date, hour, feature, height, description, county, numberObs, size, insectType) {
        this._id = id;
        this._longitude = longitude;
        this._latitude = latitude;
        this._date = date;
        this._hour = hour;
        this._feature = feature;
        this._height = height;
        this._description = description;
        this._isTreated = false;
        this._county = county;
        this._numberObs = numberObs;
        this._size = size;
        this._insectType = insectType;
    }


    getId() {
        return this._id;
    }

    getLongitude() {
        return this._longitude;
    }

    getLatitude() {
        return this._latitude;
    }

    getDate() {
        return this._date;
    }

    getHour() {
        return this._hour;
    }

    getFeature() {
        return this._feature;
    }

    getHeight() {
        return this._height;
    }

    getDescription() {
        return this._description;
    }


    isTreated() {
        return this._isTreated;
    }


    getCounty() {
        return this._county;
    }


    getNumberObs() {
        return this._numberObs;
    }

    getInsectType() {
        return this._insectType;
    }
    getSize() {
        return this._size;
    }
}