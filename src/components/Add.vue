<template>
  <div>
    <MHeader>添加</MHeader>
    <div class="content">
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
          <label for="bookCover">封面: </label>
          <input type="text" v-model="book.bookCover" id="'bookCover">
        </li>
        <li>
          <button @click="add">添加</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import MHeader from '../base/MHeader'
  import {addBook} from "../api";

  export default {
    name: "Add",
    data() {
      return {book: {}}
    },
    methods: {
      async add() {
        await addBook(this.book);
        this.$router.push('/list')
      }
    },
    components: {
      MHeader
    }

  }
</script>

<style scoped lang="less">
  ul {
    margin: 20px 20px 0 20px;
    li {
      label {
        display: block;
        font-size: 20px;
      }
      input {
        margin: 10px 0;
        height: 20px;
        width: 100%;
      }
      button {
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
</style>
