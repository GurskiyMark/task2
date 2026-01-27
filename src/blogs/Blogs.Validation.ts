import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../common/http-statuses';

/*
///////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ ValidationError и результат валидации

onlyFirstError ▶️ при выводе ошибок: каждое поле встречается только один раз 📍 validationResult(req).array({ onlyFirstError: true })

Тип ValidationError (union):
  | FieldValidationError
  | AlternativeValidationError
  | UnknownFieldsError

///////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ FieldValidationError (основной тип ошибки)

{
  type: 'field' | 'alternative' | 'unknown_fields' ▶️ тип ошибки (поле)
  path: 'email'         ▶️ имя поля, которое не прошло валидацию
  location: 'body' | 'params' | 'query' | 'headers' ▶️ где лежало поле в запросе
  value: 'not-an-email' ▶️ значение, пришедшее от клиента
  msg: 'Invalid email'  ▶️ сообщение ошибки
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ Свойства ошибки
error.path     ▶️ имя поля с ошибкой 📍 body('email') → 'email' 📍 param('id') → 'id'
error.msg      ▶️ текст ошибки (стандартный или from .withMessage()) 📍 'Invalid email'
error.location ▶️ часть запроса, где лежало поле 📍 'body' | 'params' | 'query' | 'headers'
error.value    ▶️ значение, переданное клиентом 📍 'abc' ⚠️ обычно НЕ возвращают клиенту (может быть чувствительным)
error.type     ▶️ тип ошибки 📍 'field' | 'alternative' | 'unknown_fields' ⚠️ редко используется напрямую
  
///////////////////////////////////////////////////////////////////////////////////////////////////////
*/

export const WEBSITE_URL_REGEX = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;


export const blogBodyValidation = [
   body('name')
      .exists().withMessage('Name is required')
      .custom(v => typeof v === 'string').withMessage('name must be a string')
      .isLength({ max: 15 }).withMessage('Max length 15'),
   body('description')
      .exists().withMessage('Description is required')
      .custom(v => typeof v === 'string').withMessage('description must be a string')
      .isLength({ max: 500 }).withMessage('Max length 500'),
   body('websiteUrl')
      .exists().withMessage('WebsiteUrl is required')
      .custom(v => typeof v === 'string').withMessage('websiteUrl must be a string')
      .isLength({ max: 100 }).withMessage('Max length 100')
      .matches(WEBSITE_URL_REGEX).withMessage('WebsiteUrl must start with https:// and be valid')
];







/*
▶️ = что делает / 📍 = пример
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ Кастомная валидация
.custom(fn)           ▶️ собственная логика проверки              📍 body('username').custom(value => value !== 'admin')
   ✅ Обработка результата
validationResult(req) ▶️ получить все ошибки валидации            📍 const errors = validationResult(req).array()
   ✅ Сообщения об ошибках
.withMessage('text')  ▶️ сообщение ошибки для предыдущего правила 📍 body('email').isEmail().withMessage('Invalid email')
.bail() ▶️ если текущая проверка упала — остановить дальнейшие проверки этого поля
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ Проверка наличия и пустоты
.exists()   ▶️ поле должно существовать                   📍 body('email').exists()
.notEmpty() ▶️ поле не должно быть пустой строки          📍 body('password').notEmpty()
.optional() ▶️ если поле есть — валидируем, если нет — ок 📍 body('middleName').optional().isString()
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ Строки (string)
.isString()             ▶️ значение должно быть строкой        📍 body('name').isString()
.isLength({ min, max }) ▶️ длина строки в заданных пределах    📍 body('username').isLength({ min: 3, max: 20 })
.matches(/regex/)       ▶️ строка должна соответствовать regex 📍 body('slug').matches(/^[a-z0-9-]+$/)
.isEmail()              ▶️ валидный email                      📍 body('email').isEmail()
.isURL()                ▶️ валидный URL                        📍 body('website').isURL()
.isIn(['a', 'b'])       ▶️ значение должно быть из списка      📍 body('role').isIn(['admin','user'])
.equals('value')        ▶️ значение должно быть строго равно   📍 body('status').equals('active')
.contains('text')       ▶️ строка должна содержать подстроку   📍 body('bio').contains('developer')
.trim()                 ▶️ удалить пробелы по краям            📍 body('username').trim()
.escape()               ▶️ экранировать HTML (XSS-защита)      📍 body('comment').escape()
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ Числа
.isNumeric()           ▶️ строка состоит только из цифр 📍 body('age').isNumeric()
.isInt()               ▶️ целое число                   📍 body('id').isInt()
.isInt({ min, max })   ▶️ целое число в диапазоне       📍 body('rating').isInt({ min: 1, max: 5 })
.isFloat()             ▶️ дробное число                 📍 body('price').isFloat()
.isFloat({ min, max }) ▶️ дробное число в диапазоне     📍 body('discount').isFloat({ min: 0, max: 100 })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ Boolean
.isBoolean() ▶️ true / false       📍 body('isAdmin').isBoolean()
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ Даты
.isDate()    ▶️ валидная дата      📍 body('birthDate').isDate()
.isISO8601() ▶️ дата в формате ISO 📍 body('startDate').isISO8601()
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ Массивы и объекты
.isArray()             ▶️ значение — массив           📍 body('tags').isArray()
.isArray({ min, max }) ▶️ массив с ограничением длины 📍 body('items').isArray({ min: 1, max: 10 })
.isObject()            ▶️ значение — объект           📍 body('profile').isObject()
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ✅ Результат валидации (validationResult)
.array()     ▶️ массив всех ошибок                  📍 validationResult(req).array()
.mapped()    ▶️ ошибки в виде объекта по полям      📍 validationResult(req).mapped()
.isEmpty()   ▶️ есть ли ошибки (boolean)            📍 validationResult(req).isEmpty()
.formatWith  ▶️ кастомный формат ошибок             📍 validationResult(req).formatWith(err => ({ message: err.msg }))
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   🟡 другие полезные свойства express-validator
.if(condition)     ▶️ выполнять следующую валидацию только если условие true   📍 body('password').if(body('role').equals('admin')).isLength({ min: 10 })
.customSanitizer() ▶️ изменить значение до попадания в handler                 📍 body('email').customSanitizer(v => v.toLowerCase())
.toInt()           ▶️ принудительно преобразует тип в положительное число      📍 body('age').toInt()
.toBoolean()       ▶️ принудительно преобразует тип в boolean                  📍 body('registration').toBoolean()
.checkFalsy()      ▶️ считает '' | null | undefined | 0 | false как отсутствие 📍  body('name').exists({ checkFalsy: true })
    */