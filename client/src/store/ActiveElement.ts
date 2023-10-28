import { makeAutoObservable } from "mobx";

export enum ElementType {
    Diagram,
    Signal,
    Areas,
    Source
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
        }
        this.areas?.push(areaIndex)
        this.type = ElementType.Areas;

    }

    removeActiveAreas() {
        this.areas = [];
        this.setDiagramActive();
    }

    removeActiveArea(index: number) {
        this.areas?.splice(this.areas.indexOf(index), 1);
    }

    setAreaToActive(signalIndex: number, areaIndex: number) {
        this.signalIndex = signalIndex;
        this.areas = [areaIndex];
        this.type = ElementType.Areas;
    }

    setSourceToActive() {
        this.type = ElementType.Source;
    }

    isSignleArea() {
        if(this.type === ElementType.Areas && this.areas !== undefined && this.areas.length > 1) {
            return false;
        }
        return true;
    }
}

const active = new ActiveElement();

export default active;