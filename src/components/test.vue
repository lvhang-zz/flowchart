<template>
    <div>
      <div class="top">
        <div v-for="(item,index) in activityCenterData" :key="index">
          {{item}}
          <!--<ul>-->
            <!--<li v-for="(itemc,indexc) in item.textMsg.activities.activity">{{itemc.name}}</li>-->
          <!--</ul>-->
        </div>
      </div>

      <div class="bottom">
        <div>

        </div>
      </div>
    </div>
</template>

<script>
  import api from "../api";
  import {getActivityCenterData} from "../api";
  export default {
    name: "test",
    data(){
      return{
        activityCenterData:''
      }
    },
    created() {
      var that = this;
      getActivityCenterData().then((res)=>{
        console.log(res.data);
        that.activityCenterData = res.data
      })
    }
  }
</script>

<style scoped>

</style>
