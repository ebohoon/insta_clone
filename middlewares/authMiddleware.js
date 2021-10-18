import { SECRET_KEY } from "../library/JWT.js"
import User from "../schema/user.js"
import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers

  // 로그인 안 하면 authorization 없음
  if (!authorization) return res.status(400).send()

  const [tokenType, tokenValue] = authorization.split(" ")
  if (tokenType !== "Bearer") {
    logger.error("로그인 후 사용하세요")
    return res.status(400).send({ msg: "로그인 후 사용하세요." })
  }

  try {
    const { nickname } = jwt.verify(tokenValue, SECRET_KEY)
    const user = await User.findOne(nickname)
    req.user = user
    next()
  } catch (error) {
    logger.error("로그인이 필요한 기능입니다!")
    return res.status(400).send({ msg: "로그인이 필요한 기능입니다!" })
  }
}
