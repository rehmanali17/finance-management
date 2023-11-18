const generateRandomAccountNumber = () => {
    const min = 10000000;
    const max = 99999999;
    return String(Math.floor(Math.random() * (max - min + 1) + min));
}

module.exports = { generateRandomAccountNumber }
