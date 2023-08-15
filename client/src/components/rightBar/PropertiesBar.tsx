import DiagramProperties from "./DiagramProperties";
import { observer } from "mobx-react-lite";
import active from "../../store/ActiveElement";
import { ElementType } from "../../store/ActiveElement";
import SignalProperties from "./SignalProperties";

const PropertiesBar = () => {
    return (
        <aside className={"w-72 flex flex-col bg-gray-300 border-l border-black text-lg overflow-y-auto min-w-min"}>
            {
                active.type === ElementType.Diagram? <DiagramProperties/> :
                active.type === ElementType.Signal? <SignalProperties/> : null
            }
        </aside>
    );
}

export default observer(PropertiesBar);