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

    constructor(length: number, value: string) {
        super(length);
        this.value = value;
        this.fillColor = '';
    }
}