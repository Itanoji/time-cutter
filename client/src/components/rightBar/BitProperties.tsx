import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import { Signal } from "../../store/Signal";
import {useState, useEffect} from 'react';
import { BitArea, BitAreaValue } from "../../store/Areas";

interface SignalProps {
    index: number;
    signal: Signal;
}

const BitProperties = ({index, signal}: SignalProps) => {
    const [values, setValues] = useState(signal.areas.map((a) => a as BitArea).map((a) => a.value).join(''));
    const [step, setStep] = useState(signal.basicAreaLength);

    useEffect(() => {
       setValues(signal.areas.map((a) => a as BitArea).map((a) => a.value).join(''));
       setStep(signal.basicAreaLength);
    },[index,signal]);

    const handleKeyPressed = (e:any) => {
        const allowedChars = ['0', '1', 'z','~','Delete','Backspace', 'ArrowLeft', 'ArrowRight'];
        const pressedKey = e.key;
        if (!allowedChars.includes(pressedKey)) {
                e.preventDefault();
        }
    }

    const handleValuesChanged = (e:any) => {
        setValues(e.currentTarget.value);
        const areas = e.currentTarget.value.split('').map((a: BitAreaValue) => new BitArea(1,a));
        diagram.setAreasToSignal(index, areas);
    }

    const handleStepChanged = (e:any) => {
      setStep(e.currentTarget.value);
      diagram.changeSignalStep(index, e.currentTarget.value);
    }

    return (
       <div className="space-y-3">
            <div className={"flex flex-col justify-items-center"}>
                <label className="text-center">Values</label>
                <input value={values} className={"border-2 border-slate-600 rounded-sm text-center mx-8"} onKeyDown={handleKeyPressed} onChange={handleValuesChanged} title="List the signal values (0, 1, z, ~)"/>
            </div>
            <div className={"flex flex-row justify-center space-x-2"}>
                <label className="text-center">Step</label>
                <input type="number" className={"border-2 border-slate-600 rounded-sm text-center w-16"} min={0.1} step={0.1} value={step} onChange={handleStepChanged} lang="en" onKeyDown={(e) => e.preventDefault()}/>
            </div>
       </div>
    );
}

export default observer(BitProperties);