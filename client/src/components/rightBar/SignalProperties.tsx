import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import { SignalType } from "../../store/Signal";
import active from "../../store/ActiveElement";
const SignalProperties = () => {

    return (
        <div className={"space-y-3"}>
            <div className={"border-b border-black flex justify-center"}>
                <input value={diagram.signals[active.signalIndex!].name} className={"border-2 border-slate-600 rounded-sm mt-4 mb-4 text-center"}/>
            </div>
            <div className={"flex flex-row justify-center space-x-2"}>
                <label className="text-center">Signal Type</label>
                <select className={"pl-2 pr-2 border-2 border-slate-600 rounded-lg self-center bg-slate-100 text-center text-lg cursor-pointer"}>
                    <option value={SignalType.CLK}>{SignalType.CLK}</option>
                    <option value={SignalType.BIT}>{SignalType.BIT}</option>
                    <option value={SignalType.BUS}>{SignalType.BUS}</option>
                </select>
            </div>
        </div>
    );
}

export default observer(SignalProperties);