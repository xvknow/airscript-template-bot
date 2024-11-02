const chalk = require('chalk');

function gradientCristal(text) {
    const color1 = [128, 0, 128];
    const color2 = [65, 105, 225];

    const length = text.length;
    const gradientArray = [];

    for (let i = 0; i < length; i++) {
        const ratio = i / (length - 1);
        const red = Math.round(color1[0] * (1 - ratio) + color2[0] * ratio);
        const green = Math.round(color1[1] * (1 - ratio) + color2[1] * ratio);
        const blue = Math.round(color1[2] * (1 - ratio) + color2[2] * ratio);

        gradientArray.push(chalk.rgb(red, green, blue)(text[i]));
    }

    return gradientArray.join('');
}

function gradientLogin(text) {
    const color1 = [144, 238, 144];
    const color2 = [0, 128, 0];

    const length = text.length;
    const gradientArray = [];

    for (let i = 0; i < length; i++) {
        const ratio = i / (length - 1);
        let red, green, blue;

        if (i < length / 2) {
            const ratioToDarkGreen = i / (length / 2);
            red = Math.round(color1[0] * (1 - ratioToDarkGreen) + color2[0] * ratioToDarkGreen);
            green = Math.round(color1[1] * (1 - ratioToDarkGreen) + color2[1] * ratioToDarkGreen);
            blue = Math.round(color1[2] * (1 - ratioToDarkGreen) + color2[2] * ratioToDarkGreen);
        } else {
            red = color2[0];
            green = color2[1];
            blue = color2[2];
        }

        gradientArray.push(chalk.rgb(red, green, blue)(text[i]));
    }

    return gradientArray.join('');
}

module.exports = { gradientCristal, gradientLogin };