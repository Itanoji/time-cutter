import { autorun, makeAutoObservable, reaction} from "mobx";
import { Signal, SignalType } from "./Signal";
import { BitArea, BitAreaValue, BusArea, SignalArea } from "./Areas";

class Diagram {
    name!: string;
    steps!: number;
    showAxes!: boolean;
    showGrid!: boolean;
    gridInterval!: number;
    gridSteps!:number;
    signalHeight!: number;
    signals!: Signal[];
    refresher: boolean = true;

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

        reaction(() => this.signals.length, ()=> this.saveToLocalStorage());

      
    }

    private fillByDefault() {
        this.name = 'DefaultName';
        this.steps = 15;
        this.showAxes = false;
        this.showGrid = true;
        this.gridInterval = 20;
        this.gridSteps = 20;
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

    setGridSteps(steps:number) {
        this.gridSteps = steps;
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
        this.signals[signalNum].areas.push(area);
    }

    //Установить область
    setAreaInSignal(signalIndex: number, areaIndex: number, area: SignalArea) {
        this.signals[signalIndex].setArea(areaIndex, area);
    }

    //Удалить область
    removeArea(signalIndex: number, areaIndex: number) {
        this.signals[signalIndex].areas.splice(areaIndex, 1);
    }

    insertArea(signalIndex: number, areaIndex: number, area: SignalArea) {
        this.signals[signalIndex].insert(areaIndex, area);
    }

    swap(index1: number, index2: number) {
        const temp = this.signals[index1];
        this.signals[index1] = this.signals[index2];
        this.signals[index2] = temp;
    }

    changeSignal(index: number, signal: Signal) {
        this.signals[index] = signal;
    }

    changeSignalName(index: number, name: string) {
        this.signals[index].name = name;
    }

    changeSignalType(index: number, type: SignalType) {
        if(this.signals[index].type !== SignalType.BUS && type === SignalType.BUS) {
            this.signals[index].areas = [];
        }
        this.signals[index].type = type;
    }

    changeSignalStep(index: number, step: number) {
        this.signals[index].basicAreaLength = step;
    }

    changeSignalColor(index: number, color: string) {
        this.signals[index].color = color;
    }

    setAreasToSignal(index: number, areas: SignalArea[]) {
        this.signals[index].areas = areas;
    }

    swapAreas(signalIndex: number, index1: number, index2: number) {
        const temp = this.signals[signalIndex].areas[index1];
        this.signals[signalIndex].areas[index1] = this.signals[signalIndex].areas[index2];
        this.signals[signalIndex].areas[index2] = temp;
    }

    changeBusAreaValue(signal: number, index: number, value: string) {
        (this.signals[signal].areas[index] as BusArea).value = value;
    }

    changeAreaLength(signal: number, index: number, length: number) {
        this.signals[signal].areas[index].length = length;
    }

    changeBusAreaFillColor(signal: number, index: number, color: string) {
        (this.signals[signal].areas[index] as BusArea).fillColor = color;
    }

    changeBusAreaHatching(signal: number, index: number, hatching: boolean) {
        (this.signals[signal].areas[index] as BusArea).hatching = hatching;
    }

    changeBitAreaValue(signal: number, index: number, value: BitAreaValue) {
        (this.signals[signal].areas[index] as BitArea).value = value;
    }

    getMaxWidth() {
        let max = 0;
        for(let i = 0; i < this.signals.length; i++) {
            let length = 0;
            for(let j = 0; j < this.signals[i].areas.length; j++) {
                length+=this.signals[i].areas[j].length;
            }
            if(max < length) max = length;
        }
        return max;
    }

    //Обновить принудительно
    refresh() {
        this.refresher = !this.refresher;
    }
}

const diagram = new Diagram();

export default diagram;