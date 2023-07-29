import { makeAutoObservable } from "mobx";

class Diagram {
    name!: string;
    steps!: number;
    showAxes!: boolean;
    showGrid!: boolean;
    stepInterval!: number;

    constructor() {
        const diagramStr = localStorage.getItem("diagram");
        if(diagramStr) {
            try {
                Object.assign(this, JSON.parse(diagramStr));
            } catch(error) {
                console.error("Ошибка при преобразовании JSON:", error);
                this.fillByDefault();
                localStorage.setItem("diagram", JSON.stringify(this));
            }
        } else {
            this.fillByDefault();
            localStorage.setItem("diagram", JSON.stringify(this));
        }
        makeAutoObservable(this);
    }

    fillByDefault() {
        this.name = 'DefaultName';
        this.steps = 15;
        this.showAxes = false;
        this.showGrid = true;
        this.stepInterval = 1;
    }
}

const diagram = new Diagram();

export default diagram;