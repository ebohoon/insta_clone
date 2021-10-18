import User from "../schema/user.js"
import bcrypt from "bcrypt"
import { jwtToken } from "../library/JWT.js"

export const signup = async (req, res) => {
  const { nickname, userId, password, confirmPassword } = req.body

  if (password !== confirmPassword)
    return res.status(400).send({ result: "failure", msg: "비밀번호가 일치하지 않습니다." })

  try {
    console.log(nick, email)
    const isExisting = await User.find({ $or: [{ nickname }, { userId }] })
    if (isExisting.length)
      return res.status(400).send({
        result: "failure",
        msg: "이미 가입한 닉네임 또는 이메일이 있습니다.",
      })

    const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = {
      nickname,
      userId,
      password: hashedPassword,
    }

    await User.create(newUser)

    return res.status(200).send({ result: "success", msg: "회원가입에 성공하였습니다." })
  } catch (error) {
    return res.status(400).send({ result: "failure", msg: "DB 정보 조회 실패" })
  }
}

export const auth = async (req, res) => {
  const { userId, password } = req.body

  const user = await User.findOne({ userId })
  if (!user)
    return res.status(400).send({ result: "falure", msg: "아이디 혹은 비밀번호가 틀립니다" })

  const isPwMatched = await bcrypt.compare(password, user.password)

  if (!isPwMatched)
    return res.status(400).send({ result: "failure", msg: "아이디 혹은 비밀번호가 틀립니다." })
  const { userId } = user
  const token = jwtToken(userId)
  return res.status(200).send({ result: "success", msg: "로그인 완료", token })
}
