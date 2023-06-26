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
        res.send({message: "UNAUTHORIZED"})
        return
    }*/

    tweets.push({username: req.body.username, tweet: req.body.tweet})
    res.send("Ok!")
})

app.get("/tweets", (req, res) => {

    console.log(req)

    const tweet = {
        username: "bobesponja",
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
        tweet: "Eu amo hambúrguer de siri!"
    }

    if (req.tenLastTweets === undefined) {
        res.send([])
        return
    }

    const tenLastTweets = tweets.slice(tweets.legth - 10, tweets.length)
    res.send(tenLastTweets)

})

const PORT = 5000
app.listen(PORT, () => console.log(`Server active on port ${PORT}.`) )