import { observer } from "mobx-react-lite";
import active from "../../store/ActiveElement";
const EditSelect = () => {

    return (
        <div className="absolute w-32 bg-white border border-gray-300 shadow-md rounded-lg ml-5">
        <ul>
          <li className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-t-lg" onClick={()=>(active.setSourceToActive())}>
            JSON
          </li>
        </ul>
      </div>
    );
}

export default observer(EditSelect);