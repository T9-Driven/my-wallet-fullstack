import { transactionsCollection } from '../database/db.js'

export async function createTransaction(req, res) {
  const transaction = res.locals.transaction

  try {
    await transactionsCollection.insertOne(transaction)
    res.status(201).send("Transação efetuada com sucesso")
  } catch (error) {
    console.error(error)
    res.status(500).send("Houve um problema no servidor")
  }

}

export async function findTransactions(req, res) {
  const user = res.locals.user

  try {
    const transactions = await transactionsCollection.find({ user: user._id }).toArray()

    delete user.password

    res.send({ transactions, user })
  } catch (error) {
    console.error(error)
    res.status(500).send("Houve um problema no servidor")
  }

}