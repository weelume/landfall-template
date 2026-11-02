/** 仅开发环境记录必要状态，不输出姓名、邮箱、留言或其他表单内容。 */
export function debugEvent(event:string,context:Record<string,string|number|boolean>):void{if(process.env.NODE_ENV!=='production')console.debug('[landfall]',event,context)}
