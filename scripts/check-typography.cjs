const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),box={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,'lib/typography.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,box);
const {glueShortWords:t}=box.exports;
const cases=[
 ['Печати в Новосибирске','Печати в\u00a0Новосибирске'],
 ['И в работе, и на выезде.','И\u00a0в\u00a0работе, и\u00a0на\u00a0выезде.'],
 ['Для вас скидка!','Для\u00a0вас скидка!'],
 ['Из-за срочности','Из-за\u00a0срочности'],
 ['по\nмакету','по\u00a0макету'],
 ['От печати до маркетинга','От\u00a0печати до\u00a0маркетинга'],
 ['Оплата — по согласованию','Оплата — по\u00a0согласованию'],
 ['«В офисе»','«В\u00a0офисе»'],
 ['(с доставкой)','(с\u00a0доставкой)'],
 ['Согласен на ','Согласен на\u00a0'],
 ['30 минут','30 минут'],
 ['COLOP — 2 500 ₽','COLOP — 2 500 ₽'],
 ['brandboxy@mail.ru','brandboxy@mail.ru'],
 ['https://brandbox.pages.dev/','https://brandbox.pages.dev/'],
 ['Отлично','Отлично'],
 ['Печати на\u00a0заказ','Печати на\u00a0заказ']
];
for(const [input,expected]of cases){assert.equal(t(input),expected);assert.equal(t(t(input)),expected)}
console.log(JSON.stringify({typography_checks:cases.length*2,status:'passed',scope:'Russian word boundaries, chains, punctuation, line breaks and idempotency'}));
