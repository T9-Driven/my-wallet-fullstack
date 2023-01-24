import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URL)

try {
  await mongoClient.connect()
  console.log('Conectou com o mongoDB')
} catch (error) {
  console.error(error)
}

const db = mongoClient.db()

export const usersCollection = db.collection('users')
export const sessionsCollection = db.collection('sessions')
export const transactionsCollection = db.collection('transactions')