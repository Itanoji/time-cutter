import schema from "./DiagramScheme.json";
import * as Ajv from "ajv";


// Загружаем JSON-схему

// Создаем экземпляр Ajv
const ajv = new Ajv();

// Компилируем схему
const validate = ajv.compile(schema);

// Функция для валидации данных
function isValid(data) {
    try {
        const regex1 = /"length"\s*:\s*"(\d+\.\d+|\d+)"/g;
        const regex2 = /"basicAreaLength"\s*:\s*"(\d+\.\d+|\d+)"/g;
        const regex3 = /"textSize"\s*:\s*"(\d+\.\d+|\d+)"/g;
        data = data.replace(/\n/g, '').replace(regex1, '"length": $1').replace(regex2, '"basicAreaLength": $1').replace(regex3, '"textSize": $1');
        const valid = validate(JSON.parse(data));
        if (!valid) {
            console.error(validate.errors);
        }
        return valid;
    } catch(error) {
        
    }
}

export default isValid;