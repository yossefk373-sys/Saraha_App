import { client } from "../connectredis.js"
/*    Setvalue   */
export const Setvalue=async({key,value,ttl}={})=>{
    try {
        value = typeof value== "string" ? value : JSON.stringify(value)
        ttl?await client.set(key,value,{EX:ttl})
        :await client.set(key,value)
        
    } catch (error) {
        console.log(error,"fail to set value ✖✖");
        
    }
}

/*    Update    */
export const Update=async({key,value,ttl}={})=>{
    try {
        if(!await client.exists(key))return 0
        await client.set(key,value,{EX:ttl})
    } catch (error) {
        console.log(error,"fail to update value ✖✖");
        
    }
}

/*    Getvalue   */
export const Getvalue=async({key})=>{
    try {
        try {
            return JSON.parse(await client.get(key))
        } catch (error) {
        return  await client.get(key)
        }
    } catch (error) {
        console.log(error,"fail to get value ✖✖");
        
    }
}

/*    ttl   */
export const ttl=async(key)=>{
    try {
     return   await client.ttl(key)
    } catch (error) {
        console.log(error,"fail to ttl value ✖✖");
        
    }
}

/*    Exists   */
export const Exists=async(key)=>{
    try {
       return await client.exists(key)
    } catch (error) {
        console.log(error,"fail to exists value ✖✖");
        
    }
}

/*    Expires   */
export const Expires=async({key,ttl})=>{
    try {
       return await client.expire(key,ttl)
    } catch (error) {
        console.log(error,"fail to expire value ✖✖");
        
    }
}

/*    delete-key   */
export const Deletevlue=async(key)=>{
    try {
      return  await client.del(key)
    } catch (error) {
        console.log(error,"fail to delete value ✖✖");
        
    }
}

/*    keys   */
export const keys=async(key)=>{
    try {
        return await client.keys(`${key}*`)
    } catch (error) {
        console.log(error,"fail to keys value ✖✖");
        
    }
}

/*    increment   */
export const incr=async(key)=>{
    try {
        return await client.incr(key)
    } catch (error) {
        console.log(error,"fail to incr value ✖✖");
        
    }
}


