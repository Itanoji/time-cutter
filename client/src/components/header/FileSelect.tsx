import { observer } from "mobx-react-lite";
import { useState } from "react";
import ExportSelect from "./ExportSelect";
import diagram from "../../store/Diagram";
import isValid from "../../utils/JsonValidator";

const FileSelect = () => {
    const [subSelect, setSubSelect] = useState(false);

    const handleNewClick = () => {
      diagram.createNew();
    }

    const handleOpenClick = () => {
      const inputElement = document.createElement('input');
      inputElement.type = 'file';
      inputElement.accept = '.json';
    
      inputElement.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            const content = e.target?.result as string;
    
            try {
              if(isValid(content)) {
                diagram.loadFromJson(content);
              }
            } catch (error) {
              console.error("Ошибка разбора JSON:", error);
            }
          };
    
          reader.readAsText(file);
        }
      });
    
      inputElement.click();
    }

    return (
        <div className="absolute w-32 bg-white border border-gray-300 shadow-md rounded-lg ml-5">
        <ul>
          <li className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-t-lg" onClick={handleNewClick}>
            New
          </li>
          <li className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-t-lg" onClick={handleOpenClick}>
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