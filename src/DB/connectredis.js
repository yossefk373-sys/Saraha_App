import { createClient } from "redis"
import { URL_REDIS } from "../config/config.js";

export const client = createClient({
  url: URL_REDIS
});

export const connectredis=async()=>{
     try {
        await client.connect()
        console.log("Redis connect success 🌹 ");
        
    } catch (error) {
        console.log("Redis failed connect ✖✖   ", error);
        
    }
}