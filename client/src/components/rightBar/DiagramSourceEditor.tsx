import { toJS } from "mobx";
import diagram from "../../store/Diagram";
import { observer } from "mobx-react-lite";
import {useState, useEffect} from 'react';
import JsonEditor from "../../utils/JsonEditor";
import isValid from "../../utils/JsonValidator";

const DiagramSourceEditor = () => {
    const regex1 = /"length"\s*:\s*"(\d+\.\d+)"/g;
    const regex2 = /"basicAreaLength"\s*:\s*"(\d+\.\d+)"/g;
    const convertToJson = () => {
        return JSON.stringify(toJS(diagram), null, 2).replace(regex1, '"length": $1').replace(regex2, '"basicAreaLength": $1');
    }

    const [json, setJson] = useState(convertToJson());


    const handleJsonChange = (newJson: string) => {
        setJson(newJson);
        let valJson = newJson.replace(/\n/g, '');
        if(isValid(valJson)) {
            diagram.loadFromJson(valJson);
        }

    };

    useEffect(() => {
        setJson(convertToJson())
         // eslint-disable-next-line
    },[JSON.stringify(diagram, null, 2)]);
    

    return (
        <div className={"justify-center flex flex-col flex-center"}>
            <JsonEditor jsonStr={json} onChange={handleJsonChange} />
        </div>  
    );
}

export default observer(DiagramSourceEditor);