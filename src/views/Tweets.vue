<template>
  <div id="tweets">
    <div class="navbar">
      <NavBars page="normal" />
    </div>
    <div class="tweets-center">
      <NavTabs plainText="推文" :isbackArrow="true" />
      <div class="tweets-center-tweet"><TweetDetail :tweet="tweet" /></div>
      <div class="tweets-center-tweets">
        <!-- <TweetReply :tweetReplies="tweetReplies" /> -->
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
// import TweetReply from '@/components/TweetReply.vue'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'

// const dummyData = {
//   id: 1,
//   UserId: 2,
//   description:
//     'Esse porro ea eligendi accusantium impedit.\nSit atque pariatur.\nRerum eius eveniet ea et et qui et aperiam quo.',
//   likeCount: 0,
//   replyCount: 3,
//   createdAt: '2021-09-16T15:18:05.000Z',
//   updatedAt: '2021-09-16T15:18:05.000Z',
//   User: {
//     id: 2,
//     email: 'user1@example.com',
//     password: '$2a$10$XPP2bHf8.OPcsIFKmyNvE.e9qhJTbLcX3QMhn6qBQjL5/3qnRNuOy',
//     name: 'user1',
//     avatar: 'https://loremflickr.com/240/240/?random=68.1438721370927',
//     introduction: 'Mol',
//     role: 'user',
//     account: '@user1',
//     cover: 'https://loremflickr.com/720/240/?random=62.769759987415426',
//     followerCount: 0,
//     followingCount: 0,
//     tweetCount: 10,
//     createdAt: '2021-09-16T15:18:05.000Z',
//     updatedAt: '2021-09-16T15:18:05.000Z',
//   },
//   Replies: [
//     {
//       id: 1,
//       UserId: 2,
//       TweetId: 1,
//       comment:
//         'Voluptas soluta quas dolorem. Cumque velit magnam. Sed quis est omnis. Consequuntur nisi eos odio. Enim labore nulla adipisci consequatur quia dignissimos natus.',
//       createdAt: '2021-09-16T15:18:05.000Z',
//       updatedAt: '2021-09-16T15:18:05.000Z',
//       User: {
//         id: 2,
//         email: 'user1@example.com',
//         password:
//           '$2a$10$XPP2bHf8.OPcsIFKmyNvE.e9qhJTbLcX3QMhn6qBQjL5/3qnRNuOy',
//         name: 'user1',
//         avatar: 'https://loremflickr.com/240/240/?random=68.1438721370927',
//         introduction: 'Mol',
//         role: 'user',
//         account: '@user1',
//         cover: 'https://loremflickr.com/720/240/?random=62.769759987415426',
//         followerCount: 0,
//         followingCount: 0,
//         tweetCount: 10,
//         createdAt: '2021-09-16T15:18:05.000Z',
//         updatedAt: '2021-09-16T15:18:05.000Z',
//       },
//     },
//     {
//       id: 2,
//       UserId: 3,
//       TweetId: 1,
//       comment: 'repellat eligendi sint',
//       createdAt: '2021-09-16T15:18:05.000Z',
//       updatedAt: '2021-09-16T15:18:05.000Z',
//       User: {
//         id: 3,
//         email: 'user2@example.com',
//         password:
//           '$2a$10$b8QF13icGV0AZrDRCSwjTuJGwszoDAZdrZ3uJNf6Xhp1bGNR.etTS',
//         name: 'user2',
//         avatar: 'https://loremflickr.com/240/240/?random=37.071416474837115',
//         introduction: 'Tenetur aut nesciunt quia consequatur sapiente.',
//         role: 'user',
//         account: '@user2',
//         cover: 'https://loremflickr.com/720/240/?random=27.169686095187927',
//         followerCount: 0,
//         followingCount: 0,
//         tweetCount: 10,
//         createdAt: '2021-09-16T15:18:05.000Z',
//         updatedAt: '2021-09-16T15:18:05.000Z',
//       },
//     },
//     {
//       id: 3,
//       UserId: 4,
//       TweetId: 1,
//       comment: 'Sunt impedit repudiandae.',
//       createdAt: '2021-09-16T15:18:05.000Z',
//       updatedAt: '2021-09-16T15:18:05.000Z',
//       User: {
//         id: 4,
//         email: 'user3@example.com',
//         password:
//           '$2a$10$XT6Yq3eiAKRDKOsKhIsZouGVK.ACvTLtDFTei6PlyqjQFanxQvRhu',
//         name: 'user3',
//         avatar: 'https://loremflickr.com/240/240/?random=46.76048065047558',
//         introduction: 'Quasi sint quam rem repudiandae. Unde earum unde e',
//         role: 'user',
//         account: '@user3',
//         cover: 'https://loremflickr.com/720/240/?random=88.86538044679429',
//         followerCount: 0,
//         followingCount: 0,
//         tweetCount: 10,
//         createdAt: '2021-09-16T15:18:05.000Z',
//         updatedAt: '2021-09-16T15:18:05.000Z',
//       },
//     },
//   ],
//   isLiked: false,
// }

