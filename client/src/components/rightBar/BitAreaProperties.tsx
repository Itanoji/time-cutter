import active from "../../store/ActiveElement";
import { BitArea, BitAreaValue } from "../../store/Areas";
import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import {useState, useEffect} from 'react';

const BitAreaProperties = () => {
    const [value, setValue] = useState(active.areas!.length === 1? (diagram.signals[active.signalIndex!].areas[active.areas![0]] as BitArea).value : '');
    const [length, setLength] = useState(active.areas!.length === 1? diagram.signals[active.signalIndex!].areas[active.areas![0]].length : '');

    const handleValueChanged=(e:any) => {
        if(!e.currentTarget.value) return;
        setValue(e.currentTarget.value);
        for(let i = 0; i < active.areas!.length; i++) {
            diagram.changeBitAreaValue(active.signalIndex!,active.areas![i], e.currentTarget.value);
        } 
    }

    const handleLengthChanged=(e:any) => {
        if(!e.currentTarget.value) return;
        setLength(e.currentTarget.value);
        for(let i = 0; i < active.areas!.length; i++) {
            diagram.changeAreaLength(active.signalIndex!,active.areas![i], e.currentTarget.value);
        }
    }

    useEffect(() => {
        setLength(active.areas!.length === 1? diagram.signals[active.signalIndex!].areas[active.areas![0]].length : '');
        setValue(active.areas!.length === 1? (diagram.signals[active.signalIndex!].areas[active.areas![0]] as BitArea).value : '');
    },[active.areas!.length, active.areas]);
    

    return (
        <>
            <div className={"justify-center flex flex-col flex-center text-center"}>
                <label>Value</label>
                <select value={value} onChange={handleValueChanged} className={"pl-2 pr-2 border-2 border-slate-600 rounded-lg self-center bg-slate-100 text-center cursor-pointer"}>
                    <option value={BitAreaValue.HIGH}>hight</option>
                    <option value={BitAreaValue.LOW}>low</option>
                    <option value={BitAreaValue.Z}>Z</option>
                    <option value={BitAreaValue.UNKNOW}>unknown</option>
                    <option hidden value=""></option>
                </select>
            </div>
            <div className="flex flex-col justify-center text-center items-center">
                    <label className="text-center">Length</label>
                    <input type="number" value={length} onChange={handleLengthChanged} className={"border-2 border-slate-600 rounded-sm text-center w-16"} min={0.1} step={0.1} lang="en" onKeyDown={(e) => e.preventDefault()}/>
            </div>  

        </>
    );
}

export default observer(BitAreaProperties);