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

    constructor(length: number) {
        this.length = length;
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

    constructor(length: number, value: string) {
        super(length);
        this.value = value;
        this.fillColor = '#FFFFFF';
        this.hatching = false;
        this.textColor = '#000000';
        makeObservable(this, {
            value: observable,
            fillColor: observable,
            hatching: observable,
            textColor: observable,
            length: observable
          });
    }
}