const dummyReply = [
  {
    id: 165,
    UserId: 35,
    TweetId: 55,
    comment: 'Sunt labore illum perspiciatis aut doloribus sapiente.',
    createdAt: '2021-09-20T05:07:00.000Z',
    updatedAt: '2021-09-20T05:07:00.000Z',
    User: {
      id: 35,
      email: 'user3@example.com',
      password: '$2a$10$VqbmrgPkcbv1DltF3cvQIuDQBjW1x6bPdc2vFlfI3wmPfpdaPsOMu',
      name: 'user3',
      avatar: 'https://loremflickr.com/240/240/?random=53.377647020413235',
      introduction:
        'Quis sed dolore enim fuga eligendi est harum et. Quod eveniet inventore maiores et nihil.',
      role: 'user',
      account: '@user3',
      cover: 'https://loremflickr.com/720/240/?random=84.99804545220988',
      followerCount: 0,
      followingCount: 0,
      tweetCount: 10,
      createdAt: '2021-09-20T05:07:00.000Z',
      updatedAt: '2021-09-20T05:07:00.000Z',
    },
    Tweet: {
      id: 55,
      UserId: 15,
      description:
        'Dolor consequatur deleniti voluptatem error veritatis voluptatem quia odio fugit.',
      likeCount: 0,
      replyCount: 3,
      createdAt: '2021-09-20T05:07:00.000Z',
      updatedAt: '2021-09-20T05:07:00.000Z',
      User: {
        id: 15,
        email: 'user1@example.com',
        password:
          '$2a$10$eBtimGM2kL8XrouMeBeh9eDxtkNtD1SN7qXZruZK1Kfvlk9NRCuPO',
        name: 'user1',
        avatar: 'https://loremflickr.com/240/240/?random=40.25375496369363',
        introduction: 'Corporis est consequuntur tempora unde quia porro sunt.',
        role: 'user',
        account: '@user1',
        cover: 'https://loremflickr.com/720/240/?random=75.08093891164478',
        followerCount: 0,
        followingCount: 0,
        tweetCount: 10,
        createdAt: '2021-09-20T05:07:00.000Z',
        updatedAt: '2021-09-20T05:07:00.000Z',
      },
    },
  },
  {
    id: 175,
    UserId: 35,
    TweetId: 55,
    comment: 'Pariatur dolores commodi vel.',
    createdAt: '2021-09-20T05:07:00.000Z',
    updatedAt: '2021-09-20T05:07:00.000Z',
    User: {
      id: 35,
      email: 'user3@example.com',
      password: '$2a$10$VqbmrgPkcbv1DltF3cvQIuDQBjW1x6bPdc2vFlfI3wmPfpdaPsOMu',
      name: 'user3',
      avatar: 'https://loremflickr.com/240/240/?random=53.377647020413235',
      introduction:
        'Quis sed dolore enim fuga eligendi est harum et. Quod eveniet inventore maiores et nihil.',
      role: 'user',
      account: '@user3',
      cover: 'https://loremflickr.com/720/240/?random=84.99804545220988',
      followerCount: 0,
      followingCount: 0,
      tweetCount: 10,
      createdAt: '2021-09-20T05:07:00.000Z',
      updatedAt: '2021-09-20T05:07:00.000Z',
    },
    Tweet: {
      id: 55,
      UserId: 15,
      description:
        'Dolor consequatur deleniti voluptatem error veritatis voluptatem quia odio fugit.',
      likeCount: 0,
      replyCount: 3,
      createdAt: '2021-09-20T05:07:00.000Z',
      updatedAt: '2021-09-20T05:07:00.000Z',
      User: {
        id: 15,
        email: 'user1@example.com',
        password:
          '$2a$10$eBtimGM2kL8XrouMeBeh9eDxtkNtD1SN7qXZruZK1Kfvlk9NRCuPO',
        name: 'user1',
        avatar: 'https://loremflickr.com/240/240/?random=40.25375496369363',
        introduction: 'Corporis est consequuntur tempora unde quia porro sunt.',
        role: 'user',
        account: '@user1',
        cover: 'https://loremflickr.com/720/240/?random=75.08093891164478',
        followerCount: 0,
        followingCount: 0,
        tweetCount: 10,
        createdAt: '2021-09-20T05:07:00.000Z',
        updatedAt: '2021-09-20T05:07:00.000Z',
      },
    },
  },
  {
    id: 155,
    UserId: 45,
    TweetId: 55,
    comment: 'et eaque id',
    createdAt: '2021-09-20T05:07:00.000Z',
    updatedAt: '2021-09-20T05:07:00.000Z',
    User: {
      id: 45,
      email: 'user4@example.com',
      password: '$2a$10$QkhKLuvNE0pGrWWA5tVd3eRzyYvH82Gxm1mu9YHpvTBVRa8oJuAJm',
      name: 'user4',
      avatar: 'https://loremflickr.com/240/240/?random=91.70236270872843',
      introduction:
        'Itaque suscipit autem officiis et. Ullam voluptatum voluptate et esse eaque dignissimos dolores dolor. Quo ducimus optio ut ipsum pariatur dicta laborum. Dolore',
      role: 'user',
      account: '@user4',
      cover: 'https://loremflickr.com/720/240/?random=18.725205804644986',
      followerCount: 0,
      followingCount: 0,
      tweetCount: 10,
      createdAt: '2021-09-20T05:07:00.000Z',
      updatedAt: '2021-09-20T05:07:00.000Z',
    },
    Tweet: {
      id: 55,
      UserId: 15,
      description:
        'Dolor consequatur deleniti voluptatem error veritatis voluptatem quia odio fugit.',
      likeCount: 0,
      replyCount: 3,
      createdAt: '2021-09-20T05:07:00.000Z',
      updatedAt: '2021-09-20T05:07:00.000Z',
      User: {
        id: 15,
        email: 'user1@example.com',
        password:
          '$2a$10$eBtimGM2kL8XrouMeBeh9eDxtkNtD1SN7qXZruZK1Kfvlk9NRCuPO',
        name: 'user1',
        avatar: 'https://loremflickr.com/240/240/?random=40.25375496369363',
        introduction: 'Corporis est consequuntur tempora unde quia porro sunt.',
        role: 'user',
        account: '@user1',
        cover: 'https://loremflickr.com/720/240/?random=75.08093891164478',
        followerCount: 0,
        followingCount: 0,
        tweetCount: 10,
        createdAt: '2021-09-20T05:07:00.000Z',
        updatedAt: '2021-09-20T05:07:00.000Z',
      },
    },
  },
]

export default {
  components: {
    NavBars,
    NavTabs,
    Popular,
    TweetDetail,
    // TweetReply,
  },
  data() {
    return {
      tweet: {},
      tweetReplies: {},
      
    }
  },
  created() {
    this.fetchReplies()
    this.fetchTweet(this.$route.params.id)
  },
  methods: {
    fetchReplies() {
      this.tweetReplies = dummyReply
      // TODO:確認回覆內容傳遞
    },
    async fetchTweet(tweet_id) {
      try {
        const { data } = await tweetsAPI.getTweetDetail(tweet_id)

        this.tweet = data

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: '成功取得推文',
        })
      } catch (error) {

        this.$router.push('/')
        // Toast.fire({
        //   icon: 'error',
        //   title: '無法取得推文，請稍後再試',
        // })
      }
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
