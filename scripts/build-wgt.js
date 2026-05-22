#!/usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var root = path.resolve(__dirname, '..');
var dist = path.join(root, 'dist');
var out = path.join(dist, 'TIZEN6.TuHiNsIPTV-1.0.wgt');
if (!fs.existsSync(dist)) { fs.mkdirSync(dist); }
if (fs.existsSync(out)) { fs.unlinkSync(out); }
cp.execSync('cd "' + root + '" && zip -r "' + out + '" . -x "dist/*" "*.git*"', { stdio: 'inherit' });
console.log('Built:', out);
