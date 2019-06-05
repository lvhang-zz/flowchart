<template>
    <div>
      <anchor :nodeTypeList="nodeTypeList" :actionList="actionList"
              :funcList="funcList" :accountList="accountList"  :workflowList="workflowList">
      </anchor>
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
        ]
      }
    },
    name: "demo",
    components:{
      anchor
    }
  }
</script>

<style scoped>

</style>
