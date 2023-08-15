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
}

const active = new ActiveElement();

export default active;