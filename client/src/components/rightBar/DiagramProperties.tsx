import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
const DiagramProperties = () => {

    //Изменение названия диаграммы
    const handleNameChanged = (e: any) => {
        diagram.setName(e.currentTarget.value);
    }

    //Изменение интервала сетки
    const handleGridInvervalChanged = (e: any) => {
        if(e.currentTarget.value.length === 0) {
            e.currentTarget.value = '1';
        }
        if(e.currentTarget.value.length > 2) {
            e.currentTarget.value = e.currentTarget.value.substring(0,2);
        }

        let num = parseInt(e.currentTarget.value);

        if(num < 1 ) {
            num = 1;
        } else if(num > 20) {
           num = 20;
        }

        diagram.setGridInterval(num);
    }

    const handleGridStepsChanged = (e:any) => {
        if(e.currentTarget.value.length === 0) {
            e.currentTarget.value = '1';
        }

        let num = parseInt(e.currentTarget.value);

        if(num < 1 ) {
            num = 1;
        }

        diagram.setGridSteps(num);
    }

    //Изменение отображения сетки
    const handleShowGridChanged = (e: any) => {
        diagram.setShowGrid(e.currentTarget.checked);
    }

    //Изменение высоты сигнала
    const handleSignalHeighChanged = (e: any) => {
        if(e.currentTarget.value.length === 0) {
            e.currentTarget.value = '1';
        }
        if(e.currentTarget.value.length > 2) {
            e.currentTarget.value = e.currentTarget.value.substring(0,2);
        }

        let num = parseInt(e.currentTarget.value);
        if(num < 1 ) {
            num = 1;
        } else if(num > 20) {
            num = 20;
        }

        diagram.setSignalHeight(num);
    }
    
    return (
        <div className={"space-y-3"}>
            <div className={"border-b border-black flex justify-center bg-slate-300"}>
                <input className={"border-2 border-slate-600 rounded-sm mt-4 mb-4 text-center"} value={diagram.name} onChange={handleNameChanged}/>
            </div>
            <div className={"flex flex-col justify-center"}>
                <label className="text-center">Grid interval</label>
                <input className={"border-2 border-slate-600 rounded-sm w-20 self-center  text-center mt-1"} type="number" value={diagram.gridInterval} onChange={handleGridInvervalChanged}/>
            </div>
            <div className={"flex flex-col justify-center"}>
                <label className="text-center">Grid steps</label>
                <input className={"border-2 border-slate-600 rounded-sm w-20 self-center  text-center mt-1"} type="number" value={diagram.gridSteps} onChange={handleGridStepsChanged}/>
            </div>
            <div className={"flex flex-col justify-center"}>
                <label className="text-center">Signal height</label>
                <input className={"border-2 border-slate-600 rounded-sm w-20 self-center  text-center mt-1"} type="number" value={diagram.signalHeight} onChange={handleSignalHeighChanged}/>
            </div>
            <div className={"flex flex-row space-x-3 justify-center"}>
                <input type="checkbox" className={"w-4"} checked={diagram.showGrid} onChange={handleShowGridChanged}/>
                <label className={"text-lg"}>Show grid</label>
            </div>
            <div className={"flex flex-row space-x-3 justify-center"}>
                <input type="checkbox" className={"w-4"}/>
                <label className={"text-lg"}>Show axes</label>
            </div>
        </div>
    );
}

export default observer(DiagramProperties);