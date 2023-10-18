import { observer } from "mobx-react-lite";
import { BitSignal, BusSignal, ClkSignal, SignalType } from "../../store/Signal";
import {useState} from 'react';
import diagram from "../../store/Diagram";

const SignalAddButton = () => {
    const [type, setType] = useState(SignalType.BIT);
    const [name, setName] = useState("");

    const addSignal = () => {
        let newName;
        if(name.length === 0) {
            newName = 'default';
        } else {
            newName = name;
        }

        switch (type) {
            case SignalType.BIT:
                diagram.addSignal(new BitSignal(newName, type));
                break;
            case SignalType.BUS:
                diagram.addSignal(new BusSignal(newName, type));
                break;
            case SignalType.CLK:
                diagram.addSignal(new ClkSignal(newName, type));
                break;
        }
    }

    const handleTypeChanged = (e:any) => {
        setType(e.currentTarget.value);
    }

    const handleNameChanged = (e:any) => {
        setName(e.currentTarget.value);
    }

    return (
        <div className={"bg-slate-300 border-b border-black space-x-3 flex"}>
            <div className={"my-2 space-x-2"}>
                <input className={"ml-2 border-2 border-slate-600 rounded-sm text-center w-14 text-lg"} placeholder="Name" onChange={handleNameChanged}/>
                <select value={type} className={"pl-2 pr-2 border-2 border-slate-600 rounded-lg self-center bg-slate-100 text-center text-lg cursor-pointer"} onChange={handleTypeChanged}>
                    <option value={SignalType.CLK}>{SignalType.CLK}</option>
                    <option value={SignalType.BIT}>{SignalType.BIT}</option>
                    <option value={SignalType.BUS}>{SignalType.BUS}</option>
                </select>
            </div>
            <div className="my-2 border-l border-black">
                <button className={"ml-2 mr-2 pl-2 pr-2 text-lg text-center font-semibold border-2 border-slate-600 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300"}
                        onClick={addSignal}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default observer(SignalAddButton);