import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import { Signal } from "../../store/Signal";
import { useEffect } from 'react';
import { BusArea } from "../../store/Areas";
import BusAreaBlock from "./BusAreaBlock";

interface AreaProps {
    signalIndex: number;
    areas:[]                                                                                                                                                                              
}

const BusProperties = ({index, signal}: SignalProps) => {

    useEffect(() => {
    },[index,signal]);

    const addArea = () => {
        const area = new BusArea(1,'');
        diagram.addAreaToSignal(index, area);
    }



    return (
       <div className="space-y-3 justify-items-center flex flex-col">
            <button className={"text-center font-semibold border-2 border-slate-600 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300 w-24 self-center"} onClick={addArea}>Add area</button>
            <div className="border-t border-black bg-gray-200">
            {signal.areas.map((a) => a as BusArea).map((item, areaIndex) => 
            <BusAreaBlock signalIndex={index} areaIndex={areaIndex} area={item} key={areaIndex}/>
            )}
            </div>
       </div>
    );
}

export default observer(BusProperties);                                                                                                                                                                                                                      Ь                                                           