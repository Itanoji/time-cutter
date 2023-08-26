import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import { BsTrash3 } from 'react-icons/bs';
import {useState, useEffect} from 'react';
import { BusArea } from "../../store/Areas";
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io';

interface BusAreaProps {
    signalIndex: number;
    areaIndex: number;
    area: BusArea;
}

const BusAreaBlock = ({signalIndex, areaIndex, area}: BusAreaProps) => {

    const [value, setValue] = useState(area.value);
    const [length, setLength] = useState(area.length);
    const [fillColor, setFillColor] = useState(area.fillColor);
    const [hatching, setHatching] = useState(area.hatching);

    useEffect(() => {
        setValue(area.value);
        setFillColor(area.fillColor);
        setHatching(area.hatching);
        setLength(area.length);
    },[signalIndex, areaIndex, area]);

    const onMoveUp = () => {
        diagram.swapAreas(signalIndex, areaIndex, areaIndex-1);
    }

    const onMoveDown = () => {
        diagram.swapAreas(signalIndex, areaIndex, areaIndex+1);
    }

    const onValueChanged = (e: any) => {
        setValue(e.currentTarget.value);
        diagram.changeBusAreaValue(signalIndex, areaIndex,e.currentTarget.value);
    }

    const handleLengthChanged = (e: any) => {
        setLength(e.currentTarget.value);
        diagram.changeAreaLength(signalIndex, areaIndex, e.currentTarget.value);
    }

    const handleFillColorChanged = (e:any) => {
        setFillColor(e.currentTarget.value);
        diagram.changeBusAreaFillColor(signalIndex, areaIndex, e.currentTarget.value);
    }

    const handleHatchingChanged = (e:any) => {
        setHatching(e.currentTarget.checked);
        diagram.changeBusAreaHatching(signalIndex, areaIndex, e.currentTarget.checked);
    }

    const onRemove = () => {
        diagram.removeArea(signalIndex, areaIndex);
    }

    return (
    <div className="flex flex-row items-center border-b border-black justify-items-center space-x-3">
        <div className={"flex flex-col ml-2"}>
            {areaIndex !== 0? <IoIosArrowUp className={"hover:border hover:border-black hover:rounded cursor-pointer"}  onClick={onMoveUp}/> : ""}
            {areaIndex !== diagram.signals[signalIndex].areas.length-1? <IoIosArrowDown className={"hover:border hover:border-black hover:rounded cursor-pointer"} onClick={onMoveDown}/> : ""}
        </div>
        <div className={" flex flex-col space-y-2 justify-center"}>
            <div className="flex flex-row space-x-4 justify-center">
                <div className="flex-col flex">
                    <label className="text-center">Value</label>
                    <input className={"border-2 border-slate-600 rounded-sm text-center w-16"} onChange={onValueChanged} value={value}/>
                </div>
                <div className="flex flex-col">
                    <label className="text-center">Length</label>
                    <input type="number" value={length} onChange={handleLengthChanged} className={"border-2 border-slate-600 rounded-sm text-center w-16"} min={0.1} step={0.1} lang="en" onKeyDown={(e) => e.preventDefault()}/>
                </div>
            </div>
            <div className="flex flex-row justify-center space-x-4">
                <div className="flex flex-row justify-center space-x-2">
                    <label className="text-center">Fill color</label>
                    <input type="color" value={fillColor} onChange={handleFillColorChanged} className={"w-6 h-6 cursor-pointer self-center"}/>
                </div>
                <div className="flex flex-row justify-center space-x-2">
                    <label className="text-center">Hetching</label>
                    <input checked={hatching} onChange={handleHatchingChanged} type="checkbox" className={"w-4 self-center"}/>
                </div>
            </div>
       </div>
       <BsTrash3 className={"cursor-pointer hover:bg-slate-300 rounded active:bg-slate-400 self-center"} onClick={onRemove}/>
    </div>
    );
}

export default observer(BusAreaBlock);