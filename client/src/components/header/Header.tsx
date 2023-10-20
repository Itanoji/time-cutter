import { observer } from "mobx-react-lite";
import diagram from "../../store/Diagram";
import active from "../../store/ActiveElement";
import { useEffect, useState, useRef } from "react";
import FileSelect from "./FileSelect";
const Header = () => {
    const [fileSelect, setFileSelect] = useState(false);
    const fileRef = useRef<HTMLDivElement | null>(null); // Создаем реф

    const onNameClicked = () => {
        active.setDiagramActive();
    }

    const handleFileClicked = () => {
        setFileSelect(true);
    }
    
    useEffect(() => {
        function handleClickOutside(e:any) {
            if (fileSelect && !fileRef.current!.contains(e.target)) {
                setFileSelect(false);
              }
        }

        document.addEventListener('mousedown', handleClickOutside);

        // Удалить обработчик события при размонтировании компонента
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [fileSelect]);

    return (
        <header className={"bg-gray-200 p-1 border-b border-black flex flex-row font"}>
            <div>
                <img src={"ico.png"} alt="logo" width={40} height={40}/>
            </div>
            <div className={"flex flex-row mt-4 ml-2 text-lg"}>
                <div className={"relative pr-2 pl-2"}>
                    <button className={"hover:bg-slate-300 rounded-lg w-10"} onClick={handleFileClicked}><u>F</u>ile</button>
                    {fileSelect? <div ref={fileRef}><FileSelect/></div> : null }
                </div>
                <div className={"pr-2 pl-2 hover:cursor"}>
                    <button className={"hover:bg-slate-300 rounded-lg w-10"}><u>E</u>dit</button>
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