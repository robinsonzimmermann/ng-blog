const fs = require('fs');
const path = require('path');
const { readingTime } = require('reading-time-estimator');

function scanDirectory(directoryPath, filesArray) {
    const files = fs.readdirSync(directoryPath);

    files.forEach(async (file) => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Recursively scan subdirectories
            scanDirectory(filePath, filesArray);
        } else if (file === 'meta.json') {
            // If the file is named "meta.json", read its content and add it to the array
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const jsonObject = JSON.parse(fileContent);

            const markdownContent = fs.readFileSync(`${directoryPath}/post.md`, 'utf8');

            jsonObject.readingTime = readingTime(markdownContent, 238).text;


            filesArray.push(jsonObject);
        }
    });

    // Sort the array based on the "date" field
    filesArray.sort((a, b) => a.date ? new Date(b.date) - new Date(a.date) : -1);
}

function main() {
    const startDirectory = 'content/posts'; // Change this to the starting directory path
    const outputFilePath = 'content/posts/meta.json'; // Change this to the desired output file path

    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }

    const filesArray = [];
    scanDirectory(startDirectory, filesArray);

    // Write the sorted array to the output file
    const outputContent = JSON.stringify(filesArray);
    fs.writeFileSync(outputFilePath, outputContent, 'utf8');

    console.log(`Scanning completed. Output written to ${outputFilePath}`);
}

main();

function loadEsmModule(modulePath) {
return new Function('modulePath', `return import(modulePath);`)(modulePath);
}
