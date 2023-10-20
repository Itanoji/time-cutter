import active from "../../store/ActiveElement";
import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import { SignalType } from "../../store/Signal";
import BitAreaProperties from "./BitAreaProperties";
import BusAreaProperties from "./BusAreaProperties";

const AreaProperties = () => {
    if(active.signalIndex === undefined || active.areas === undefined) {
        return null;
    }

    return (
       <div className="space-y-1 justify-items-center flex flex-col">
            <div className={"border-b border-black flex justify-center bg-slate-300"}>
                <label className={"my-1 mx-2 text-center font-bold"}>Areas of {diagram.signals[active.signalIndex].name}</label>
            </div>
            {diagram.signals[active.signalIndex!].type !== SignalType.BUS? <BitAreaProperties/> : null} 
            {diagram.signals[active.signalIndex!].type === SignalType.BUS? <BusAreaProperties/> : null}

       </div>
    );
}

export default observer(AreaProperties);