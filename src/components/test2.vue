<template>
    <div class="test2">
      {{testnum}}
      <button @click="minus">减小</button>
    </div>
</template>

<script>
    export default {
      name: "test2",
      props:{
        testnum:{
          type:Number,default:0
        }
      },
      methods:{
        minus(){
          this.$emit("minus",2);
          console.log(this.testnum)
        }
      }
    }
</script>

<style scoped>

</style>
