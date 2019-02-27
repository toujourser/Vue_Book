<template>
    <div class="header">
        <slot></slot>
        <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
    </div>
</template>

<script>
  export default {
    props: {
      back: {
        type: Boolean,
        default: false
      }
    },
    name: 'MHeader',
    methods: {
      goBack(){
        this.$router.go(-1);
        // history.back()
      }
    }
  }
</script>

<style scoped lang="less">
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    border-bottom: 1px solid #f1f1f1;
  }
  i{
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
</style>
