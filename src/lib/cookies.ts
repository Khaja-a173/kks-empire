
import { cookies } from 'next/headers'
const COOKIE = 'table_session'
export function getTableSession(){
  const c = cookies().get(COOKIE)?.value
  return c ? JSON.parse(c) as { tableId:string, groupId?:string } : null
}
export function setTableSession(v:{ tableId:string, groupId?:string }){
  cookies().set(COOKIE, JSON.stringify(v), { httpOnly:true, secure:true, sameSite:'lax', path:'/' })
}
