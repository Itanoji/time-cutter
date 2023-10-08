import { makeObservable, observable } from "mobx";
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
    color: string = '#000000';
    basicAreaLength: number = 1;

    constructor(name: string, type: SignalType) {
        this.name = name;
        this.type = type;
        makeObservable(this, {
            name: observable,
            type: observable,
            areas: observable,
            color: observable,
            basicAreaLength: observable
          });
    }

    abstract addArea(area: SignalArea):void;

    abstract setArea(areaNum: number, area: SignalArea):void;

    remove(index: number) {
        this.areas.splice(index,1);
    }

    insert(index:number, area: SignalArea) {
        this.areas.splice(index, 0, area);
    }

    changeName(name: string) {
        this.name = name;
    }

    changeType(type: SignalType) {
        if(this.type !== SignalType.BUS && type === SignalType.BUS) {
            this.areas = [];
        }
        
        this.type = type;
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

