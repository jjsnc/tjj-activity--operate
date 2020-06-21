'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const project = require('../config/project').project
let _PAGE = project.page;
let _version = project.version;
let apiHost_fissile = '/apiFissileHost';
let apiHost_api = '/apiFissileHost';
let apiHost_java = '/apiJavaHost';
let apiHost_apiPhp = '/apiJavaHost';


module.exports = merge(prodEnv, {
    apiHost_fissile: '\"' + apiHost_fissile + '\"',
    apiHost_java: '\"' + apiHost_java + '\"',
    apiHost_api: '\"' + apiHost_api + '\"',
    apiHost_apiPhp: '\"' + apiHost_apiPhp + '\"',
    API_HOST: '"https://testfissile.taojiji.com"',
    NODE_ENV: '"development"',
    PAGE: _PAGE ? '\"' + _PAGE + '\"' : '"tjj"',
    VERSION: _version ? '\"'+_version+'\"' : '""',
    RUN_ENV: '"dev"'
})