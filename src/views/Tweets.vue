<template>
  <div id="tweets">
    <div class="navbar">
      <NavBars page="normal" />
    </div>
    <div class="tweets-center">
      <NavTabs plainText="推文" :isbackArrow="true" />
      <div class="tweets-center-tweet"><TweetDetail :tweet="tweet" /></div>
      <div class="tweets-center-tweets">
        <TweetReply :tweet-replys="tweetReplies" />
      </div>
    </div>
    <div class="tweets-right"><Popular /></div>
  </div>
</template>

<script>
import NavBars from './../components/NavBars.vue'
import NavTabs from '../components/NavTabs.vue'
import Popular from './../components/Popular.vue'
import TweetDetail from '@/components/TweetDetail.vue'
import TweetReply from '@/components/TweetReply.vue'

const dummyData = {
  "id": 1,
  "UserId": 2,
  "description": "Esse porro ea eligendi accusantium impedit.\nSit atque pariatur.\nRerum eius eveniet ea et et qui et aperiam quo.",
  "likeCount": 0,
  "replyCount": 3,
  "createdAt": "2021-09-16T15:18:05.000Z",
  "updatedAt": "2021-09-16T15:18:05.000Z",
  "User": {
    "id": 2,
    "email": "user1@example.com",
    "password": "$2a$10$XPP2bHf8.OPcsIFKmyNvE.e9qhJTbLcX3QMhn6qBQjL5/3qnRNuOy",
    "name": "user1",
    "avatar": "https://loremflickr.com/240/240/?random=68.1438721370927",
    "introduction": "Mol",
    "role": "user",
    "account": "@user1",
    "cover": "https://loremflickr.com/720/240/?random=62.769759987415426",
    "followerCount": 0,
    "followingCount": 0,
    "tweetCount": 10,
    "createdAt": "2021-09-16T15:18:05.000Z",
    "updatedAt": "2021-09-16T15:18:05.000Z"
  },
  "Replies": [
    {
      "id": 1,
      "UserId": 2,
      "TweetId": 1,
      "comment": "Voluptas soluta quas dolorem. Cumque velit magnam. Sed quis est omnis. Consequuntur nisi eos odio. Enim labore nulla adipisci consequatur quia dignissimos natus.",
      "createdAt": "2021-09-16T15:18:05.000Z",
      "updatedAt": "2021-09-16T15:18:05.000Z",
      "User": {
        "id": 2,
        "email": "user1@example.com",
        "password": "$2a$10$XPP2bHf8.OPcsIFKmyNvE.e9qhJTbLcX3QMhn6qBQjL5/3qnRNuOy",
        "name": "user1",
        "avatar": "https://loremflickr.com/240/240/?random=68.1438721370927",
        "introduction": "Mol",
        "role": "user",
        "account": "@user1",
        "cover": "https://loremflickr.com/720/240/?random=62.769759987415426",
        "followerCount": 0,
        "followingCount": 0,
        "tweetCount": 10,
        "createdAt": "2021-09-16T15:18:05.000Z",
        "updatedAt": "2021-09-16T15:18:05.000Z"
      }
    },
    {
      "id": 2,
      "UserId": 3,
      "TweetId": 1,
      "comment": "repellat eligendi sint",
      "createdAt": "2021-09-16T15:18:05.000Z",
      "updatedAt": "2021-09-16T15:18:05.000Z",
      "User": {
        "id": 3,
        "email": "user2@example.com",
        "password": "$2a$10$b8QF13icGV0AZrDRCSwjTuJGwszoDAZdrZ3uJNf6Xhp1bGNR.etTS",
        "name": "user2",
        "avatar": "https://loremflickr.com/240/240/?random=37.071416474837115",
        "introduction": "Tenetur aut nesciunt quia consequatur sapiente.",
        "role": "user",
        "account": "@user2",
        "cover": "https://loremflickr.com/720/240/?random=27.169686095187927",
        "followerCount": 0,
        "followingCount": 0,
        "tweetCount": 10,
        "createdAt": "2021-09-16T15:18:05.000Z",
        "updatedAt": "2021-09-16T15:18:05.000Z"
      }
    },
    {
      "id": 3,
      "UserId": 4,
      "TweetId": 1,
      "comment": "Sunt impedit repudiandae.",
      "createdAt": "2021-09-16T15:18:05.000Z",
      "updatedAt": "2021-09-16T15:18:05.000Z",
      "User": {
        "id": 4,
        "email": "user3@example.com",
        "password": "$2a$10$XT6Yq3eiAKRDKOsKhIsZouGVK.ACvTLtDFTei6PlyqjQFanxQvRhu",
        "name": "user3",
        "avatar": "https://loremflickr.com/240/240/?random=46.76048065047558",
        "introduction": "Quasi sint quam rem repudiandae. Unde earum unde e",
        "role": "user",
        "account": "@user3",
        "cover": "https://loremflickr.com/720/240/?random=88.86538044679429",
        "followerCount": 0,
        "followingCount": 0,
        "tweetCount": 10,
        "createdAt": "2021-09-16T15:18:05.000Z",
        "updatedAt": "2021-09-16T15:18:05.000Z"
      }
    }
  ],
  "isLiked": false
}

export default {
  components: {
    NavBars,
    NavTabs,
    Popular,
    TweetDetail,
    TweetReply,
  },
  data() {
    return {
      tweet: [],
      tweetReplies: [],
    }
  },
  created() {
    this.fetchReplies()
    this.fetchTweet()
  },
  methods: {
    fetchReplies() {
      this.tweetReplies = dummyData.Replies
      // TODO:確認回覆內容傳遞
      const { id, avatar, name, account, createdAt } = dummyData.User
    },
    // TODO: 確認 detail 資料傳入
    fetchTweet() {
      this.tweet = dummyData
    },
  },
}
</script>

<style lang="scss" scoped>
#tweets {
  width: 100%;
  display: flex;
  max-width: 1245px;
}

.tweets-center {
  margin: 0 2.5rem;
  flex-grow: 1;
  border-left: 1px solid $popular-border;
  border-right: 1px solid $popular-border;
}

.tweets-center-tweet {
  width: 100%;
  border-bottom: 1px solid $popular-border;
}
</style>
