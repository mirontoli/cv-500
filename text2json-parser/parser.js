
const fs = require('fs');

fs.readFile('./data.txt', 'utf8',  (err, data) => {
  if (err) throw err;
  let resultJSON = {};
  const array = data.toString().split("\r\n");
  if (array.length) {
    array.forEach((row, index) => {
        const tempRow = row.trim().split(":");
        if (tempRow.length) {
          const tempExample = tempRow[3].split(';');
          const tempJSON = {};
          tempJSON.term = tempRow[0];
          tempJSON.transcription = tempRow[1];
          tempJSON.translation = tempRow[2];
          if (tempExample.length) {
            const parsedExamples = tempExample.map(item => {
              const example = item.trim().split(' - ');
              return {
                cv: typeof(example[0]) === 'string' ? example[0].trim() : example[0],
                ru: typeof(example[1]) === 'string' ? example[1].trim() : example[1]
              };
            });
            tempJSON.examples = parsedExamples;
          } else {
            tempJSON.examples = tempRow[3];
          }
          resultJSON[index] = tempJSON;
        }
    });
  }
  fs.writeFile('./output.json', JSON.stringify(resultJSON), error => {
    if (error) throw error;
  }); 
});