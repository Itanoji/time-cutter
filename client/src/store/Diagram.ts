import { autorun, makeAutoObservable } from "mobx";

class Diagram {
    name!: string;
    steps!: number;
    showAxes!: boolean;
    showGrid!: boolean;
    gridInterval!: number;
    signalHeight!: number;

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

}

const diagram = new Diagram();

export default diagram;