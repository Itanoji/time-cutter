import { observer } from "mobx-react-lite";
import { useState } from "react";
import ExportSelect from "./ExportSelect";
const FileSelect = () => {
    const [subSelect, setSubSelect] = useState(false);


    return (
        <div className="absolute w-32 bg-white border border-gray-300 shadow-md rounded-lg ml-5">
        <ul>
          <li className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-t-lg">
            Open...
          </li>
          <li className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-b-lg" onMouseOver={()=>setSubSelect(true)} onMouseOut={()=>setSubSelect(false)}>
            <div>
                <label>Export as...</label>
                {subSelect? <ExportSelect/> : null}
            </div>
          </li>
        </ul>
      </div>
    );
}

export default observer(FileSelect);