const fs = require('fs');
const axios = require('axios');

const argv = process.argv;
const path = argv[argv.length - 1];
const writeFlagBool = argv[2] === '--out' ? true : false;
let writePath;
if(writeFlagBool) {
    writePath = argv[3];
}

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        else {
            handleOutput(data)
        }
    });
}

async function webCat(url) {
    try {
        response = await axios.get(url);
        handleOutput(response.data)
    }
    catch(error) {
        console.log(error);
    }
}

function handleOutput(data) {
    if (writeFlagBool) {
        try {
            fs.writeFileSync(writePath, data) 
            console.log('Successfully wrote to file!');
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    } else {
        console.log(data);
    }
}

const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
const regex = new RegExp(expression);

if (path.match(regex)) {
    webCat(path);
} else {
    cat(path);
}