import ElementBlock from "./ElementBlock";
import SignalAddButton from "./SignalAddButton";
import { observer } from "mobx-react-lite";
import diagram from "../../store/Diagram";

const SignalBar = () => {
    return (
        <aside className={"bg-gray-300 border-r border-black w-56 overflow-y-auto min-w-min"}>
            <SignalAddButton/>
            {diagram.signals.map((item, index) => 
                <ElementBlock signal={item} index={index} key={index}/>
            )}
        </aside>
    );
}

export default observer(SignalBar);