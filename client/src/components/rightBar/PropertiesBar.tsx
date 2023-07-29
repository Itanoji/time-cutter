import DiagramProperties from "./DiagramProperties";
import { observer } from "mobx-react-lite";

const PropertiesBar = () => {
    return (
        <aside className={"w-72 flex flex-col bg-gray-300 border-l border-black text-lg overflow-y-auto min-w-min"}>
            <DiagramProperties/>
        </aside>
    );
}

export default observer(PropertiesBar);