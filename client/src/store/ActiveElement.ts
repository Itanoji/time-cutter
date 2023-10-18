import { makeAutoObservable } from "mobx";

export enum ElementType {
    Diagram,
    Signal,
    Areas
}

class ActiveElement {
    type!: ElementType;
    signalIndex?: number;
    areas?: number[];

    constructor() {
        this.type = ElementType.Diagram;
        makeAutoObservable(this);
    }

    setActiveSignal(index:number) {
        this.type = ElementType.Signal;
        this.signalIndex = index;
    }

    setDiagramActive() {
        this.type = ElementType.Diagram;
        this.signalIndex = undefined;
        this.areas = undefined;
    }

    addAreaToActive(signalIndex: number, areaIndex: number) {
        if(this.signalIndex !== signalIndex) {
            this.signalIndex = signalIndex;
            this.areas = [];
        } else {
            this.areas?.push(areaIndex)
        }
    }

    removeActiveAreas() {
        this.areas = [];
    }

    removeActiveArea(index: number) {
        this.areas?.splice(this.areas.indexOf(index), 1);
    }

    setAreaToActive(signalIndex: number, areaIndex: number) {
        this.signalIndex = signalIndex;
        this.areas = [areaIndex];
    }
}

const active = new ActiveElement();

export default active;