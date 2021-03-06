import Redis from 'ioredis'
import { promisify } from 'util'

const redisClient = new Redis()

function getRedis (value: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)
  return syncRedisGet(value)
}

function setRedis (key: string, value: string) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient)
  return syncRedisSet(key, value, 'EX', 300) // Cache expires in 5 minutes
}

export { redisClient, getRedis, setRedis }
