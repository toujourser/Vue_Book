<template>
  <div >
    <MHeader :back="true">详情页</MHeader>
    <ul class="detail">
      <li>
        <label for="bookName">书名: </label>
        <input type="text" v-model="book.bookName" id="bookName">
      </li>
      <li>
        <label for="boookInfo">简介: </label>
        <input type="text" v-model="book.bookInfo" id="bookInfo">
      </li>
      <li>
        <label for="bookPrice">价格: </label>
        <input type="text" v-model.number="book.bookPrice" id="'bookProce">
      </li>
      <li>
        <button @click="update">确认修改</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader'
  import {getOneBook, updateBook} from '../api'

  export default {
    created() {
      this.getBook()
    },
    watch:{
      $route(){ // 只要路径变化重新获取数据
        this.getBook();
      }
    },
    name: "Detail",
    data() {
      return {book: []}
    },
    methods: {
      async update(){ // 点击修改图书信息
        await updateBook(this.bid, this.book);
        this.$router.push('/list'); // 修改完成后跳回列表页
      },
      async getBook() { // 通过id找到某一本书
        this.book = await getOneBook(this.bid);
        // console.log(this.book)

        // 如果是空对象 需要跳转会列表页
        Object.keys(this.book).length>0?void 0:this.$router.push('/list');
      }
    },
    computed: {
      bid() {
        return this.$route.params.bid // 将路径参数的Id映射到bid上
      }
    },
    components: {
      MHeader
    }
  }
</script>

<style scoped lang="less">
  ul{
    margin: 50px 20px 0 20px;
    li{
      label{
        display: block;
        font-size: 20px;
      }
      input{
        margin: 10px 0;
        height: 20px;
        width: 100%;
      }
      button{
        display: block;
        width: 60px;
        height: 30px;
        background: #2aabd2;
        color: #fff;
        border: none;
        border-radius: 5px;
        outline: none;
      }
    }
  }
  .detail {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 100;
  }
</style>
