import active from "../../store/ActiveElement";
import { BitArea, BitAreaValue } from "../../store/Areas";
import { toJS } from "mobx";
import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import {useState, useEffect} from 'react';
import JsonEditor from "../../utils/JsonEditor";
import isValid from "../../utils/JsonValidator";

const DiagramSourceEditor = () => {
    const [json, setJson] = useState(JSON.stringify(diagram, null, 2));

    const handleJsonChange = (newJson: string) => {
        setJson(newJson);
        let valJson = newJson.replace(/\n/g, '');
        if(isValid(valJson)) {
            diagram.loadFromJson(valJson);
        }

    };

    useEffect(() => {
        setJson(JSON.stringify(toJS(diagram), null, 2))
    },[JSON.stringify(diagram, null, 2)]);
    

    return (
        <div className={"justify-center flex flex-col flex-center"}>
            <JsonEditor jsonStr={json} onChange={handleJsonChange} />
        </div>  
    );
}

export default observer(DiagramSourceEditor);