import { BitArea, BusArea, SignalArea } from "./Areas";

export enum SignalType {
    CLK = "clk",
    BUS = "bus",
    BIT = "bit",
}

/**
 * Базовый класс для сигналов
 */
export abstract class Signal {
    name: string;
    type: SignalType;
    areas!: SignalArea[];

    constructor(name: string, type: SignalType) {
        this.name = name;
        this.type = type;
    }

    abstract addArea(area: SignalArea):void;

    abstract setArea(areaNum: number, area: SignalArea):void;

    remove(index: number) {
        this.areas.splice(index,1);
    }

    swap(index1: number, index2: number) {
        const temp = this.areas[index1];
        this.areas[index1] = this.areas[index2];
        this.areas[index2] = temp;
    }

    insert(index:number, area: SignalArea) {
        this.areas.splice(index, 0, area);
    }
    
}

/**
 * Битовый сигнал
 */
export class BitSignal extends Signal {
    areas: BitArea[];

    constructor(name: string, type: SignalType) {
        super(name, type);
        this.areas = [];
    }

    addArea(area: SignalArea):void {
        this.areas.push(area as BitArea);
    }

    setArea(areaNum: number, area: SignalArea) {
        this.areas[areaNum] = area as BitArea;
    }

    removeArea(index: number) {
        this.areas.splice(index,1);
    }

}

/**
 * Тактовый сигнал
 */
export class ClkSignal extends Signal {
    areas: BitArea[];

    constructor(name: string, type: SignalType) {
        super(name, type);
        this.areas = [];
    }

    addArea(area: SignalArea):void {
        this.areas.push(area as BitArea);
    }

    setArea(areaNum: number, area: SignalArea) {
        this.areas[areaNum] = area as BitArea;
    }

}

/**
 * Шина
 */
export class BusSignal extends Signal {
    areas: BusArea[];

    constructor(name: string, type: SignalType) {
        super(name, type);
        this.areas = [];
    }

    addArea(area: SignalArea):void {
        this.areas.push(area as BusArea);
    }

    setArea(areaNum: number, area: SignalArea) {
        this.areas[areaNum] = area as BusArea;
    }

}

