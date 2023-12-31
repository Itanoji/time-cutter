import { makeObservable, observable } from "mobx";

export enum BitAreaValue {
    HIGH = '1',
    LOW = '0',
    Z = 'z',
    UNKNOW = '~'
}

/**
 * Базовый класс области сигнала
 */
export abstract class SignalArea {
    length: number;
    isGap: boolean;

    constructor(length: number) {
        this.length = length;
        this.isGap = false;
    }
}

/**
 * Одиночный сигнал
 */
export class BitArea extends SignalArea {
    value: BitAreaValue;

    constructor(length: number, value: BitAreaValue) {
        super(length);
        this.value = value;
        makeObservable(this, {
            value: observable,
            length: observable,
            isGap: observable
          });
    }
}

/**
 * Шина
 */
export class BusArea extends SignalArea {
    value: string;
    fillColor: string;
    hatching: boolean;
    textColor: string;
    textSize: number;

    constructor(length: number, value: string) {
        super(length);
        this.value = value;
        this.fillColor = '#FFFFFF';
        this.hatching = false;
        this.textColor = '#000000';
        this.textSize = 15;
        makeObservable(this, {
            value: observable,
            fillColor: observable,
            hatching: observable,
            textColor: observable,
            length: observable,
            textSize: observable,
            isGap: observable
          });
    }
}