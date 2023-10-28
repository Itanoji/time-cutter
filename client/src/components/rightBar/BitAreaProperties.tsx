import active from "../../store/ActiveElement";
import { BitArea, BitAreaValue } from "../../store/Areas";
import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import {useState, useEffect} from 'react';

function getFirstArea() {
   return diagram.signals[active.signalIndex!].areas[active.areas![0]];
}

const BitAreaProperties = () => {
    const [value, setValue] = useState(active.isSignleArea()? (getFirstArea() as BitArea).value : '');
    const [length, setLength] = useState(active.isSignleArea()? getFirstArea().length : '');
    const [isGap, setIsGap] = useState(active.isSignleArea()? getFirstArea().isGap : false);

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

    const handleGapChanged = (e:any) => {
        setIsGap(e.currentTarget.checked);
        for(let i = 0; i < active.areas!.length; i++) {
            diagram.changeAreaGap(active.signalIndex!,active.areas![i], e.currentTarget.checked);
        }
    }


    useEffect(() => {
        setLength(active.isSignleArea()? getFirstArea().length : '');
        setValue(active.isSignleArea()? (getFirstArea() as BitArea).value : '');
        setIsGap(active.isSignleArea()? getFirstArea().isGap : false);
         // eslint-disable-next-line
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
            <div className={"flex flex-row space-x-3 justify-center"}>
                <input type="checkbox" className={"w-4"} checked={isGap} onChange={handleGapChanged}/>
                <label className={"text-lg"}>Gap Mark</label>
            </div>  

        </>
    );
}

export default observer(BitAreaProperties);