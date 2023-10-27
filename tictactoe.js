/**
 * Creates a specified size 2d array and populates it with a specific character
 * @param {Array size} size
 * @param {Character the array is populated with} chara
 * @returns the populated array
 */
export function createTTTArray(size, chara) {
    let tttArray = [];
    for (let i = 0; i < size; i++) {
        let tttSubArray = [];
        for (let j = 0; j < size; j++) {
            tttSubArray[j] = chara;
        }
        tttArray[i] = tttSubArray;
    }
    return tttArray;
}

/**
 * Inserts a given character to a specified spot in a 2d array
 * @param {x coordinate in 2d array} x
 * @param {y coordinate in 2d array} y
 * @param {character to be inserted} chara
 * @param {2darray that's being inserted to} field
 * @returns Invalid argument error or the updated field
 */
function addInput(x, y, chara, field) {
    if (x > field.length || y > field.length) {
        return IOException("invalid argument");
    }

    field[x][y] = chara
    return field
}