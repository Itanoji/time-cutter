import { BsTrash3 } from 'react-icons/bs';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io'
const ElementBlock = () => {
    return (
        <div className={"flex flex-row items-center pt-1 pb-1 border-b border-black bg-gray-200"}>
            <div className={"flex flex-col ml-2"}>
                <IoIosArrowUp className={"hover:border hover:border-black hover:rounded cursor-pointer"}/>
                <IoIosArrowDown className={"hover:border hover:border-black hover:rounded cursor-pointer"}/>
            </div>
            <div className={"flex-grow text-center"}>
                <button className={"underline hover:font-semibold active:font-bold"}>
                    SignalName
                </button>
            </div>
            <div className={"mr-5"}>
                <BsTrash3 className={"cursor-pointer hover:bg-slate-300 rounded active:bg-slate-400"} />
            </div>
        </div>
    );
}

export default ElementBlock;