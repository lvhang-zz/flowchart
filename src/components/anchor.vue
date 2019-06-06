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
        <div class="btn"  :class="actionNodeType=='rhombus'?'btnActive':''"  @mousedown="addRhombusDown" @mouseup="addRhombusUp"  title="条件节点">
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
    <!--右侧功能页-->
    <div class="info">
      <div class="title">
        <span>{{infoTitle}}属性</span>
      </div>
      <div class="content">
        <!--右侧-->
        <el-checkbox v-if="isBlank === true" v-model="checked">网格对齐</el-checkbox>
        <el-form v-if="isNode === true && isBlank != true"  label-position="left" label-width="60px">
          <el-form-item  label="名称">
            <el-input ref="input1" size="mini" v-model="name"></el-input>
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
          <el-form-item  label="流图">
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
          <el-form-item label="颜色">
            <el-color-picker v-model="color"></el-color-picker>
          </el-form-item>
        </el-form>
        <div v-if="isNode !== true && isBlank != true" >
          <el-form label-position="left" label-width="60px">
            <!--<el-form-item  label="动作">-->
              <!--<el-select v-model="action" size="mini" filterable placeholder="绑定动作" value="">-->
                <!--<el-option-->
                  <!--v-for="item in actionList"-->
                  <!--:key="item.id"-->
                  <!--:label="item.label"-->
                  <!--:value="item.id">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>   &lt;!&ndash;isNode !== true 线&ndash;&gt;-->
            <el-form-item  label="修改信息">
              <el-input ref="input2" size="mini" v-model="edgeText"></el-input>
            </el-form-item>   <!-- 线-->
            <el-form-item label="颜色">
              <el-color-picker v-model="color"></el-color-picker>
            </el-form-item>
            <el-form-item label="线条">
              <el-select v-model="edgeType" size="mini" filterable placeholder="请选择线类型" value="">
                <el-option
                  v-for="item in lineArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="方向"></el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--其他操作-->
    <div style="position: fixed;right: 0;top: 0;z-index: 9999">
      <button @click="showJson">显示数据</button>
      <button @click="goNew">新页面</button>
      <button @click="tofitView">自动适应</button>
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
  export default {
    name: "index",
    components: {},
    created(){

    },
    mounted() {
      let self = this;
      this.initG6();
      //添加键盘事件
      let _self = this;
      document.onkeydown = function(e){
        let key = window.event.keyCode;
        if(key === 46){//删除键
          self.del();
        }
        if(key === 18){//alt键拖拽
          _self.changeMode('drag');
        }
        if(key === 17){//alt键拖拽
          _self.changeMode('drag');
        }
      };
      document.onkeyup = function(e){
        let key = window.event.keyCode;
        if(key === 18){
          _self.changeMode('edit');
        }
        if(key === 17){
          _self.changeMode('edit');
        }
      }
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
            {id: 2, label: '出口节点'}
          ]
        }
      }
    },
    data() {
      return {
        action: '',
        name: '',
        func: '',
        account: '',
        workflow: '',
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
        edgeText:"",//当前选中的线的文案
        edgeType:"",//当前选中的线的类型
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
        ]//线的样式
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
        // self.net  画布实例  初始化画布
        self.net = new G6.Net({
          id: 'flowChart',      // 容器ID
          mode: 'edit',
          grid: grid,
          /*width: 500,    // 画布宽*/
          height: 800 ,   // 画布高
        });
        /*self.net.tooltip({
          title: '信息', // @type {String} 标题
          split: ':',  // @type {String} 分割符号
          dx: 0,       // @type {Number} 水平偏移
          dy: 0        // @type {Number} 竖直偏移
        });*/

        //点击空白处
        self.net.on('click', (ev) => {
          // console.log("点击空白区");
          if (!self.Util.isNull(ev.item)) {
            self.isBlank = false
          } else {
            self.isBlank = true;
            self.infoTitle = '画布'
          }
          this.actionNodeType = ''
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
          } else {
            self.infoTitle = '边';
            self.action = ev.item.get('model').action;
            self.edgeType = ev.item.get('model').shape;
            self.edgeText = ev.item.get('model').label;
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
          // document.querySelectorAll("canvas")[1].style.cursor = "move";
          self.net.refresh();
        });
        self.net.on('itemmouseleave', ev => {
          const item = ev.item;
          self.net.update(item, {
            color: self.oldColor
          });
          document.querySelectorAll("canvas")[1].style.cursor = "default";
          self.net.refresh();
        });
        //鼠标移动事件
        self.net.on("itemhover",e => {
          //移动 到四个角改变鼠标的样式
          if(e.frontEvObj.itemType == "node"){//移动到锚点和 四个角的位置
            document.querySelectorAll("canvas")[1].style.cursor = "pointer";
          }else if(e.itemType == "edge"){
            document.querySelectorAll("canvas")[1].style.cursor = "pointer";
          } else {
            document.querySelectorAll("canvas")[1].style.cursor = "move";
          }
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
          nodeType: 0
        });
        this.actionNodeType = "rhombus";
      },
      //
      addRhombusDown(e){
        console.log("哈哈哈哈");
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
        // setTimeout(function () {
        //   self.update();
        // },100)
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
        if (this.activation.get('type') === 'node') {
          this.net.update(this.activation, {
            label: this.name,
            func: this.func,
            account: this.account,
            workflow: this.workflow,
            nodeType: this.nodeType,
            color: this.color
          });
        } else {
          /* 根据ID取出label*/
          // let label = this.actionList.map(item => {
          //   if (item.id === this.action) {
          //     return item.label
          //   }
          // }).join('');
          let label = this.edgeText;
          let shape = this.edgeType;
          this.net.update(this.activation, {
            label: label,
            color: this.color,
            action: this.action,
            shape:shape
          });
        }
        setTimeout(function () {
          let currentdata = JSON.stringify(self.net.save().source);
          sessionStorage.setItem("currentdata",currentdata);
        },100)
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
      edgeText(){
        this.update()
      },
      edgeType(){
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
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #flowChart {
    border: 1px solid #ebeef5;
    position: relative;
    overflow: hidden;
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
    right: 0;
    top: 0;
    z-index: 99;
    height: 100%;
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
      width: 200px;
      height: 800px;
      border-left: 1px solid #E6E9ED;
      padding: 10px;
    }
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
</style>
