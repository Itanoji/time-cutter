import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

interface EditorProps {
    jsonStr: string,
    onChange: (e:any) => void;
}

function JsonEditor({ jsonStr, onChange }: EditorProps) {
    const extensions = [json()];
    return (
      <div>
        <h2 className={"text-center font-bold my-2"}>Source Code</h2>
        <div className={"border-t border-black"}>
            <CodeMirror
            value={jsonStr}
            theme={'light'}
            extensions={extensions}
            width='400px'
            onChange={onChange}
            />
        </div>
      </div>
    );
}

export default JsonEditor;
