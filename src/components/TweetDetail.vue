<template>
  <div id="tweetdetail" v-if="Object.keys(tweet).length !== 0">
    <div class="tweet-header">
      <router-link :to="{ name: 'profile', params: { id: tweet.UserId } }">
        <img :src="tweet.User.avatar" alt="avatar" />
      </router-link>
      <div class="user-detail">
        <router-link :to="{ name: 'profile', params: { id: tweet.UserId } }">
          <span class="user-name">{{ tweet.User.name }}</span></router-link
        >
        <router-link :to="{ name: 'profile', params: { id: tweet.UserId } }">
          <span class="user-account">{{
            tweet.User.account
          }}</span></router-link
        >
      </div>
    </div>
    <div class="tweet-text">
      {{ tweet.description }}
    </div>
    <div class="tweet-detail">
      <span>
        {{
          isToday(tweet.createdAt)
            ? fromNow(utcOffset(tweet.createdAt))
            : timeFormat(utcOffset(tweet.createdAt), 'A hh:MM•YYYY年MM月DD日')
        }}
      </span>
    </div>
    <div class="tweet-text-detail">
      <span class="reply">
        <span class="reply-count">{{ tweet.replyCount }}</span> 回覆</span
      >
      <span class="like">
        <span class="like-count">{{ tweet.likeCount }}</span> 喜歡次數</span
      >
    </div>
    <div class="btn btn-control">
      <div class="btn-reply" @click="showtweetReplyModal">
        <img class="reply-icon" src="@/assets/svg/reply-lg.svg" />
      </div>
      <div class="btn-like">
        <img class="like-icon" src="@/assets/svg/like-lg.svg" />
      </div>
    </div>
    <TweetReplyModal
      :tweet="replyData"
      v-if="isShowModal"
      @close="modalClose"
      @submit="replySubmit"
    />
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
import TweetReplyModal from '@/components/TweetReplyModal.vue'

export default {
  mixins: [fromNowFilter],
  components: {
    TweetReplyModal,
  },
  data() {
    return {
      isShowModal: false,
    }
  },
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  computed: {
    replyData() {
      if(Object.keys(this.tweet).length === 0) return {}
      const { User, ...data } = this.tweet
      return {
        name: User.name,
        account: User.account,
        avatar: User.avatar,
        ...data
      }
    },
  },
  methods: {
    showtweetReplyModal() {
      console.log('test')
      this.isShowModal = true
    },
    modalClose() {
      this.isShowModal = false
    },
    replySubmit() {},
  },
}
</script>

<style lang="scss" scoped>
#tweetdetail {
  width: 100%;
  padding: 0.938rem 0.938rem 0.625rem 0.938rem;
}

.tweet-header {
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin-right: 0.625rem;
    border-radius: 50px;
  }
  .user-detail {
    display: flex;
    flex-direction: column;
    .user-name {
      font-size: 15px;
      font-weight: 700;
      // line-height: 22px;
      color: $main-text;
    }
    .user-account {
      font-size: 15px;
      font-weight: 500;
      // line-height: 22px;
      color: $input-placeholder;
    }
  }
}

.tweet-text {
  margin: 1.125rem 0;
  line-height: 34px;
  font-size: 23px;
  font-weight: 500;
}

.tweet-detail {
  padding-bottom: 1.125rem;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  color: $input-placeholder;
  border-bottom: 1px solid $popular-border;
}

.tweet-text-detail {
  padding: 1.25rem 0;
  border-bottom: 1px solid $popular-border;
  .reply {
    margin-right: 1.25rem;
  }
  .reply,
  .like {
    font-size: 19px;
    font-weight: 500;
    line-height: 27.51px;
    color: $input-placeholder;
  }
  .reply-count,
  .like-count {
    font-weight: 700;
    line-height: 28px;
    color: $modal-body-bg;
  }
}

.btn-control {
  padding-top: 0.938rem;
  display: flex;
  img {
    width: 30px;
    height: 30px;
  }
  .btn-reply {
    margin-right: 9.375rem;
  }
}
</style>
