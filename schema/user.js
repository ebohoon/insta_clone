const { Schema } = mongoose
const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    min: 4,
  },

  nickname: {
    type: String,
    required: true,
    unique: true,
    min: 3,
  },
})

export default mongoose.model("User", userSchema)
