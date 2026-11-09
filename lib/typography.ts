/** Keep short Russian function words with the following word without changing meaning. */
const words='в|во|на|над|под|с|со|к|ко|о|об|обо|у|из|изо|от|до|по|за|для|без|при|про|перед|через|между|ради|вне|около|после|помимо|сквозь|среди|возле|вдоль|вместо|вокруг|из-за|из-под|и|а|но|или|не';
const shortWord=new RegExp('(^|[\\s(«„“])('+words+')[ \\t\\r\\n]+(?=\\S|$)','giu');
export function glueShortWords(value:string):string{
  let result=value;
  for(;;){const next=result.replace(shortWord,'$1$2\u00a0');if(next===result)return result;result=next}
}
