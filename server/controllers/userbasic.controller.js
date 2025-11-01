import User from '../models/user.model.js'

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body) // expect {name,email,password}
    await user.save()
    return res.status(201).json({ _id: user._id, name: user.name, email: user.email })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}
export const listUsers = async (_req, res) => {
  const users = await User.find({}, { hashed_password: 0, salt: 0 })
  return res.json(users)
}
export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id, { hashed_password: 0, salt: 0 })
  return user ? res.json(user) : res.status(404).json({ error: 'User not found' })
}
export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  return user ? res.json({ message: 'User deleted' }) : res.status(404).json({ error: 'User not found' })
}

export default userBasicController;