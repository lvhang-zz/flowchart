<template>
    <div class="home">
      <anchor :nodeTypeList="nodeTypeList" :actionList="actionList"
              :funcList="funcList" :accountList="accountList"  :workflowList="workflowList" v-on:jsonData="getJson">
      </anchor>
      <div style="position: fixed;bottom: 0;left: 0">
        <button @click="showData">父页面获取数据</button>
      </div>
    </div>
</template>
<script>
  import anchor from "./anchor"
  export default {
    data(){
      return{
        actionList:[
          {id: 11, label: 'yes'},
          {id: 21, label: 'no'},

          ],
        funcList:[
          {id: "d1", label: '吃饭'},
          {id: "d2", label: '睡觉'},
        ],
        accountList:[],
        workflowList:[],
        nodeTypeList:	[
          {id: 0, label: '普通节点'},
          {id: 1, label: '入口节点'},
          {id: 2, label: '出口节点'}
        ],
        data:''
      }
    },
    methods:{
      getJson(data){
        this.data = data;
      },
      showData(){
        console.log(this.data);
      }
    },
    components:{
      anchor
    }
  }
</script>

<style scoped>

</style>
