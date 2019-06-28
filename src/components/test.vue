<template>
  <div class="test">
    <test2 :testnum="testnum" v-on:minus="pminus"></test2>
    <button @click="plus">增加</button>
    <!--<button @click="open">open</button>-->
    <!--<test3 :show="show" v-on:close="closeThis"></test3>-->

    <div style="width: 1000px;height: 500px;background-color: cadetblue;position: relative">
      <vue-draggable-resizable @click.stop="activeDrag"  @deactivated="onDeactivated" :disable-user-select="false" :prevent-deactivation="true" :x="x" :y="y"  :w="w" :h="h" @dragging="onDrag"
      @resizing="onResize"  @dragstop="dragstop"  @resizestop="resizestop" :lock-aspect-ratio="true"  :parent="true">
        <img  style="width: 100%;height: 100%" src="https://hdg.faisys.com/image/xydzp/title.png" alt="">

      </vue-draggable-resizable>
      <vue-draggable-resizable  @deactivated="onDeactivated" :disable-user-select="false" :prevent-deactivation="true" :x="x" :y="y"  :w="w" :h="h" @dragging="onDrag"
                                @resizing="onResize"  @dragstop="dragstop"  @resizestop="resizestop" :lock-aspect-ratio="true"  :parent="true">
        <img  style="width: 100%;height: 100%" src="https://hdg.faisys.com/image/xydzp/title.png" alt="">

      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
  import api from "../api";
  import test2 from "../components/test2"
  // import test3 from "../components/test3"
  import {getActivityCenterData} from "../api";
  // import VueDragResize from 'vue-drag-resize'
  import VueDraggableResizable from 'vue-draggable-resizable'
  import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
  export default {
    name: "test",
    data(){
      return{
        testnum:7,
        show:false,
        w:100,
        h:100,
        x:10,
        y:10
      }
    },
    methods:{
      open(){
        this.show = true
      },
      pminus(val=1){
        this.testnum -= val ;
      },
      plus(){
        this.testnum ++
      },
      onDrag(){
        console.log("拖动中")
      },
      onResize(){

      },
      dragstop(){

      },
      resizestop(){

      },
      mouseenter(){
        console.log("dddddddddddddddd");
      },
      onDeactivated(){
        console.log("ddd")
      },
      activeDrag(){
        console.log("4444444444444444");
      }
    },
    components:{
      test2,
      // test3,
      "vue-draggable-resizable":VueDraggableResizable
    },
    created() {
      var a = 10;

      a++;
      var b = a;
      console.log(a);
      console.log(b);

    }
  }
</script>

<style scoped>

</style>
