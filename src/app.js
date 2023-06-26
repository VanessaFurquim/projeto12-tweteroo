import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  users.push({ username: req.body.username, avatar: req.body.avatar });
  res.send("Ok!");
});

app.post("/tweets", (req, res) => {

        const registeredUser = users.find(
            user => user.username === req.body.username
        )
        
        if (registeredUser === undefined) {
        res.send("UNAUTHORIZED")
        return
    }

  tweets.push({ username: req.body.username, tweet: req.body.tweet });
  res.send("Ok!");
});

app.get("/tweets", (req, res) => {

    const newTweets = [];

    const tenLastTweets = tweets.slice(-10)

    if (tenLastTweets.length === 0) {
        res.send([])
        return
    }

    for (let i = 0; i < tenLastTweets.length; i++) {

        const singleUser = users.find((user) => user.username === tenLastTweets[i].username)
        
        const tweet = {
            username: tenLastTweets[i].username,
            avatar: singleUser.avatar,
            tweet: tenLastTweets[i].tweet
        }

        newTweets.push(tweet)

    }
  res.send(newTweets)
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server active on port ${PORT}.`));
