import { SanitizeOption } from "../interface/SanitizeInterface";

/**
 * Sanitize object with falsy attribute value
 * accept @object parameter
*/
export const sanitizeObject = (data: Object): any => Object.keys(data).reduce(
    (prev, curr) => (
      data[curr] || data[curr] === false || data[curr] === 0 ?
        { ...prev, [curr]: data[curr] } : prev), {},
)

/** 
 * Sanitize object with falsy attribute value and empty array 
*/
export const sanitizeObjectWithoutEmptyArr = (data: Object) => Object.keys(data).reduce(
    (prev, curr) => (
      (Array.isArray(data[curr]) && data[curr].length > 0) ||
        (data[curr] && !Array.isArray(data[curr])) ? { ...prev, [curr]: data[curr] } : prev), {},
)

/**
 * Advanced sanitize object function to remove falsy attribute with dynamic control
*/
export const completeSanitize = (
    object: Object,
    option: Partial<SanitizeOption> = {
      acceptEmptyString: false,
      acceptNull: false,
      acceptUndefined: false,
      acceptEmptyObject: false,
      acceptEmptyArray: false,
      acceptBoolean: true,
      acceptZero: true,
    },
  ) => {
    const {
      acceptBoolean,
      acceptEmptyArray,
      acceptEmptyObject,
      acceptEmptyString,
      acceptNull,
      acceptUndefined,
      acceptZero,
    } = option;
    return Object.keys(object).reduce((prev, key) => {
      const val = object[key]
      const type = typeof val
      switch (type) {
        case 'string':
          if (acceptEmptyString || val) {
            prev[key] = val
          }
          break
        case 'boolean':
          if (acceptBoolean || val) {
            prev[key] = val
          }
          break
        case 'number':
          if (acceptZero || val) {
            prev[key] = val
          }
          break
        case 'undefined':
          if (acceptUndefined || val) {
            prev[key] = val
          }
          break
        case 'object':
          if (Array.isArray(val)) {
            if (acceptEmptyArray || val.length > 0) {
              prev[key] = val
            }
          } else if (val === null) {
            if (acceptNull || val) {
              prev[key] = val
            }
          } else if (acceptEmptyObject || Object.keys(val).length > 0) {
            prev[key] = val
          }
          break
        default:
          break;
      }
      return prev
    }, {})
}

/**
 * Remove nullish array attribute
*/
export const filterNullArrayAttribute = (array: Array<string>) =>
  array.filter((item: string) => item !== null)

/**
 * Remove duplicate on array of object with specific key
*/
export const removeDuplicateObjectInArray = (data: Array<any>, keyCompare: string) =>
  data.filter((item, index, self) =>
    index === self.findIndex(obj => obj[keyCompare].toString() === item[keyCompare].toString()))
  