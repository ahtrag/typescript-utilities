/**
 * Create uppercase only on the first letter of in a string
*/
export const upperCaseFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

/**
 * Lowercasing all word in a string and capitalize only at first letter in every word
*/
export const lowerCaseAllWordsExceptFirstLetters = (string: string) => string.replace(/_/g, ' ').replace(/\S*/g, word => word.charAt(0) + word.slice(1).toLowerCase())

/**
 * Convert Kebab Case string to Camel Case
*/
export const camelize = (str: string) => {
    const arr = str.split('-');
    const capital = arr.map(
      (item, index) => (
        index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase()
      ),
    );
  
    const capitalString = capital.join('');
  
    return capitalString
}