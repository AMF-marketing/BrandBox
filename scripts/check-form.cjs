const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=require('node:path').resolve(__dirname,'..');
const ts=require(root+'/node_modules/typescript');
const code=ts.transpileModule(fs.readFileSync(root+'/lib/order-validation.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const sandbox={exports:{}};vm.runInNewContext(code,sandbox);const {formatPhone,validateContact}=sandbox.exports;
let checks=0;function eq(actual,expected){assert.equal(actual,expected);checks++}
for(const raw of ['89131234567','79131234567','9131234567','+7 (913) 123-45-67'])eq(formatPhone(raw),'+7 (913) 123-45-67');
eq(formatPhone(''),'');eq(formatPhone('abc'),'');eq(formatPhone('+7 (913) 123-45-6'),'+7 (913) 123-45-6');
let typed='';for(const char of '79131234567')typed=formatPhone(typed+char);eq(typed,'+7 (913) 123-45-67');
eq(validateContact('Анна','+7 (913) 123-45-67',true),'');
assert.ok(validateContact(' ','+7 (913) 123-45-67',true));checks++;
assert.ok(validateContact('Анна','+7 (913) 123-45-6',true));checks++;
assert.ok(validateContact('Анна','+7 (913) 123-45-67',false));checks++;
assert.ok(validateContact('Анна','+1 (913) 123-45-67',true));checks++;
assert.ok(validateContact('Анна','+7 (000) 000-00-00',true));checks++;
console.log(JSON.stringify({form_regression_checks:checks,status:'passed'}));
