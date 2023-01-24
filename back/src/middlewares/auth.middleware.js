import { userSchema } from '../schema/user.schema.js'
import { usersCollection, sessionsCollection } from '../database/db.js'
import bcrypt from 'bcrypt'

export async function userSchemaValidation(req, res, next) {
  const user = req.body

  const { error } = userSchema.validate(user, { abortEarly: false })

  if (error) {
    const errorsMessage = error.details.map(detail => detail.message)
    return res.status(400).send(errorsMessage)
  }

  const checkUser = await usersCollection.findOne({ email: user.email })
  if (checkUser) return res.status(409).send('Esse usuário já existe')

  res.locals.user = user

  next()

}

export async function signInBodyValidation(req, res, next) {
  const { email, password } = req.body

  try {
    const user = await usersCollection.findOne({ email })

    if (!user) return res.status(401).send('Não autorizado')

    const passwordIsOk = bcrypt.compareSync(password, user.password)

    if (!passwordIsOk) return res.status(401).send('Não autorizado')

    res.locals.user = user
  } catch (error) {
    console.error(error)
    res.status(500).send('Houve um problema no servidor')
  }

  next()
}

export async function authRoutesValidation(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")

  if (!token) return res.status(401).send("Não autorizado")

  try {
    const session = await sessionsCollection.findOne({ token })
    if (!session) return res.status(401).send("Não autorizado")

    const user = await usersCollection.findOne({ _id: session.userId })

    if (!user) return res.status(401).send("Não autorizado")

    res.locals.user = user

  } catch (error) {
    console.erro(error)
    res.status(500).send("Houve um problema no servidor")
  }

  next()

}