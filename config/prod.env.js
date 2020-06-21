'use strict'

const project = require('../config/project').project

// 当前打包环境
let env = '';
let __env = process.argv.filter(item => item.indexOf('--env=') > -1)[0] ? process.argv.filter(item => item.indexOf('--env=') > -1)[0] : ''
env = __env ? __env.replace('--env=', '') : '';
let apiHost_fissile = env == 'pro' ? 'https://fissile.taojiji.com' : 'https://fissile.tjjshop.cn';
let apiHost_api = env == 'pro' ? 'https://api-fissile.taojiji.com' : 'https://api-fissile.tjjshop.cn';
let apiHost_java = env == 'pro' ? 'https://api.taojiji.com' : 'https://api.tjjshop.cn';
let apiHost_apiPhp = env == 'pro' ? 'https://api.taojiji.com' : 'https://api.tjjshop.cn';


let _PAGE = project.page;
let _version = project.version;

console.log('~~~~~~~' + _PAGE)

module.exports = {
    apiHost_fissile: '\"' + apiHost_fissile + '\"',
    apiHost_java: '\"' + apiHost_java + '\"',
    apiHost_api: '\"' + apiHost_api + '\"',
    apiHost_apiPhp: '\"' + apiHost_apiPhp + '\"',
    NODE_ENV: '"production"',
    PAGE: _PAGE ? '\"' + _PAGE + '\"' : '"tjj"',
    VERSION: _version ? '\"' + _version + '\"' : '""',
    RUN_ENV: env ? '\"' + env + '\"' : '""'
}