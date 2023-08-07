import { observer } from "mobx-react-lite";

const SignalAddButton = () => {
    return (
        <div className={"bg-slate-300 border-b border-black space-x-10"}>
                <button className={"mt-2 mb-2 pl-2  pr-2 ml-5 text-lg text-center font-semibold border-2 border-slate-600 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300"}>
                    Add
                </button>
                <select className={"pl-2 pr-2 border-2 border-slate-600 rounded-lg bg-slate-100 text-center text-lg cursor-pointer"}>
                    <option>clk</option>
                    <option>bit</option>
                    <option>bus</option>
                </select>
        </div>
    );
}

export default observer(SignalAddButton);