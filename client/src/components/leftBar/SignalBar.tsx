import ElementBlock from "./ElementBlock";
import SignalAddButton from "./SignalAddButton";

const SignalBar = () => {
    return (
        <aside className={"bg-gray-300 border-r border-black w-56 overflow-y-auto min-w-min"}>
            <SignalAddButton/>
            <ElementBlock/>
        </aside>
    );
}

export default SignalBar;