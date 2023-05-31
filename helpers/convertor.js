const fs = require("fs");
require("dotenv").config();
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const path = require("path");

function isOGGFile(oggFilename) {
    const ext = path.extname(oggFilename);
    return ext === ".ogg";
}

/**
 * 
 * @param {String} oggFilename 
 * @returns {Promise<string>}
 */
function convertOGGToMp3(oggFilename) {
    return new Promise((resolve, reject) => {
        if (!isOGGFile(oggFilename)) {
            throw new Error(`Not a ogg file`);
        }
        const outputFile = oggFilename.replace(".ogg", ".mp3");
        ffmpeg({
            source: oggFilename,
        }).on("error", (err) => {
            reject(err);
        }).on("end", () => {
            resolve(outputFile);
        }).save(outputFile);
    });
}

module.exports = {
    convertOGGToMp3,
    isOGGFile
}