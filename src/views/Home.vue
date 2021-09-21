<template>
  <div id="home">
    <div class="navbar">
      <NavBars page="normal" />
    </div>
    <div class="home-center">
      <NavTabs plainText="首頁" />
      <div class="home-center-tweet">
        <TweetCreate
          :current-user="currentUser"
          @after-create-tweet="afterCreateTweet"
        />
      </div>
      <div class="home-center-tweets scrollbar">
        <TweetsLatest :initial-tweets="tweets" />
      </div>
    </div>
    <div class="home-right">
      <Popular />
    </div>
  </div>
</template>

<script>
import NavBars from './../components/NavBars.vue'
import Popular from './../components/Popular.vue'
import NavTabs from '../components/NavTabs.vue'
import TweetsLatest from '@/components/TweetsLatest.vue'
import TweetCreate from '@/components/TweetCreate.vue'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

const dummyUser = {
  id: 2,
  name: 'user1',
  account: '@user1',
  avatar: 'https://loremflickr.com/240/240/?random=44.498223728686305',
  role: 'user',
  cover: 'https://loremflickr.com/720/240/?random=78.80177917119791',
  followerCount: 0,
  followingCount: 0,
  tweetCount: 10,
}

export default {
  components: {
    NavBars,
    NavTabs,
    Popular,
    TweetCreate,
    TweetsLatest,
  },
  data() {
    return {
      tweets: [],
      currentUser: {},
    }
  },
  created() {
    this.fetchTweets()
    this.fetchUser()
    // this.currentUser = dummyUser.currentUser
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await tweetsAPI.getTweets()
        this.tweets = data
      } catch (error) {
         Toast.fire({
          icon: 'error',
          title: '無法取得推文，請稍後再試'
        })
      }
    },
    fetchUser() {
      this.currentUser = {
        id: dummyUser.id,
        avatar: dummyUser.avatar,
      }
    },
    afterCreateTweet(payload) {
      const { tweetId, description } = payload
      this.tweets.push({
        id: tweetId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
        },
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  display: flex;
  max-width: 1245px;
}

.home-center {
  margin: 0 2.5rem;
  flex-grow: 1;
  border-left: 1px solid $popular-border;
  border-right: 1px solid $popular-border;
}

.home-center-tweet {
  width: 100%;
  height: 120px;
}

.home-center-tweets {
  height: 100vh;
  overflow-y: scroll;
}

.scrollbar {
  padding-left: 6px;
  // 整體的樣式
  &::-webkit-scrollbar {
    width: 4px;
  }
  // bar的樣式
  &::-webkit-scrollbar-thumb {
    background-color: $popular-border;
    border-radius: 2px;
  }
}
</style>
