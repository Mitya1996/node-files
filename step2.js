const fs = require('fs');
const axios = require('axios');

const argv = process.argv;
const path = argv[2];

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        else {
            console.log(data);
        }
    });
}

async function webCat(url) {
    try {
        response = await axios.get(url);
        console.log(response.data)
    }
    catch(error) {
        console.log(error);
    }
}

const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
const regex = new RegExp(expression);

if (path.match(regex)) {
    webCat(path);
} else {
    cat(path);
}