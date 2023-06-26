import express, { json } from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(json())

const users = []
const tweets = []

app.post("/sign-up", (req, res) => {
    users.push({ username: req.body.username, avatar: req.body.avatar})
    res.send("Ok!")
})

app.post("/tweets", (req, res) => {

    /* if (usuário não estiver cadastrado = se username não estiver em [users]) = {
        res.send("UNAUTHORIZED")
        return
    }*/

    /* tweets.push({username: req.body.username, tweet: req.body.tweet}) */
    res.send("Ok!")
})

app.get("/tweets", (req, res) => {

    const singleUser = users.find((user) => {user.username === username.tweets})

    console.log()

    const tweet = {
        username: users.username,
        avatar: singleUser.avatar,
        tweet: tweets.tweet
    }

    tweets.push(tweet)

    /* console.log(tweet) */

    /* const tenLastTweets = tweets.slice(tweets.legth - 10, tweets.length)

    if (req.tenLastTweets === undefined) {
        res.send([])
        return
    }

    res.send(tenLastTweets) */
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server active on port ${PORT}.`) )