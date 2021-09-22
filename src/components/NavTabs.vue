<template>
  <div class="tweet-list-title">
    <router-link :to="{ name: 'Home' }">
      <i
        class="fas fa-arrow-left arrow"
        v-if="isbackArrow"
        @click="$router.back()"
      ></i>
    </router-link>
    <h2 class="list-title">
      <template v-if="plainText">
        {{ plainText }}
      </template>
    </h2>
    <template v-if="user.name">
      <div class="user-title">
        <span class="name">{{ user.name }}</span>
        <span class="tweetCount">{{ user.tweetCount }}&ensp;推文</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tabItems: {
      type: Array,
      default() {
        return [
          {
            name: 'index',
            text: '首頁',
            to: '/',
          },
        ]
      },
    },
    plainText: String,
    user: {
      type: Object,
      default() {
        return {
          name: '',
          tweetCount: '',
        }
      },
    },
    isbackArrow: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.tweet-list-title {
  height: 55px;
  padding: 0.813rem 0 0.875rem 1.25rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $popular-border;
  .list-title {
    margin-bottom: 4px;
    font-size: 18px;
    font-weight: 700;
  }
}
.arrow {
  width: 24px;
  height: 24px;
  margin-right: 2.5rem;
  padding: 0.313rem 0.188rem 0.25rem 0.313rem;
  color: #000;
  &:hover {
    color: $nav-avtive-color;
  }
}

.user-title {
  display: flex;
  flex-direction: column;
  .name {
    font-size: 19px;
    font-weight: 900;
    line-height: 27.51px;
  }
  .tweetCount {
    font-size: 13px;
    font-weight: 500;
    line-height: 18.82px;
    color: $input-placeholder;
  }
}
</style>
