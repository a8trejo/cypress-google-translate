// ***********************************************
// Miscellaneous functions

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomFloat(max, dec=6) {
    let randomNumber = Math.random() * max;
    return Math.round(randomNumber * Math.pow(10, dec)) / Math.pow(10, dec);
}

function roundNumber(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

export default { getRandomInt, getRandomFloat, roundNumber }