const fs = require("fs");
const path = require('path');

const ignore = /(^\.)|(node)/;
const name = '-L3501B1091';

const log = console.log.bind(console);

function error(err) {
    if (err) {
        return console.error(err);
    }
}
const root = __dirname;
const test = path.resolve(root,'chapter3');
log(test);
folder(root);
function folder(folderName) {
    fs.readdir(folderName, function (err, files) {
        error(err);
        files.forEach(function (file) {
            fs.stat(path.resolve(folderName,file), function (err, stats) {
                error(err);
                if (!stats || ignore.test(file)) return;
                let filename = path.resolve(folderName,file);
                if (stats.isDirectory()) {
                    return folder(filename);
                } else if(stats.isFile() && file.includes(name)){
                    return wrirteDelete(filename);
                }
            })
        });
    });
}

function wrirteDelete(path) {
    let changeFile = path.replace(name,'');
    fs.readFile(path, function (err, data) {
        error(err);
        fs.unlink(path, function () {
            log('删除了',path);
        })
        fs.writeFile(changeFile, data, function (err) {
            error(err);
        })
    });
}