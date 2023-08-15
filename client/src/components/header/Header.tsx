import { observer } from "mobx-react-lite";
import diagram from "../../store/Diagram";
import active from "../../store/ActiveElement";
const Header = () => {

    const onNameClicked = () => {
        active.setDiagramActive();
    }

    return (
        <header className={"bg-gray-200 p-1 border-b border-black flex flex-row font"}>
            <div>
                <img src={"ico.png"} alt="logo" width={40} height={40}/>
            </div>
            <div className={"flex flex-row mt-4 ml-2 text-lg"}>
                <div className={"pr-2 pl-2"}>
                    <u>F</u>ile
                </div>
                <div className={"pr-2 pl-2"}>
                    <u>E</u>dit
                </div>
            </div>
            <div className={"flex-grow text-center font-bold text-3xl"}>
                <button className={"hover:underline"} onClick={onNameClicked}>
                    {diagram.name}
                </button>
            </div>
            <div className={"mr-5 text-lg mt-4"}>
                Login
            </div>
        </header>
    );
}

export default observer(Header);