<template>
  <div class="canvasBox">
    <div id="flowChart" ref="flowChart">

    </div>
    <!--顶部功能页-->
    <div class="operating">
      <div class="btn-group">
        <div class="btn"  :class="actionNodeType=='circle'?'btnActive':''" @click="addCircle" title="起始节点">
          <i class="iconfont  icon-yuanxingweixuanzhong"></i>
        </div>
        <div class="btn"  :class="actionNodeType=='rect'?'btnActive':''" @click="addRect" title="常规节点">
          <i class="iconfont icon-fangxingweixuanzhong"></i>
        </div>
        <div class="btn"  :class="actionNodeType=='rhombus'?'btnActive':''" @click="addRhombus" title="条件节点">
          <i class="iconfont icon-lingxing"></i>
        </div>
        <div class="btn"  :class="actionNodeType=='rhombus2'?'btnActive':''" @click="addRhombus2" title="条件节点2">
          <i class="iconfont icon-lingxing"></i>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn"  :class="actionNodeType=='line'?'btnActive':''" @click="addLine" title="直线">
          <i class="iconfont icon-zhixian"></i>
        </div>
        <div class="btn" @click="addSmooth"  :class="actionNodeType=='smooth'?'btnActive':''" title="曲线">
          <i class="iconfont icon-biaohui-quxian"></i>
        </div>
        <div class="btn" :class="actionNodeType=='arrowLine'?'btnActive':''" @click="addArrowLine" title="箭头直线">
          <i class="iconfont icon-arrow"></i>
        </div>
        <div class="btn" :class="actionNodeType=='smoothArrow'?'btnActive':''" @click="addArrowSmooth" title="箭头曲线">
          <i class="iconfont icon-curvedarrow"></i>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn" :class="activeType=='edit'?'btnActive':''" @click="changeMode('edit')" title="选择模式">
          <i class="iconfont icon-icon-shubiaojiantou-"></i>
        </div>
        <div class="btn" :class="activeType=='drag'?'btnActive':''" @click="changeMode('drag')" title="拖拽模式">
          <i class="iconfont icon-tuozhuai"></i>
        </div>
      </div>
      <div class="btn-group">
        <div class="btn" @click="del" style="margin-top: 5px;" title="删除">
          <i class="el-icon-delete"></i>
        </div>
        <!--<div class="btn" @click="save" title="保存">-->
        <!--<i class="iconfont icon-baocun"></i>-->
        <!--</div>-->
      </div>
      <!--<div class="btn-group">-->
      <!--<el-input size="mini" v-model="workflowName" placeholder="请输入流图名称..."></el-input>-->
      <!--</div>-->
    </div>
    <!--右侧设置页-->
    <div class="info" :class="activation == ''?'':'infoShow'">
      <div class="title"  v-show="nodeType !== 3">
        <span >{{infoTitle}}属性</span>
        <span class="closeRight" @click="closeRight">关闭</span>
      </div>
      <div class="content">
        <!--右侧-->
        <el-checkbox v-if="isBlank === true" v-model="checked">网格对齐</el-checkbox>
        <!--节点 node-->
        <el-form v-if="isNode === true && isBlank != true && nodeType !== 3"  label-position="left" label-width="60px">
          <el-form-item label="名称">
            <el-input ref="input1" size="mini" v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="形状">
            <el-select v-model="activeShape" size="mini" filterable placeholder="请选择形状" value="">
              <el-option
                v-for="item in nodeStyleArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能">
            <el-select v-model="func" size="mini" filterable placeholder="绑定功能" value="">
              <el-option
                v-for="item in funcList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号">
            <el-select v-model="account" size="mini" filterable multiple
                       collapse-tags placeholder="绑定账号" value="">
              <el-option
                v-for="item in accountList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流图">
            <el-select v-model="workflow" size="mini" filterable clearable placeholder="绑定流图" value="">
              <el-option
                v-for="item in workflowList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="nodeType" size="mini" filterable placeholder="请选择类型" value="">
              <el-option
                v-for="item in nodeTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单选" >
            <RadioGroup v-model="radio">
              <Radio :label="item.label" v-for="(item,index) in radioList.radiosArr" :key="index">
                <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
          </el-form-item>
          <el-form-item label="颜色">
            <el-color-picker v-model="color"></el-color-picker>
          </el-form-item>
        </el-form>
        <!--特殊节点 弹出模板编辑-->
        <div class="isActivity" v-if="isNode === true && isBlank != true && nodeType == 3" >
          <el-form  label-position="left" label-width="60px" style="display: flex">
            <el-form-item  label="名称">
              <el-input ref="input1" size="mini" v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="形状">
              <el-select v-model="activeShape" size="mini" filterable placeholder="请选择形状" value="">
                <el-option
                  v-for="item in nodeStyleArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="颜色">
              <el-color-picker v-model="color"></el-color-picker>
            </el-form-item>
          </el-form>
          <span class="closeRight" @click="closeRight">关闭</span>
          <!--加载自定义模板组件-->
          <keep-alive>
            <activitycenter ref="activitycenter"></activitycenter>
          </keep-alive>
        </div>
        <!--边 edge-->
        <div v-if="isNode !== true && isBlank != true" >
          <el-form label-position="left" label-width="60px">
            <el-form-item  label="信息">
              <el-input ref="input2" size="mini" v-model="name"></el-input>
            </el-form-item>   <!-- 线-->
            <el-form-item label="颜色">
              <el-color-picker v-model="color"></el-color-picker>
            </el-form-item>
            <el-form-item label="线条">
              <el-select v-model="activeShape" size="mini" filterable placeholder="请选择线类型" value="">
                <el-option
                  v-for="item in lineArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="粗细">
              <el-select v-model="lineWidth" size="mini" filterable placeholder="调整粗细" value="">
                <el-option
                  v-for="item in lineWidthArr"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="方向">
              <Button @click.stop="changeDir" type="default">颠倒方向</Button>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>
    <!--其他操作-->
    <div style="position: fixed;right: 222px;bottom: 0;z-index: 9999">
      <button @click="showJson">showJson</button>
      <button @click="goNew">toNew</button>
      <button @click="tofitView">autosize</button>
      <!--<button @click="addTest">addNum</button>-->
      <!--<span>{{$store.state.number.num}}</span>-->
      <!--<span>{{$store.getters.num}}</span>-->
    </div>
    <div class="d_fixed" ref="d_fixed">
      <div class="btn"  @mouseup="addRhombusUp"  title="条件节点">
        <i class="iconfont icon-lingxing"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import G6 from "@antv/g6";
  import activitycenter from "../components/activitycentercopy.vue";
  export default {
    name: "index",
    components: {
      activitycenter,
    },
    beforeCreate(){

    },
    created(){

    },
    props: {
      actionList: {
        type: Array, default: []
      },
      funcList: {
        type: Array, default: []
      },
      accountList: {
        type: Array, default: []
      },
      workflowList: {
        type: Array, default: []
      },
      nodeTypeList: {
        type: Array, default: () => {
          return [
            {id: 0, label: '普通节点'},
            {id: 1, label: '入口节点'},
            {id: 2, label: '出口节点'},
            {id: 3, label: '活动模板编辑'},
          ]
        }
      },
      radioList:{
        type: Object, default: () => {
          return {
            radioVal:"选中1",
            radiosArr:[
              {id: 0, label: '选中1'},
              {id: 1, label: '选中2'},
          ]}
        }
      }
    },
    data() {
      return {
        action: '',
        name: '',//当前节点 / 边的text
        func: '',
        detailMsg:"",//当前节点的详细信息
        account: '',
        workflow: '',
        radio:'',
        nodeType: 0,
        color: '',
        net: '',
        Util: '',
        workflowName: '',
        activation: '', //当前激活的节点
        isNode: false, //当前是节点
        isBlank: true,   //当前是空白区
        checked: true,  //网格对齐
        infoTitle: '画布',//属性标题
        oldColor: '',    //获取节点本身颜色
        type: '',        //有值为编辑状态
        nodeArr:'',
        edgeArr:'',
        activeType:"edit",//当前所处的模式
        actionNodeType:"",// 当前要添加的节点样式
        activeShape:"",//当前选中的 节点/线 的shape值 即形状 
        lineArr:[
          {
            label:"直线",
            value:"line"
          },
          {
            label:"曲线",
            value:"smooth"
          },
          {
            label:"箭头直线",
            value:"arrow"
          },
          {
            label:"箭头曲线",
            value:"smoothArrow"
          }
        ],//线的样式
        nodeStyleArr:[
          {
            label:"矩形",
            value:'rect'
          },
          {
            label:"圆形",
            value:'circle'
          },
          {
            label:"菱形",
            value:'rhombus'
          },
          // {
          //   label:"自定义",
          //   value:'customNode'
          // }
        ],//节点的样式集合
        lineWidthArr:[
          1,2,3,4,6,8
        ],
        lineWidth:'',//当前line的宽度
      }
    },
    mounted() {
      let self = this;
      this.initG6();
      //添加键盘事件
      this.activeType = "edit";
      document.onkeydown = function(e){
        let key = window.event.keyCode;
        if(key === 46){//删除键
          self.del();
        }
        if(key === 17){//ctrl键拖拽
          self.changeMode('drag');
        }
        if(key === 32){//
          if(self.activeType == "edit"){
            self.activeType = "drag"
          }else {
            self.activeType = "edit"
          }
        }
      };
      document.onkeyup = function(e){
        let key = window.event.keyCode;
        if(key === 18){
          self.changeMode('edit');
        }
        if(key === 17){
          self.changeMode('edit');
        }
      };
      //浏览器的刷新事件
      window.onbeforeunload = function (e) {
        let currentdata = JSON.stringify(self.net.save().source);
        sessionStorage.setItem("currentdata",currentdata);
        console.log("流程图界面刷新");
      }
    },
    methods: {
      initG6() {
        let self = this;
        self.Util = G6.Util;
        let grid;
        if (self.checked) {
          grid = {
            forceAlign: true, // 是否支持网格对齐
            cell: 25,         // 网格大小
          };
        } else {
          grid = null;
        }
        let clientH = document.body.clientHeight;
        // 初始化画布
        self.net = new G6.Net({
          id: 'flowChart',      // 容器ID
          mode: 'edit',
          grid: grid,
          /*width: 500,    // 画布宽*/
          height: clientH ,   // 画布高
        });
        //注册自定义节点
        G6.registNode('customNode', {
          draw: function(cfg, group){
            var text = group.addShape('text', {
              attrs: {
                x: 100,
                y: 100,
                fill: '#333',
                text: '我是一个自定义节点，\n有下面那个方形和我自己组成'
              }
            });
            var rect = group.addShape('rect', {
              attrs: {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                stroke: 'red'
              }
            });
            return rect;
          }
        });
        //点击空白处
        self.net.on('click', (ev) => {
          if (!self.Util.isNull(ev.item)) {
            self.isBlank = false
          } else {
            self.isBlank = true;
            self.infoTitle = '画布';
            // console.log("点击画布");
            self.activation = "";
          }
        });
        //点击节点
        self.net.on('itemclick', function (ev) {
          self.isNode = self.Util.isNode(ev.item);   //是否为Node
          self.activation = ev.item;
          if (self.isNode) {
            /* 激活节点后节点名称input聚焦*/
            self.$nextTick(()=>{
              self.$refs.input1.focus();
            });
            self.infoTitle = '节点';
            self.name = ev.item.get('model').label;
            self.func = ev.item.get('model').func;
            self.account = ev.item.get('model').account || [];
            self.workflow = ev.item.get('model').workflow;
            self.nodeType = ev.item.get('model').nodeType;
            self.activeShape = ev.item.get('model').shape;
            self.radio = ev.item.get('model').radio;
          } else {
            self.infoTitle = '边';
            self.action = ev.item.get('model').action;
            self.activeShape = ev.item.get('model').shape;
            self.name = ev.item.get('model').label;
            self.lineWidth = ev.item.get('model').size || 1;
          }
          self.color = self.oldColor;
        });
        //鼠标移入移出事件改变颜色
        self.net.on('itemmouseenter', ev => {
          const item = ev.item;
          self.oldColor = item.get('model').color;     //获取节点颜色
          self.net.update(item, {
            color: '#108EE9',
          });
          self.net.refresh();
        });
        self.net.on('itemmouseleave', ev => {
          const item = ev.item;
          self.net.update(item, {
            color: self.oldColor
          });
          if(this.activeType == "edit"){
            document.querySelectorAll("canvas")[1].style.cursor = "default";
          }
          self.net.refresh();
        });
        //鼠标移动事件
        self.net.on("itemhover",e => {
          if(this.activeType == "edit"){
            //移动 到四个角改变鼠标的样式
            if(e.frontEvObj.itemType == "node"){//移动到锚点和 四个角的位置
              document.querySelectorAll("canvas")[1].style.cursor = "pointer";
            }else if(e.itemType == "edge"){
              document.querySelectorAll("canvas")[1].style.cursor = "pointer";
            } else {
              document.querySelectorAll("canvas")[1].style.cursor = "move";
            }
          }
        });
        //鼠标左键抬起事件
        self.net.on('mouseup', ev => {
          this.actionNodeType = ''

        });
        //提示信息
        /* self.net.node().tooltip(['label', 'func', 'role', 'color']);
         self.net.edge().tooltip(['label', 'color']);*/
        //渲染
        /*self.net.source(self.nodes, self.edges);*/  //加载资源数据
        //加载缓存中的数据
        let currentdata = JSON.parse(sessionStorage.getItem("currentdata"));
        if(currentdata){
          self.net.changeData(currentdata);
        }else {
          self.net.render();
        }
      },
      //添加起始节点
      addCircle() {
        this.net.beginAdd('node', {
          shape: 'circle',
          nodeType: 0
        });
        this.actionNodeType = "circle";
      },
      //添加常规节点
      addRect() {
        this.net.beginAdd('node', {
          shape: 'rect',
          nodeType: 0,
        });
        this.actionNodeType = "rect";
      },
      //添加条件节点
      addRhombus() {
        this.net.beginAdd('node', {
          shape: 'rhombus',
          nodeType: 0,

        });
        this.actionNodeType = "rhombus";
      },
      addRhombus2() {
        this.net.beginAdd('node', {
          shape: 'rhombus',
          nodeType: 3
        });
        this.actionNodeType = "rhombus2";
      },
      //拖拽在添加元素 bug
      addRhombusDown(e){
        let self = this;
        // this.tofitView();
        this.$refs.d_fixed.style.display = "block";
        this.$refs.d_fixed.style.left = e.clientX  - 16  +'px';
        this.$refs.d_fixed.style.top = e.clientY - 16  +'px';
        self.net.on("mousemove",ev =>{
          console.log(ev);
          self.$refs.d_fixed.style.left = ev.domEvent.clientX  - 16  +'px';
          self.$refs.d_fixed.style.top = ev.domEvent.clientY - 16  +'px';
        });
      },
      addRhombusUp(e){
        this.$refs.d_fixed.style.display = "none";
        console.log(e);
        this.net.offEvents("mousemove");//解绑事件
        let model = {
          shape: 'rhombus',
          nodeType: 0,
          x:e.clientX,
          y:e.clientY
        };
        this.net.add("node", model)
      },
      //添加直线
      addLine() {
        this.net.beginAdd('edge', {
          shape: 'line'
        });
        this.actionNodeType = "line";
      },
      //添加曲线
      addSmooth() {
        this.net.beginAdd('edge', {
          shape: 'smooth'
        });
        this.actionNodeType = "smooth";
      },
      //添加箭头曲线
      addArrowSmooth() {
        this.net.beginAdd('edge', {
          shape: 'smoothArrow'
        });
        this.actionNodeType = "smoothArrow";
      },
      //添加箭头直线
      addArrowLine() {
        this.net.beginAdd('edge', {
          shape: 'arrow'
        });
        this.actionNodeType = "arrowLine";
      },
      //添加折线
      addPolyLine() {
        this.net.beginAdd('edge', {
          shape: 'polyLineFlow'
        });
        this.actionNodeType = "polyLineFlow";
      },
      //拖拽与编辑模式的切换
      changeMode(mode) {
        this.net.changeMode(mode);
        this.activeType = mode
      },
      //删除
      del() {
        this.net.del();
        let self = this;
        setTimeout(function () {
          let currentdata = JSON.stringify(self.net.save().source);
          sessionStorage.setItem("currentdata",currentdata);
        },100)
      },
      //保存
      save() {
        /* 验证流图名称*/
        if (this.workflowName !== '') {
          let data = this.net.save();
          if (data.source.nodes.length === 0) {
            this.$message({type: 'error', message: '流图内容不能为空'});
            return false
          }
          /* 验证节点名称*/
          for (let item of data.source.nodes) {
            if (item.label === '' || item.label === null || item.label === undefined) {
              this.$message({type: 'error', message: '节点名称不能为空'});
              return false
            }
          }
          data.source['name'] = this.workflowName;
          /*let json = JSON.stringify(data, null, 2);*/
          this.$emit('saveData', data.source, this.type);
        } else {
          this.$message({type: 'error', message: '流图名称不能为空',duration:1000})
        }
        /*console.log(saveData, json);*/
      },
      //更新节点
      update() {
        let self = this;
        let style = {
          fontSize:20,
          color:"red"
        };
        if (this.activation.get('type') === 'node') {
          this.net.update(this.activation, {
            label: this.name,
            func: this.func,
            account: this.account,
            workflow: this.workflow,
            nodeType: this.nodeType,
            color: this.color,
            stroke:"blue",
            fill: this.color,
            shape: this.activeShape,
            detailMsg:this.detailMsg,
            style:style,
            radio:this.radio,
          });
        } else {
          /* 根据ID取出label*/
          // let label = this.actionList.map(item => {
          //   if (item.id === this.action) {
          //     return item.label
          //   }
          // }).join('');
          // console.log(this.activation.get("model"));//获取节点详情
          this.net.update(this.activation, {
            label: this.name,
            color: this.color,
            action: this.action,
            shape:this.activeShape,
            size:this.lineWidth // 线的粗细
          });
        }
      },
      //箭头方向 互换
      changeDir(){
        let source = this.activation.get("model").source;
        let target = this.activation.get("model").target;
        this.net.update(this.activation, {
          source:target,
          target:source
        });
      },
      //清空视图
      clearView() {
        this.type = '';
        this.workflowName = '';
        this.net.changeData()
      },
      //更新数据
      source(nodes, edges, name, type) {
        this.type = type;
        this.workflowName = name;
        this.net.changeData(nodes, edges)
      },
      //查看json数据
      showJson(){
        /* self.net.node().tooltip(['label', 'func', 'role', 'color']);
         self.net.edge().tooltip(['label', 'color']);*/
        console.log(this.net.save().source);//获取当前画布的数据
        // console.log(this.activation);
        if(this.net.getNodes()){
          let nodeArr =  this.net.getNodes().map((item)=>{
            return item.get("model")
          });
          this.nodeArr = nodeArr;
        }
        if(this.net.getEdges()){
          let edgeArr =  this.net.getEdges().map((item)=>{
            return item.get("model")
          });
          this.edgeArr = edgeArr;
        }
        this.$emit("jsonData",this.net.save().source);
      },
      //去新页面
      goNew(){
        let _this = this;
        this.showJson();
        setTimeout(()=>{
          _this.$router.push({
            name:"cans2",
            params:{
              nodes:_this.nodeArr,
              edges:_this.edgeArr
            }
          })
        },1000)
      },
      //
      tofitView(){
        this.net.resetZoom();
      },
      addTest(){
        this.$store.dispatch("add",1)
      },
      closeRight(){
        this.isBlank = true;
        this.infoTitle = '画布';
        this.activation = ''
      }
    },
    watch: {
      //监听输入框
      action: function () {
        this.update()
      },
      name: function () {
        this.update()
      },
      func: function () {
        this.update()
      },
      account: function () {
        this.update()
      },
      workflow: function () {
        this.update()
      },
      nodeType: function () {
        this.update()
      },
      color: function () {
        this.update()
      },
      radio: function () {
        this.update()
      },
      lineWidth(){
        this.update()
      },
      activeShape(){
        this.update()
      },
      //网格切换
      checked: function () {
        let _saveData = this.net.save();
        this.net.destroy();  //销毁画布
        this.initG6();
        this.net.read(_saveData);
        this.net.render()
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #flowChart {
    border: 1px solid #ebeef5;
    position: relative;
    overflow: hidden;
    height: 100vh;
  }
  .operating {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    background-color: #ffffff;
    padding:0 10px;
    box-shadow: 1px 1px 4px 0 #0a0a0a2e;
    -moz-user-select: none; /*火狐*/

    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
  }
  .info {
    position: fixed;
    right: -100%;
    top: 0;
    z-index: 99;
    height: 100%;
    /*overflow-x: auto;*/
    overflow-y: auto;
    transition: right .6s ease-in-out;
    box-shadow: 1px 1px 4px 0 #0a0a0a2e;
    .title {
      height: 40px;
      padding-left: 10px;
      border-top: 1px solid #DCE3E8;
      border-bottom: 1px solid #DCE3E8;
      border-left: 1px solid #DCE3E8;
      background: rgb(235, 238, 242);
      line-height: 40px;
      span {
        font-size: 14px;
      }
    }
    .content {
      background: rgba(247, 249, 251, 0.85);
      min-width: 160px;
      min-height: 400px;
      border-left: 1px solid #E6E9ED;
      padding: 10px;
    }
  }
  .infoShow{
    right: 0px;
    background: rgba(247, 249, 251, 0.95);
  }
  .closeRight{
    float: right;
    cursor: pointer;
    padding-right: 10px;
  }
  .isActivity .closeRight{
    position: absolute;
    right: 0;
    top: 0;

  }
  .btn-group {
    border-right: 1px solid #efefef;
    display: inline-block;
    padding-left: 10px;
    padding-right: 14px;
    &:last-of-type {
      border-right: 0;
    }

    .btn {
      display: inline-block;
      margin: 2px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      border: 1px solid rgba(233, 233, 233, 0);
      position: relative;
      span{
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
      i {
        font-size: 20px;
      }
      &:hover {
        border: 1px solid #E9E9E9;
        color: #767A85;
        border-radius: 2px;
        background: #FAFAFE;
      }
    }
    .btnActive{
      border: 1px solid #E9E9E9;
      color: #767A85;
      border-radius: 2px;
      background: #FAFAFE;
    }
    .el-form-item {
      margin-bottom: 0 !important;
    }

  }
  .d_fixed{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    margin: 2px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    border: 1px solid rgba(233, 233, 233, 0);
    display: none;
    /*background-color: darkcyan;*/
    i{
      font-size: 20px;
    }

  }
  ul{
    list-style: none;
  }
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
</style>
