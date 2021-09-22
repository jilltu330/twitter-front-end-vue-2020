<template>
  <div class="modal-backdrop">
    <transition name="modal-fade">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            aria-label="Close modal"
            @click="close"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <!-- 推文內容 -->
          <div class="tweet-content">
            <div class="tweet-content-avatar">
              <img :src="tweet.avatar" alt="avatar" />
            </div>
            <div class="tweet-content-detail">
              <div class="tweet-content-user">
                <span class="user-name">{{ tweet.name }}</span>
                <span class="user-account">{{ tweet.account }}</span>
                <span class="time"
                  >・{{
                    isToday(tweet.createdAt)
                      ? fromNow(utcOffset(tweet.createdAt))
                      : timeFormat(utcOffset(tweet.createdAt), 'MM月DD日')
                  }}</span
                >
              </div>
              <div class="tweet-content-description">
                {{ tweet.description }}
              </div>
              <div class="tweet-account">
                回覆給
                <span class="reply-tweet-account">{{ tweet.account }}</span>
              </div>
            </div>
          </div>
          <!-- 回覆內容 -->
          <div class="reply-content">
            <div class="modal-input">
              <section class="modal-create-reply">
                <textarea
                  placeholder="推你的回覆"
                  rows="4"
                  v-model="replyContent"
                ></textarea>
                <img
                  src="https://lh3.googleusercontent.com/a-/AOh14GjafILfVnBhDBrtDk_r4kLz4q4tpPhwo7pPWwGo=s96-c"
                  class="avatar"
                  alt="avatar"
                />
                <div class="d-flex justify-content-end">
                  <button class="btn" type="submit" @click.prevent="submit">
                    回覆
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { fromNowFilter } from '../utils/mixins'

export default {
  mixins: [fromNowFilter],
  name: 'TweetCreateModal',
  props: {
    tweet: {
      type: Object,
      default() {
        return {
          name: '',
          account: '',
          avatar: '',
          createdAt: '',
          description: '',
        }
      },
    },
  },
  data() {
    return {
      replyContent: '',
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
      console.log('test')
      this.$emit('submit', {
        id: this.tweet.id,
        form: {
          reply: this.replyContent,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: start;
}

.modal {
  width: 600px;
  // height: 300px;
  margin-top: 3.375rem;
  // overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  border: 1px solid $body-bg;
  background: $body-bg;
}

.modal-header {
  height: 3.438rem;
  position: relative;
  border-bottom: 1px solid $popular-border;
}

.btn-close {
  position: absolute;
  top: 0.938rem;
  left: 0.938rem;
  height: 24px;
  width: 24px;
  padding: 0.281rem;
  color: $button-color;
  .fa-times {
    font-size: 15px;
  }
}

.modal-body {
  padding: 0.938rem;
}

.tweet-content {
  position: relative;
  display: flex;
  .tweet-content-avatar {
    display: flex;
    flex-direction: column;
    margin-right: 0.625rem;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
    }
    &::after {
      content: '';
      width: 2px;
      height: 100%;
      margin: 5px auto;
      display: block;
      background-color: $reply-modal-connect-line;
    }
  }
}

.tweet-content-detail {
  .user-name {
    font-size: 15px;
    font-weight: 700;
    color: $main-text;
    margin-right: 0.313rem;
  }
  .user-account,
  .time {
    font-size: 15px;
    font-weight: 500;
    color: $input-placeholder;
  }
}
.tweet-content-description {
  margin-top: 0.313rem;
  color: $main-text;
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
}

.tweet-account {
  margin-top: 1rem;
  padding: 0.188rem 0;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 13px;
  color: $input-placeholder;
  .reply-tweet-account {
    color: $button-color;
  }
}

.reply-content {
  position: relative;
  .avatar {
    position: absolute;
    top: 0;
    width: 50px;
    height: 50px;
    margin-right: 0.625rem;
    border-radius: 50px;
  }
}

textarea {
  width: 100%;
  height: 100%;
  padding: 12px 0 20px calc(5px + 10px + 50px);
  font-size: 18px;
  font-weight: 500;
  font-family: 'Noto Sans TC';
}

.btn {
  padding: 0.625rem 0.938rem;
  font-family: inherit;
  font-size: 18px;
  line-height: 18px;
  color: $button-text;
  background-color: $button-color;
  border-radius: 100px;
}
</style>
