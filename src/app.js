import express, { json } from "express"
import cors from "cors"

const app = express()
app.use(json())
app.use(cors())

const users = []
const tweets = []

app.post("/sign-up", (req, res) => {

  const { username, avatar } = req.body

  if (username === "" || typeof(username) !== "string" || typeof(username) === undefined) {
    return res.status(400).send("Todos os campos são obrigatórios!")
  }

  if (avatar === "" || typeof(avatar) !== "string" || typeof(avatar) === undefined) {
    return res.status(400).send("Todos os campos são obrigatórios!")
  }

  users.push({ username: username, avatar: avatar })
  res.status(201).send("Ok!")
})

app.post("/tweets", (req, res) => {

  const { tweet } = req.body
  const { user } = req.headers

  if(!user || !tweet) return res.status(400).send("Preencha todos os campos!")

  const registeredUser = users.find(u => u.username === user)
        
  if (!registeredUser) return res.status(400).send("UNAUTHORIZED")
        
  tweets.push({ username: user, tweet: tweet })
  res.status(201).send("Ok!")
})

app.get("/tweets", (req, res) => {

  const newTweets = []

  const tenLastTweets = tweets.slice(-10)

  if (tenLastTweets.length === 0) return res.send([])

  for (let i = 0; i < tenLastTweets.length; i++) {

    const singleUser = users.find(user => user.username === tenLastTweets[i].username)
        
    const tweet = {
      username: tenLastTweets[i].username,
      avatar: singleUser.avatar,
      tweet: tenLastTweets[i].tweet
    }

    newTweets.push(tweet)

  }
  res.send(newTweets)
})

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params
  
  const usersTweets = tweets.filter(t => t.username === username)

  if (!usersTweets) {
    return res.send([])
  }

  const usersAvatar = users.find(user => user.username === username)

  for (let i = 0; i < usersTweets.length; i++) {
    
    usersTweets[i] = {
      username: usersTweets[i].username,
      avatar: usersAvatar.avatar,
      tweet: usersTweets[i].tweet
    }
    
  }
  
  res.send(usersTweets)
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server active on port ${PORT}.`))
