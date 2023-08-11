import { autorun, makeAutoObservable } from "mobx";
import { Signal } from "./Signal";
import { SignalArea } from "./Areas";

class Diagram {
    name!: string;
    steps!: number;
    showAxes!: boolean;
    showGrid!: boolean;
    gridInterval!: number;
    signalHeight!: number;
    signals!: Signal[];

    constructor() {
        const diagramStr = localStorage.getItem("diagram");
        if(diagramStr) {
            try {
                Object.assign(this, JSON.parse(diagramStr));
            } catch(error) {
                console.error("Ошибка при преобразовании JSON:", error);
                this.fillByDefault();
            }
        } else {
            this.fillByDefault();
        }
        makeAutoObservable(this);

        autorun(() => {
            this.saveToLocalStorage();
          });
      
    }

    private fillByDefault() {
        this.name = 'DefaultName';
        this.steps = 15;
        this.showAxes = false;
        this.showGrid = true;
        this.gridInterval = 1;
        this.signalHeight = 20;
        this.signals = [];
    }
    
    //Сохранить в хранилище
    saveToLocalStorage() {
        const dataToSave = JSON.stringify(this);
        localStorage.setItem("diagram", dataToSave);
    }

    //Имя
    setName(name:string) {
        this.name = name;
    }

    //Интервал сетки
    setGridInterval(stepInterval:number) {
        this.gridInterval = stepInterval;
    }

    //Показывать сетку
    setShowGrid(showGrid:boolean) {
        this.showGrid = showGrid;
    }

    //Высота сигнала
    setSignalHeight(signalHeight:number) {
        this.signalHeight = signalHeight;
    }

    //Добавить сигнал
    addSignal(signal: Signal) {
        this.signals.push(signal);
    }

    removeSignal(index: number) {
        this.signals.splice(index, 1);
    }

    //Добавить область к сигналу
    addAreaToSignal(signalNum: number, area: SignalArea) {
        this.signals[signalNum].addArea(area);
    }

    //Установить область
    setAreaInSignal(signalIndex: number, areaIndex: number, area: SignalArea) {
        this.signals[signalIndex].setArea(areaIndex, area);
    }

    //Удалить область
    removeArea(signalIndex: number, areaIndex: number) {
        this.signals[signalIndex].remove(areaIndex);
    }

    insertArea(signalIndex: number, areaIndex: number, area: SignalArea) {
        this.signals[signalIndex].insert(areaIndex, area);
    }

}

const diagram = new Diagram();

export default diagram;