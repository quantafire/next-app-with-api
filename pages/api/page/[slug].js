const fs = require('fs')
const { join, dirname, basename, resolve } = require('path')
import YAML from 'yaml'

module.exports = (req, res) => {
    fs.readdir(join(resolve('.')), function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log('file:', file)
        });
    });
    if(fs.existsSync(join(resolve('.'), `data/posts/${req.query.slug}.yml`))) {
        console.log('found')
        fs.readFile( join(resolve('.'), `data/posts/${req.query.slug}.yml`), {encoding: 'utf8'}, (err, data)=>{
            res.json({...YAML.parse(data), type: 'post'})
        } )
    } else
    if(fs.existsSync(join(resolve('.'), `data/page/${req.query.slug}.yml`))) {
        fs.readFile( join(resolve('.'), `data/page/${req.query.slug}.yml`), {encoding: 'utf8'}, (err, data)=>{
            res.json({...YAML.parse(data), type: 'page'})
        } )
    } else {
        res.json({
            done: true,
            found: false,
            resolve: __dirname
        })
    }
}