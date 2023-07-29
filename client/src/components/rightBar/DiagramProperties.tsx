import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
const DiagramProperties = () => {

    const onNameChanged = (e: React.FormEvent<HTMLInputElement>) => {
        diagram.name = e.currentTarget.value;
    }
    
    return (
        <div className={"space-y-3"}>
            <div className={"border-b border-black flex justify-center"}>
                <input className={"border-2 border-slate-600 rounded-sm mt-4 mb-4"} value={diagram.name} onChange={onNameChanged}/>
            </div>
            <div className={"flex flex-col justify-center"}>
                <label className="text-center">Step interval</label>
                <input className={"border-2 border-slate-600 rounded-sm w-20 self-center mt-1"}></input>
            </div>
            <div className={"flex flex-row space-x-3 justify-center"}>
                <input type="checkbox" className={"w-4"}/>
                <label className={"text-lg"}>Show grid</label>
            </div>
            <div className={"flex flex-row space-x-3 justify-center"}>
                <input type="checkbox" className={"w-4"}/>
                <label className={"text-lg"}>Show axes</label>
            </div>
        </div>
    );
}

export default observer(DiagramProperties);