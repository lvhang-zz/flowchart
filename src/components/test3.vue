<template>
    <div style="position: fixed;top: 0;right: 0">
      <Button @click="value1 = true" type="primary">Open</Button>
      <Drawer title="Basic Drawer" :closable="false" v-model="value1" @on-close="close" >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
</template>

<script>
    export default {
      name: "test3",
      data(){
        return{
          value1:false
        }
      },
      created(){
        console.log(this.show);
        // this.value1 =this.props.show
      },
      props:{
        show:{
          type:Boolean,
          default:true
        }
      },
      methods:{
        close(){
          this.$emit("close");
          // return false;
        },

      },
      watch:{
        show(){
          this.value1 = this.show
        }
      }
    }
</script>

<style scoped>

</style>
