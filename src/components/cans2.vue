<template>
    <div id="flowChart">
      <div>this is second page</div>
      <h2>{{$store.state.number.num}}</h2>
      <div>
        <button @click="minus">减</button>
      </div>
    </div>
</template>

<script>
  import G6 from "@antv/g6";
  export default {
    name: "cans2",
    data(){
      return{
        nodes:[],
        edges:[],
      }
    },
    created(){
      this.nodes = this.$route.params.nodes;
      this.edges = this.$route.params.edges;
    },
    mounted() {
      this.goInit(this.nodes, this.edges);
    },
    methods:{
      goInit(nodes, edges){
        let self = this;
        self.Util = G6.Util;
        let grid;
        self.net = new G6.Net({
          id: 'flowChart',      // 容器ID
          mode: 'edit',
          grid: grid,
          /*width: 500,    // 画布宽*/
          height: 800    // 画布高
        });
        self.net.changeData(nodes, edges)
      },
      minus(){
        this.$store.dispatch("minus",2)
      }
    }
  }
</script>

<style scoped>

</style>
