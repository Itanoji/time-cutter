import { BsTrash3 } from 'react-icons/bs';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io';
import { Signal } from '../../store/Signal';
import { observer } from 'mobx-react-lite';
import diagram from '../../store/Diagram';
import active from '../../store/ActiveElement';

interface BlockProps {
    index: number;
    signal: Signal;
}

const ElementBlock = ({index, signal}: BlockProps) => {

    const onDelete = () => {
        diagram.removeSignal(index);
        if(active.signalIndex === index) {
            active.setDiagramActive();
        }
    }

    const onMoveUp = () => {
        diagram.swap(index, index-1);
    }

    const onMoveDown = () => {
        diagram.swap(index, index+1);
    }

    const onNameClicked =() => {
        active.setActiveSignal(index);
    }

    return (
        <div className={"flex flex-row items-center pt-1 pb-1 border-b border-black bg-gray-200"}>
            <div className={"flex flex-col ml-2"}>
                {index !== 0? <IoIosArrowUp className={"hover:border hover:border-black hover:rounded cursor-pointer"} onClick={onMoveUp}/> : ""}
                {index !== diagram.signals.length-1? <IoIosArrowDown className={"hover:border hover:border-black hover:rounded cursor-pointer"} onClick={onMoveDown}/> : ""}
            </div>
            <div className={"flex-grow text-center"}>
                <button className={"hover:underline hover:font-semibold active:font-bold text-xl"} onClick={onNameClicked}>
                    {signal.name}
                </button>
            </div>
            <div className={"mr-5"}>
                <BsTrash3 className={"cursor-pointer hover:bg-slate-300 rounded active:bg-slate-400"} onClick={onDelete} />
            </div>
        </div>
    );
}

export default observer(ElementBlock);