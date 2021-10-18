import jwt from "jsonwebtoken"
export const SECRET_KEY = "hanghae-8"

export const jwtToken = (id) => {
  const token = jwt.sign({ userId: id }, SECRET_KEY)
  return token
}
