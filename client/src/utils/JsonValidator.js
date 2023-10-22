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
        const valid = validate(JSON.parse(data));
        if (!valid) {
            console.error(validate.errors);
        }
        return valid;
    } catch(error) {
        
    }
}

export default isValid;