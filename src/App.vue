<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  ul{
    list-style: none;
  }
  .demo_content .el-scrollbar__wrap{
    overflow: scroll;
  }
  .right_edit .el-scrollbar__wrap,.left_content .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .isActivity .el-form-item .el-form-item__label{
    text-align: center!important;
  }
  .right_edit .is-horizontal{
    display: none;
  }

  .tabcard_tab .inputwrap .ivu-input{
    font-size: 12px;
    /*background-color: firebrick;*/
  }

</style>
