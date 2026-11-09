'use client';
import {useEffect} from 'react';
import {glueShortWords} from '@/lib/typography';

/** Text-node-only enhancement: no wrappers, no HTML replacement, no edits to inputs or data. */
export function Typography(){
  useEffect(()=>{
    const excluded='script,style,noscript,svg,textarea,input,select,option,pre,code,[contenteditable],[data-typography="off"]';
    const format=(node:Node)=>{
      if(node.nodeType===Node.TEXT_NODE){
        const text=node as Text;
        if(!text.parentElement||text.parentElement.closest(excluded)||!/[а-яё]/i.test(text.data))return;
        const next=glueShortWords(text.data);if(next!==text.data)text.data=next;
      }else if(node.nodeType===Node.ELEMENT_NODE){
        const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);
        let text:Node|null;while((text=walker.nextNode()))format(text);
      }
    };
    format(document.body);
    const observer=new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')format(record.target);else for(const node of record.addedNodes)format(node)}});
    observer.observe(document.body,{childList:true,subtree:true,characterData:true});
    return()=>observer.disconnect();
  },[]);
  return null;
}
