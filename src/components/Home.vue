<template>
  <div>
    <MHeader>首页</MHeader>
    <div class="content">
      <div v-if="loading">
        <Loading></Loading>
      </div>
      <template v-else>
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="(book, index) in hotBook" :key="index">
              <img :src="book.bookCover">
              <b>{{book.bookName}}</b>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  // 1. 引入组件 2.注册组件  3. 使用组件
  import MHeader from '../base/MHeader'
  import Loading from '../base/Loading'
  import Swiper from '../base/Swiper'
  import {getAll} from "../api";

  export default {
    created() {
      this.getData();
    },
    data() {
      return {sliders: [], hotBook: [], loading: true}
    },
    name: "Home",
    components: {
      MHeader, Swiper, Loading
    },
    methods: {
      async getData() {
        let [sliders, hotBook] = await getAll();
        this.sliders = sliders;
        this.hotBook = hotBook;
        this.loading = false
      },
    }

  }
</script>

<style scoped lang="less">
  h3 {
    color: #999;
    padding: 5px 0;
  }

  .container {
    width: 90%;
    margin: 0 auto;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    li {
      width: 33.33333%;
      text-align: center;
      margin: 5px 0;
      img {
        width: 100%;
      }
      b {
        font-size: 10px;
      }
    }
  }
</style>
