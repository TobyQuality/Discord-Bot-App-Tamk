// Creates a specified size 2d array and populates it with a specific character
export function createTTTArray(size) {
    let tttArray = [];
    for (let i = 0; i < size; i++) {
        let tttSubArray = [];
        for (let j = 0; j < size; j++) {
            tttSubArray[j] = "⬛";
        }
        tttArray[i] = tttSubArray;
    }
}