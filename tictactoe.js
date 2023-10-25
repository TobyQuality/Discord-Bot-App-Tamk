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