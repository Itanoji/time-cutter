import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import { Signal, SignalType } from "../../store/Signal";
import {useState, useEffect} from 'react';
import BitProperties from "./BitProperties";
import BusProperties from "./BusProperties";

interface SignalProps {
    index: number;
    signal: Signal;
}

const SignalProperties = ({index, signal}: SignalProps) => {
    const [name, setName] = useState(signal.name);
    const [type, setType] = useState(signal.type);
    const [color, setColor] = useState(signal.color);

    useEffect(() => {
        setName(signal.name);
        setType(signal.type);
        setColor(signal.color);
    },[index,signal]);

    const handleNameChanged = (e:any) => {
        const value = e.currentTarget.value;
        setName(value);
        if(value.length !== 0) {
            diagram.changeSignalName(index, value);
        }
    }

    const handleTypeChanged = (e:any) => {
        setType(e.currentTarget.value);
        diagram.changeSignalType(index, e.currentTarget.value);
    }

    const hanldeColorChanged = (e:any) => {
        setColor(e.currentTarget.value);
        diagram.changeSignalColor(index, e.currentTarget.value);
    }


    return (
        <div className={"space-y-3"}>
            <div className={"border-b border-black flex justify-center bg-slate-300"}>
                <input value={name} className={"border-2 border-slate-600 rounded-sm mt-4 mb-4 mx-2 text-center"} onChange={handleNameChanged}/>
            </div>
            <div className={"flex flex-row justify-center space-x-2"}>
                <label className="text-center">Signal Type</label>
                <select value={type} onChange={handleTypeChanged} className={"pl-2 pr-2 border-2 border-slate-600 rounded-lg self-center bg-slate-100 text-center text-lg cursor-pointer"}>
                    <option value={SignalType.CLK}>{SignalType.CLK}</option>
                    <option value={SignalType.BIT}>{SignalType.BIT}</option>
                    <option value={SignalType.BUS}>{SignalType.BUS}</option>
                </select>
            </div>
            <div className={"flex flex-row justify-center space-x-2"}>
                <label className="text-center">Color</label>
                <input value={color} type="color" className={"w-6 h-6 cursor-pointer self-center"} onChange={hanldeColorChanged}/>

            </div>
            {type === SignalType.CLK || type === SignalType.BIT ? <BitProperties index={index} signal={signal}/> : ""}
            {type === SignalType.BUS ? <BusProperties index={index} signal={signal}/> : ""}
        </div>
    );
}

export default observer(SignalProperties);