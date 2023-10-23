import { observer } from "mobx-react-lite";
import { useState } from "react";
import ExportSelect from "./ExportSelect";
import diagram from "../../store/Diagram";
import isValid from "../../utils/JsonValidator";
import { json } from "stream/consumers";
const FileSelect = () => {
    const [subSelect, setSubSelect] = useState(false);

    const handleNewClick = () => {
      diagram.createNew();
    }

    const jsonCorrection = (json: string) => {
      const regex1 = /"length"\s*:\s*"(\d+\.\d+)"/g;
      const regex2 = /"basicAreaLength"\s*:\s*"(\d+\.\d+)"/g;
      return json.replace(/\n/g, '').replace(regex1, '"length": $1').replace(regex2, '"basicAreaLength": $1');
    }

    const handleOpenClick = () => {
        // Создаем скрытый input элемент
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".json";
        fileInput.style.display = "none";

        // Обработчик события change для элемента input
        fileInput.addEventListener("change", (e:any) => {
            const selectedFile = e.target.files[0];

            if (selectedFile) {
                // Создаем объект FileReader
                const reader = new FileReader();

                // Обработчик завершения чтения файла
                reader.onload = (event:any) => {
                    try {
                        // Читаем содержимое файла как текст и парсим его как JSON
                        const fileContent = event.target.result as string;
                        const jsonData = JSON.parse(jsonCorrection(fileContent));
                        if(isValid(jsonData)){
                          diagram.loadFromJson(jsonData);
                        } else {
                          alert("Некорректный формат файла!");
                        }
                    } catch (error) {
                        alert("Ошибка при чтении файла JSON!");
                        console.error("Ошибка при чтении файла JSON:", error);
                    }
                };

                // Читаем выбранный файл
                reader.readAsText(selectedFile);
            } else {
                console.log("Файл не выбран.");
            }
        });

        // Запускаем диалоговое окно выбора файла
        fileInput.click();
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