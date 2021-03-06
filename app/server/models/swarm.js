"use strict";

module.exports = class Swarm {

    constructor(id, latitude, longitude, date, hour, feature, height, description, county, numberObs, size, insectType, pic, isTreated, idDevice) {
        this._id = id;
        this._longitude = longitude;
        this._latitude = latitude;
        this._date = date;
        this._hour = hour;
        this._feature = feature;
        this._height = height;
        this._description = description;
        this._isTreated = isTreated;
        this._county = county;
        this._numberObs = numberObs;
        this._size = size;
        this._insectType = insectType;
        this._pic = pic;
        this._isAvailable = true;
        this._idDevice = idDevice;
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


    getPic() {
        return this._pic;
    }


    getIsAvailable() {
        return this._isAvailable;
    }


    getIdDevice() {
        return this._idDevice;
    }
}