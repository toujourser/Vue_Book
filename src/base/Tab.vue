<template>
  <div class="footer">
    <router-link to="/home"><i class="iconfont icon-shouye"></i>首页</router-link>
    <router-link to="/list"><i class="iconfont icon-liebiaoye"></i>列表</router-link>
    <router-link to="/add"><i class="iconfont icon-tianjiayemian"></i>添加</router-link>
    <router-link to="/collect"><i class="iconfont icon-shoucangye"></i>收藏</router-link>
  </div>
</template>


<style scoped lang="less">
  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    border-top: 1px solid #ccc;
    a{
      display: flex;
      color: yellowgreen;
      flex-direction: column;
      text-decoration: none;
      flex: 1;
      align-items: center;
      justify-content: center;
    }
    a.router-link-active{
      color: red;
    }

  }
</style>
