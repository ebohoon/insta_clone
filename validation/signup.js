import Joi from "joi"

const usernameRegExp = /^[0-9a-z+]{3,10}/
const passwordRegExp = /^[0-9a-z]{4,10}/

const signUpSchema = Joi.object({
  nickname: Joi.string().regex(usernameRegExp).required(),
  userId: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().regex(passwordRegExp).required(),
  confirmPassword: Joi.string().regex(passwordRegExp).required(),
})

export const validateSignUp = async (req, res, next) => {
  const { nickname, userId, password, confirmPassword } = req.body

  try {
    const value = await signUpSchema.validateAsync({
      nickname,
      userId,
      password,
      confirmPassword,
    })
    console.log(value)
    next()
  } catch (error) {
    console.log(error)
    logger.error(error)
    return res.status(400).send({ message: "양식을 확인하세요." })
  }
}
