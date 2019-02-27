<template>
  <div>
    <MHeader>列表页</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <ul>
        <router-link v-for="(book, index) in allBooks" :key="index" :to="{name:'detail', params: {bid:book.bookId}}"
                     tag="li">
          <img v-lazy="book.bookCover">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <button @click.stop="remove(book.bookId)">删除</button>
          </div>
        </router-link>
      </ul>
      <div @click="more" class="more" v-if="hasMore">加载更多</div>
      <div @click="more" class="more" v-else>--- 我是有底线的 ---</div>
    </div>

  </div>
</template>

<script>
  import MHeader from '../base/MHeader'
  import {pagination, removeBook} from '../api'

  export default {
    created() {
      this.getData();
    },
    name: "List",
    data() {
      // offset 代表偏移量, hasMore代表数据还有更多 默认不在加载
      return {allBooks: [], offset: 0, hasMore: true, isLoading: false}
    },
    methods: {

      // 上滑自动加载数据
      loadMore() {
        // 触发scroll 时间 可能触发n次 先进来来一个定时器, 下次 触发时将上一次的定时  清除掉
        clearTimeout(this.timer); // 防抖
        this.timer = setTimeout(() => {
          //   卷曲的高度   当前可见的高度  总高度
          let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
          if (scrollTop + clientHeight + 20 > scrollHeight) {
            this.getData(); // 获取更多
          }
        }, 230);

      },
      more() {
        this.getData();
      },
      async getData() {
        if (this.hasMore && !this.isLOading) {
          this.isLoading = true;
          let {hasMore, result} = await pagination(this.offset);
          this.allBooks = [...this.allBooks, ...result];
          this.hasMore = hasMore;
          this.isLoading = false;
          this.offset = this.allBooks.length; // 维护偏移量  就是书数组的长度
        }

      },
      async remove(id) {
        await removeBook(id); // 删除某一项

        // 要删除前台数据
        this.allBooks = this.allBooks.filter(item => item.bookId !== id);
      },
    },
    beforeRouteLeave(to, from, next) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      next()
    },
    //进入该页面时，用之前保存的滚动位置赋值
    beforeRouteEnter(to, from, next) {
      next(vm => {
        document.body.scrollTop = vm.scrollTop
      })
    },
    components: {
      MHeader
    }
  }
</script>

<style scoped>
  .content ul {
    padding: 10px;
  }

  .content ul li {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;

  }

  .content ul li img {
    width: 100px;
    height: 100px;
  }

  .content h4 {
    font-size: 16px;
    line-height: 19px;
  }

  .content p {
    color: #2a2a2a;
    line-height: 25px;
  }

  .content b {
    color: red;

  }

  .content button {
    display: block;
    width: 60px;
    height: 30px;
    background: orange;
    color: #fff;
    border: none;
    border-radius: 10px;
    outline: none;
  }

  .more {
    margin: 10px;
    background: #F8F8FF;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
  }

</style>
