// webpack-dev-server --inline --progress --config build/webpack.dev.conf.js
const fs = require('fs');

// 活动类型
let pageEnv = process.argv.filter(item => item.indexOf('page=') > -1)[0] ? process.argv.filter(item => item.indexOf('page=') > -1)[0] : ''
let monthEnv = process.argv.filter(item => item.indexOf('month=') > -1)[0] ? process.argv.filter(item => item.indexOf('month=') > -1)[0] : ''
let _PAGE = pageEnv.replace('page=','');
let _MONTH = monthEnv.replace('month=','');


// 写入变量
fs.writeFileSync('./config/project.js', `exports.project = {page: '${_PAGE}', month: '${_MONTH}'}`);
// exports.name = '${_PAGE}'

let exec = require('child_process').execSync;

exec('webpack-dev-server --inline --progress --config build/webpack.dev.conf.js', {stdio: 'inherit'});