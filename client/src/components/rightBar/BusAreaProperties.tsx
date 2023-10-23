import active from "../../store/ActiveElement";
import { BusArea } from "../../store/Areas";
import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import {useState, useEffect} from 'react';

const BusAreaProperties = () => {
    const getFirst = () => {return diagram.signals[active.signalIndex!].areas[active.areas![0]] as BusArea};
    const [value, setValue] = useState(active.areas!.length === 1? getFirst().value : '');
    const [length, setLength] = useState(active.areas!.length === 1? getFirst().length : '');
    const [fillColor, setFillColor] = useState(active.areas!.length === 1? getFirst().fillColor : '#FFFFFF');
    const [hatching, setHatching] = useState(active.areas!.length === 1? getFirst().hatching : false);
    const [textColor, setTextColor] = useState(active.areas!.length === 1? getFirst().textColor : '#000000');
    const [textSize, setTextSize] = useState(active.areas!.length === 1? getFirst().textSize : 15);

    const handleValueChanged=(e:any) => {
        if(!e.currentTarget.value) return;
        setValue(e.currentTarget.value);
        for(let i = 0; i < active.areas!.length; i++) {
            diagram.changeBusAreaValue(active.signalIndex!,active.areas![i], e.currentTarget.value);
        } 
    }

    const handleLengthChanged=(e:any) => {
        if(!e.currentTarget.value) return;
        setLength(e.currentTarget.value);
        for(let i = 0; i < active.areas!.length; i++) {
            diagram.changeAreaLength(active.signalIndex!,active.areas![i], e.currentTarget.value);
        }
    }

    const handleFillColorChanged=(e:any) => {
        if(!e.currentTarget.value) return;
        setFillColor(e.currentTarget.value);
        for(let i = 0; i < active.areas!.length; i++) {
            diagram.changeBusAreaFillColor(active.signalIndex!,active.areas![i], e.currentTarget.value);
        }
    }

    const handleHatchingChanged = (e:any) => {
        setHatching(e.currentTarget.checked);
        for(let i = 0; i < active.areas!.length; i++) {
            diagram.changeBusAreaHatching(active.signalIndex!,active.areas![i], e.currentTarget.checked);
        }
    }

    const handleTextColorChanged = (e:any) => {
        if(!e.currentTarget.value) return;
        setTextColor(e.currentTarget.value);
        for(let i = 0; i < active.areas!.length; i++) {
            diagram.changeBusAreaTextColor(active.signalIndex!,active.areas![i], e.currentTarget.value);
        }
    }

    const handleTextSizeChanged=(e:any) => {
        if(!e.currentTarget.value) return;
        setTextSize(e.currentTarget.value);
        for(let i = 0; i < active.areas!.length; i++) {
            diagram.changeBusAreaTextSize(active.signalIndex!,active.areas![i], e.currentTarget.value);
        }
    }

    useEffect(() => {
        setLength(active.areas!.length === 1? getFirst().length : '');
        setValue(active.areas!.length === 1?  getFirst().value : '');
        setFillColor(active.areas!.length === 1?  getFirst().fillColor : '#FFFFFF');
        setHatching(active.areas!.length === 1?  getFirst().hatching : false);
        setTextSize(active.areas!.length === 1? getFirst().textSize : 15);
        setTextColor(active.areas!.length === 1? getFirst().textColor : '#000000');
         // eslint-disable-next-line
    },[active.areas!.length, active.areas]);
    

    return (
        <>
             <div className={" flex flex-col space-y-2 justify-center"}>
            <div className="flex flex-row space-x-4 justify-center">
                <div className="flex-col flex">
                    <label className="text-center">Value</label>
                    <input className={"border-2 border-slate-600 rounded-sm text-center w-16"} onChange={handleValueChanged} value={value}/>
                </div>
                <div className="flex flex-col">
                    <label className="text-center">Length</label>
                    <input type="number" value={length} onChange={handleLengthChanged} className={"border-2 border-slate-600 rounded-sm text-center w-16"} min={0.1} step={0.1} lang="en" onKeyDown={(e) => e.preventDefault()}/>
                </div>
            </div>
            <div className="flex flex-row justify-center space-x-4">
                <div className="flex flex-row justify-center space-x-2">
                    <label className="text-center">Fill</label>
                    <input type="color" value={fillColor} onChange={handleFillColorChanged} className={"w-6 h-6 cursor-pointer self-center"}/>
                </div>
                <div className="flex flex-row justify-center space-x-2">
                    <label className="text-center">Hatching</label>
                    <input checked={hatching} onChange={handleHatchingChanged} type="checkbox" className={"w-4 self-center"}/>
                </div>
            </div>
            <div className="flex flex-col justify-center space-y-2">
                <div className="flex flex-row justify-center space-x-2">
                    <label className="text-center">Text color</label>
                    <input type="color" value={textColor} onChange={handleTextColorChanged} className={"w-6 h-6 cursor-pointer self-center"}/>
                </div>
                <div className="flex flex-row justify-center space-x-2">
                    <label className="text-center">Text size</label>
                    <input type="number" value={textSize} onChange={handleTextSizeChanged} className={"border-2 border-slate-600 rounded-sm text-center w-16"} min={1} step={1} onKeyDown={(e) => e.preventDefault()}/>
                </div>
            </div>
       </div>

        </>
    );
}

export default observer(BusAreaProperties);