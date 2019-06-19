<template>
  <div class="demo_content" @click.stop="closeAll" >
    <div style="position: fixed;bottom: 0;right: 0;z-index: 9999">
      <button @click="queryData">showJSON</button>
    </div>
    <div class="react_box" :class="react_box_classname" ref="react_box">
      <!--左边部分-->
      <div class="left_wrap">
        <!--loading页面-->
        <div class="left_content left_content_loading" v-if="loading">
          <loading></loading>
        </div>
        <div  v-if="!loading">
          <!--页面1-->
          <div v-if="nowphoneId == 0"  class="left_content" @mouseover="showAll"  @mouseout="showAll">
            <div class="phone_title">
              {{activityInfo.title}}
            </div>
            <!--编辑背景-->
            <div  @click.stop="" class="editBg" v-show="editBgShow">
              <span @click="tcBg=!tcBg">背景设置</span>
              <span>其他设置</span>
            </div>
            <!--模拟手机页面的主体-->
            <el-scrollbar style="height:100%">
              <!--图片 拖拽 与 伸缩-->
              <div class="dragBox" v-for="(item,index) in demoData.banner" >
                <!--:lock-aspect-ratio="true"   保持等比例缩放-->
                <!--<vue-draggable-resizable  :lock-aspect-ratio="true"  @dragstop="dragstop"  @resizestop="resizestop" :w="divStyle.width" :h="divStyle.height" @dragging="onDrag" @resizing="onResize" :parent="true">-->
                <!--<img  style="width: 100%;height: 100%" src="https://hdg.faisys.com/image/xydzp/title.png" alt="">-->
                <!--<div v-show="isReductShow" @click="reduct" class="reduct"></div>-->
                <!--</vue-draggable-resizable>-->
                <vue-drag-resize :aspectRatio="true" @dragging="dragging(index)" @resize="resize(index)"  @resizing="resizing(index)" @resizestop="resizestop" @dragstop="dragstop" :x="item.info.left"  :y="item.info.top"  :w="item.info.width" :h="item.info.height" :parentLimitation="true">
                  <img  style="width: 100%;height: 100%" :src="item.bgImage" alt="">
                  <div v-show="isReductShow" @click="reduct" class="reduct"></div>
                </vue-drag-resize>
              </div>
              <div class="middle_msg" :style="middleMsgStyle.parent">
                <vue-draggable-resizable v-show="middleMsgStyle.isJoinNumShow" :x="65" :w="middleMsgStyle.son.width"  :resizable="false"  :h="middleMsgStyle.son.height"  :parent="true">
                  <p>
                    已有 {{middleMsgStyle.num}} 人参与
                  </p>
                </vue-draggable-resizable>
                <vue-draggable-resizable :x="65" :y="40"  :l="300" :w="middleMsgStyle.son.width"  :resizable="false"  :h="middleMsgStyle.son.height"  :parent="true">
                  <p>
                    您今天还有 {{middleMsgStyle.peopleNum}} 次抽奖机会
                  </p>
                </vue-draggable-resizable>
              </div>
              <div class="text_wrap" @click="showEditm">
                <div class="title" @click.stop="tcList.updateShow = !tcList.updateShow" >
                  <img src="https://hdg.faisys.com/image/xydzp/myAwardImg.png" alt="">
                </div>
                <div @dblclick="modal1 = true" class="textmiddle">
                  <p :style="demoData.textMsg.prize.style" v-for="(item,index) in demoData.textMsg.prize.prizeText">{{item}}{{index}}</p>
                </div>
                <div @click="modal1 = true" v-if="isshow" class="editStyle">
                  设置样式
                </div>
              </div>
              <!--上移 下移-->
              <div class="demo_bottom">
                <div class="title">
                  <img src="https://hdg.faisys.com/image/xydzp/activeRuleImg.png" alt="">
                </div>
                <div class="activeRuleInfoBox">
                  <transition-group  name="flip-list" tag="div" enter-active-class="animated bounceInUp position"
                                     leave-active-class="animated bounceOutDown position">
                    <div ref="top" class="top top1"  v-for="(item,index) in this.demoData.textMsg.activities.activity" :boxindex="index"  :key="item.name">
                      <h1>{{item.name}}</h1>
                      <h2 v-show="!item.type">{{item.text}}</h2>
                      <h2 v-show="item.type">{{activityInfo.newTime}}</h2>
                      <div class="edit_act">
                        <span @click="moveUp(index)" v-if="index!=0">上移</span>
                        <span @click="moveDown(index)" v-if="index!=boxLength">下移</span>
                        <span>编辑</span>
                      </div>
                    </div>
                  </transition-group>
                </div>
              </div>
              <!--button-->
              <div class="buttonWrap">
                <Button  type="success">企业官网</Button>
              </div>
            </el-scrollbar>
          </div>
          <!--页面2-->
          <div v-if="nowphoneId == 1" class="left_content left_content2">
            <div class="phone_title">
              {{activityInfo.title}}
            </div>
            <el-scrollbar style="height: 100%">
              <ul class="tabcard1 tabcard_content1">
                <li v-for="(item,index) in activityInfoList" @dblclick.stop="showShadow(item,index)" :key="index">
                  <span>{{item.editName}}：</span>
                  <span>{{item.editInfo}}</span>
                  <span class="right_edit1" @click.stop="showShadow(item,index)">编辑</span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
          <!--页面3-->
          <div v-if="nowphoneId == 2" class="left_content left_content2">
            <div>the three</div>
          </div>
        </div>
        <div class="switch_page">
          <a class="pre" @click.stop="prePage"></a>
          <div>{{nowphoneId + 1}} / {{phoneList.length}}</div>
          <a class="next" @click.stop="nextPage"></a>
        </div>
      </div>
      <!--右边边部分-->
      <div class="right_edit">
        <el-scrollbar style="height: 100%">
          <div class="right_edit_top">
            <Tabs v-model="tabname" @on-click="tabChange">
              <TabPane label="基础设置" name="基础设置">
                <ul class="tabcard1">
                  <li>
                    活动标题：
                    <input type="text" v-model="activityInfo.title">
                  </li>
                  <li style="z-index: 4000">
                    活动时间:
                    <DatePicker v-model="activityInfo.value2" format="yyyy/MM/dd" type="daterange" placement="top-start" placeholder="Select date" style="width: 200px"></DatePicker>
                  </li>
                </ul>
              </TabPane>
              <TabPane label="活动设置" name="活动设置">
                <ul class="tabcard1 tabcard_list">
                  <li :class="showShdow == item.editName? 'showShadow':''" v-for="(item,index) in activityInfoList" :key="index">
                    <span>{{item.editName}}：</span>
                    <DatePicker v-if="item.editInfotime" v-model="item.editInfotime" format="yyyy/MM/dd" type="daterange" placement="top-start" style="width: 200px"></DatePicker>
                    <div class="tabcard1_d" v-if="item.usertime" >
                      <RadioGroup  v-model="item.usertime">
                        <Radio label="全部时段"></Radio>
                        <Radio label="部分时段"></Radio>
                      </RadioGroup>
                      <CheckboxGroup v-show="item.chooseMore" v-model="item.editInfoListCheck">
                        <Checkbox v-for="(i,index) in  item.editInfoList" :label="i" :key="index"></Checkbox>
                      </CheckboxGroup>
                    </div>
                    <div class="tabcard1_d" v-if="item.editName == '活动地点'">
                      <RadioGroup  v-model="item.editLocationValue">
                        <Radio label="地图选址"></Radio>
                        <a @click="mapInfo.isshow = !mapInfo.isshow" v-if="item.editLocationValue == '地图选址'">设置</a>
                        <Radio label="自定义"></Radio>
                      </RadioGroup>
                      <input type="text" v-model="item.editInfo" v-if="item.editLocationValue == '自定义'">
                    </div>
                    <div class="tabcard1_d" v-if="item.editName == '选择礼品'">
                      <Select v-model="item.editInfo" style="width:200px">
                        <Option  v-for="items in item.goodsList" :key="items"  :value="items" >{{ items }}</Option>
                      </Select>
                    </div>
                  </li>
                </ul>
              </TabPane>
            </Tabs>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <!--弹窗 设置文字-->
    <Modal
      v-model="modal1"
      title="修改"
      @on-ok="ok"
      @on-cancel="cancel" v-if="demoData">
      <div class="slideWrap">
        <span>字体大小</span>
        <div>
          <Slider v-model="font"></Slider>
        </div>
        <span>{{font}}px</span>
      </div>
      <div>
        <span>字体颜色</span>
        <ColorPicker  v-model="demoData.textMsg.prize.style.color"  size="small" />
      </div>
    </Modal>
    <!--弹窗 上传图片-->
    <Modal  v-model="tcList.updateShow"
            title="上传图片"
            @on-ok="ok"
            @on-cancel="cancel">
      <div class="updateImgWrap">
        <img src="https://hdg.faisys.com/image/xydzp/myAwardImg.png" alt="">
      </div>
      <div  class="updateImgWrap">
        <Upload action="//jsonplaceholder.typicode.com/posts/"
                :on-success="updateimgsuccess">
          <Button icon="ios-cloud-upload-outline">上传替换</Button>
        </Upload>
      </div>
    </Modal>
    <!--弹出 地图-->
    <Modal v-model="mapInfo.isshow" :title="mapInfo.title">
      <div class="mapWrap">
        <baidu-map
          @click="cMap" style="height: 400px;width: 100%" class="bm-view" :center="{lng: 116.404, lat: 39.915}"
          :scroll-wheel-zoom="true" :zoom="13" :double-click-zoom="true"
        >
          <div class="mapSearch">
            <bm-view class="map"></bm-view>
            <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 9999}" @highlight="highlight" @confirm="confirm" @searchcomplete="searchcomplete">
              <div class="map_input_wrap">
                <span>当前选择：</span>
                <input type="text" v-model="keyword" placeholder="请输入地名关键字">
                <a @click="keyword=''">清空</a>
              </div>
              <bm-local-search :keyword="keyword"  :auto-viewport="true" :style="{display:'none'}"></bm-local-search>
            </bm-auto-complete>
          </div>
          <!--<bm-marker :position="{lng: mapInfo.center[0], lat: mapInfo.center[1]}" :dragging="true" >-->
          <!--&lt;!&ndash;<bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>&ndash;&gt;-->
          <!--</bm-marker>-->
          <!--定位控件-->
          <bm-geolocation @locationSuccess="locationSuccess" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        </baidu-map>

      </div>
    </Modal>
    <!--弹出 设置背景-->
    <Modal
      v-model="tcBg"
      title="修改"
      @on-ok="ok"
      @on-cancel="cancel">
      <div>
        show 设置背景
      </div>
    </Modal>
    <!--侧边栏-->
    <div style="display: none" ref="left_side" class="left_side" :class="leftSideText.className">
      <el-scrollbar style="height: 100%">
        <ul>
          <li @click="changePage(item)" :class="item.id==(nowphoneId+1)?'liActive':''" v-for="(item,index) in phoneList" :key="index">{{item.name}}</li>
        </ul>
      </el-scrollbar>
      <a @click="reTract">
        <span>{{leftSideText.text}}</span>
      </a>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueDragResize from 'vue-drag-resize'
  import 'animate.css'
  import BaiduMap from 'vue-baidu-map'
  Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'GLTpi1LTeZI5QPXdVL2tHMgfWX18Sidk'
  });
  import VueDraggableResizable from 'vue-draggable-resizable'
  import loading from "../common/loading.vue"
  import {getData} from "../api";
  export default {
    data(){
      return{
        b:"",
        demoData:"",
        lock:true,//防止按钮反复被点击
        keyword: '',
        editBgShow:false,//设置背景的按钮是否显示
        tcBg:false,//设置背景的弹窗
        loading:true,//loading页面的显示与隐藏
        activityInfo:{
          title:"参与活动赢大奖",
          value2: ['2019-05-14', '2019-05-18'],
          newTime:'2019-05-14 - 2019-05-18',
          place:"江苏省苏州市相城区",
          timeinterval:"周一至周日"
        },
        activityInfoList:[
          {
            editName:"有效日期",
            editInfotime:["2019-05-14","2019-05-18"],
            editInfo: '2019-05-14 - 2019-05-18',
            parentName:"活动设置"
          },
          {
            editName:"可用时段",
            editInfo: "周一至周日",
            usertime:"全部时段",
            chooseMore:false,
            editInfoList:["周一","周二","周三","周四","周五","周六","周日"],
            editInfoListCheck:["周一","周二","周三","周四","周五","周六","周日"],
            parentName:"活动设置"
          },
          {
            editName:"活动地点",
            editInfo: "江苏省苏州市相城区",
            editLocationValue:'自定义',
            parentName:"活动设置"
          },
          {
            editName:"选择礼品",
            editInfo: "腾讯vip黄金会员一月",
            parentName:"活动设置",
            goodsList:["腾讯vip黄金会员一月","爱奇艺vip黄金会员一月","优酷vip黄金会员一月"],

          }
        ],
        modal1: false,//弹窗 设置文字
        isshow:false,
        isReductShow:false,
        tcList:{
          updateShow:false//弹窗 上传图片
        },
        itemBox:[
          {
            name:"001",
            text:"我是第一个"
          },
          {
            name:"活动时间",
            type:true,
            text:"2019-5-15 - 2019-5-22 "
          },
          {
            name:"003",
            text:"我是第三个"
          },
          {
            name:"004",
            text:"我是第4个"
          }
        ],
        oldMsg:{
          width: 344,
          height: 136,
        },
        middleMsgStyle:{
          isJoinNumShow:true,//参与人数是否显示
          num:0,
          peopleNum:3,
          parent:{
            color:"#FFF",
            fontSize:"15px"
          },
          son:{
            height:30,
            width:220,
            lineHeight:30
          }
        },
        phoneList:[{name:"首页",id:1},{name:"页面002",id:2},{name:"页面003",id:3}],
        nowphoneId:0,
        showShdow:'',
        mapInfo:{
          isshow:false,
          zoom: 12,
          center: [116.404, 39.915],
          title:"地图选址"
        },
        tabname:"基础设置",
        leftSide:1,
        actDrapArr:null,//当前拖拽的元素所在的数组
        actDrapIndex:null,//当前拖拽的元素所在的数组的索引
      }
    },
    components:{
      loading,
      VueDraggableResizable,
      VueDragResize,
    },
    beforeCreate(){
      getData().then((res)=>{
        console.log(res.data);
        let data = res.data;
        this.demoData = data;
        sessionStorage.setItem("demoData",JSON.stringify(data));
        this.actDrapArr = data.banner;
        this.itemBox = data.textMsg.activities.activity;
        this.$nextTick(()=>{
          this.loading = false
        })
      })
    },
    created(){
      // console.log("created。。。。。。");
      if(sessionStorage.getItem('demoData')){
        // console.log("缓存数据",JSON.parse(sessionStorage.getItem('demoData')));
        let cachedata = JSON.parse(sessionStorage.getItem('demoData'))
        // this.demoData = cachedata;
      }
      // console.log(this.$route);
    },
    computed:{
      boxLength(){//计算是否是最后一个
        return this.itemBox.length - 1
      },
      leftSideText(){
        if(this.leftSide == "0"){
          return {
            text:"展开",
            className:"left_side_close"
          }
        }else {
          return {
            text:"关闭",
            className:"left_side_open"
          }
        }
      },
      react_box_classname(){
        if(this.leftSide == "0"){
          return ''
        }else {
          return "react_box_float"
        }
      },
      font:{
        set(val){
          this.demoData.textMsg.prize.style.fontSize = val + "px"
        },
        get(){
          return Number(this.demoData.textMsg.prize.style.fontSize.split("px")[0])
        }
      }
    },
    methods:{
      closeAll(){
        this.showShdow = '';

      },
      showAll(){
        this.editBgShow = !this.editBgShow
      },
      //
      showEditm(){
        if(this.isshow){
          this.isshow = false
        }else {
          this.isshow = true
        }
      },
      ok (data) {
        this.$Message.info('Clicked ok');
      },
      cancel (data) {
        this.$Message.info('Clicked cancel');
      },
      moveUp(index1){
        let itemBox = this.itemBox;
        let nowItem = itemBox[index1];
        let itemBoxNew = itemBox.filter((item,index)=>{
          return index != index1;
        });
        itemBoxNew.splice(index1 -1, 0, nowItem);
        this.itemBox = itemBoxNew;
        this.demoData.textMsg.activities.activity = itemBoxNew
      },
      moveDown(index1){
        console.log(index1);
        let itemBox = this.itemBox;
        let nowItem = itemBox[index1];
        let itemBoxNew = itemBox.filter((item,index)=>{
          return index != index1;
        });
        console.log(itemBoxNew);
        itemBoxNew.splice(index1 +1, 0, nowItem);
        console.log(itemBoxNew);
        this.itemBox = itemBoxNew;
        this.demoData.textMsg.activities.activity = itemBoxNew

      },
      onResize: function (x, y, width, height) {
        this.divStyle.x = x;
        this.divStyle.y = y;
        this.divStyle.width = width;
        this.divStyle.height = height
      },
      onDrag: function (x, y) {
        this.x = x;
        this.y = y
      },
      reduct(){//还原图大小
        this.divStyle.width = this.oldMsg.width;
        this.divStyle.height = this.oldMsg.height;
        let _this = this;
        setTimeout(function () {
          _this.isReductShow = false
        })
      },
      isShowJoinNum(data){
        data.isshow == "隐藏" ? this.middleMsgStyle.isJoinNumShow = false:this.middleMsgStyle.isJoinNumShow = true
        this.middleMsgStyle.num = Number(data.addNum);
      },
      updateimgsuccess(...pra){
        console.log("上传成功");
        console.log(pra);
      },
      //正在拖拽的事件
      dragging(index){
        this.actDrapIndex = index;
      },
      //拖拽结束的事件
      dragstop(pra){
        console.log("拖拽结束");
        console.log(pra);
        this.actDrapArr[this.actDrapIndex].info = pra;
        this.demoData.banner = this.actDrapArr
      },
      //缩放中的事件
      resizing(index){

        this.actDrapIndex = index;
      },
      //缩放结束的事件
      resizestop(pra){
        console.log("2222");
        this.actDrapArr[this.actDrapIndex].info = pra;
        this.demoData.banner = this.actDrapArr
      },
      prePage(){//上一页
        let length = this.phoneList.length;
        this.nowphoneId == 0?this.nowphoneId=(length-1):this.nowphoneId=this.nowphoneId-=1;
      },
      nextPage(){//下一页
        let length = this.phoneList.length  - 1;
        this.nowphoneId == length?this.nowphoneId=0:this.nowphoneId=this.nowphoneId+=1;

      },
      showShadow(item,index){
        this.showShdow = item.editName;
        this.tabname = item.parentName;
      },
      cMap(dot,...pra){
        console.log(dot);
        // console.log(dot.currentTarget.Xg);
        console.log(dot.point);
        let center = [];
        center[0] = dot.point.lng;
        center[1] = dot.point.lat;

        this.mapInfo.center = center;
      },
      searchcomplete(data){
        // console.log(data);
      },
      confirm(data){
        console.log(this.keyword);
        let activityInfoList = this.activityInfoList;
        activityInfoList.forEach((item)=>{
          if(item.editName == "活动地点"){
            item.editInfo = this.keyword;
          }
          return item;
        });
        this.activityInfoList = activityInfoList;
        console.log(activityInfoList);
      },
      highlight(data){
        // console.log(data);
      },
      locationSuccess(...data){//定位成功
        console.log(data);
      },
      tabChange(data){//左边选项卡切换时的方法

      },
      reTract(){//收起侧边栏
        let _this = this;
        if(this.lock){
          this.lock = false;
          setTimeout(function () {
            _this.lock = true;
          },300)
          this.leftSide == "0"?this.leftSide = 1:this.leftSide = 0
        }else {
          setTimeout(function () {
            _this.lock = true;
            console.log(_this.lock);
          },300)
        }
      },
      changePage(data){//侧边栏切换
        this.nowphoneId == (data.id - 1) ?"":this.nowphoneId = (data.id - 1)
      },
      //打印修改后的数据
      queryData(){
        console.log(this.demoData);
        // console.log(this);
      }
    },
    watch:{
      modal1(){
        if(this.modal1){
          this.isshow = false
        }
      },
      divStyle:{
        deep:true,
        handler(){
          if(this.width != this.oldMsg.width || this.height != this.oldMsg.height){
            this.isReductShow = true
          }else {
            this.isReductShow = false
          }
        }
      },
      activityInfo:{
        deep:true,
        handler(){
          let time1 = timeChange(this.activityInfo.value2[0]);
          let time2 = timeChange(this.activityInfo.value2[1]);
          // console.log(time1);
          this.activityInfo.newTime =  time1 + ' - ' + time2
        }
      },
      activityInfoList:{
        deep:true,
        handler(item){
          let activityInfoList = this.activityInfoList;
          let time1 = timeChange(activityInfoList[0].editInfotime[0]);
          let time2 = timeChange(activityInfoList[0].editInfotime[1]);
          // console.log(time1);
          activityInfoList[0].editInfo =  time1 + ' - ' + time2;
          //
          if(activityInfoList[1].usertime == "部分时段"){
            activityInfoList[1].chooseMore = true
          }else {
            activityInfoList[1].chooseMore = false
          }
          if(activityInfoList[2].editLocationValue == "自定义"){

          }
          this.activityInfoList = activityInfoList;
        }
      },
    },

  }
  //格式化时间
  function timeChange(time) {
    if(time == ''){
      return "2019-5-14"
    }
    let date =  new Date(time);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
</script>

<style scoped lang="less">
  .tabcard1{
    padding: 0 15px;
  }
  .tabcard1 li{
    min-height: 32px;
  }
  .tabcard_list li{
    padding: 15px;
  }
  .tabcard_content1{
    margin-top: 0;
    height: 26px;
    line-height: 26px;
  }
  .tabcard_content1 li{
    text-indent: .2rem;
    position: relative;
    border: 1px solid transparent;
  }
  .tabcard_content1 li .right_edit1{

    position: absolute;
    top: -21px;
    z-index: 10000;
    right: 0;
    color: #fff;
    font-weight: 400;
    margin-right: 1px;
    opacity: .8;
    width: 32px;
    height: 21px;
    line-height: 21px;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    display: none;
  }
  .tabcard_content1 li:hover .right_edit1{
    display: block;
  }
  .tabcard_content1 li:hover{
    border: 1px dashed #333;
  }
  .tabcard_content1{
    padding-top: 20px;
  }
  .demo_content{
    background-size: 100% auto;
    min-width: 1000px;
    position: relative;
  }
  .left_content{
    width: 375px;
    height: 667px;
    padding-top: 64px;
    position: relative;
    background: url("https://hdg.faisys.com/image/xydzp/homeBg.jpg") no-repeat top;
  }
  .left_wrap{
    width: 445px;
    height: 687px;
    position: absolute;
    padding:20px 50px 0 20px;
    background-color:lightgray;
  }
  .right_edit_top{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .middle_msg {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    width: 100%;
    height: 100px;
    .draggable{
      left: calc(50% - 115px);
    }
    .active{
      border: 1px dashed #dedede;
    }
    p{
      line-height: 30px;
      cursor: move;
    }
  }
  .my-active-class .handle{
    width: 0px;
    height: 0px;
  }
  .imgWrap1 img{
    max-width: 100%;
  }
  .cc{
    font-size: 30px;
    color: #333;
  }
  .dragBox{
    height: 220px; width: 100%; position: relative;
    img{
      cursor: move;
    }
  }
  .dragBoxFake img{
    cursor: pointer;
  }
  .textmiddle{
    cursor: pointer;
    position: relative;
  }
  .editStyle{
    position: absolute;
    cursor: pointer;
    left: 0;
    top: 0;
  }
  .slideWrap{
    width: 300px;
    height: 36px;
    line-height: 36px;
    /*display: flex;*/
    div{
      display: inline-block;
      width: 200px;
      vertical-align: top;
    }
  }
  .demo_bottom{
    margin-top: 20px;
    padding: 1px 10px 20px 10px;
    background-color: rgb(254, 103, 95);
    border-color: rgb(255, 255, 255);
    border-radius: 4px;
    .title{
      text-align: center;
      width: 250px;
      position: relative;
      margin: 20px auto;
      img{
        width: 100%;
      }
    }
  }
  .activeRuleInfoBox .top{
    width: 98%;
    height: 110px;
    padding: 10px;
    margin-top: 10px;
    /*background-color: lightgray;*/
    border-radius: 3px;
    position: relative;
    border: 1px solid #ffffff;
    color: #fff;
    transition: all .5s ease-in-out;
  }
  .edit_act{
    display: none;
  }
  .activeRuleInfoBox .top:hover{
    border: 1px solid #ffffff;
    .edit_act{
      position: absolute;
      top:0;
      right: 0;
      display: block;
      padding: 4px;
      span{
        cursor: pointer;
      }
    }
  }
  .text_wrap {
    padding: 1px 10px 20px 10px;
    background-color: rgb(254, 103, 95);
    border-color: rgb(255, 255, 255);
    border-radius: 4px;
    position: relative;
    .title{
      text-align: center;
      width: 250px;
      margin: 20px auto;
      position: relative;
      cursor: pointer;
      img{
        width: 100%;
      }
    }
  }
  .vdr{
    border: 1px solid transparent
  }
  .dragBox .active{
    border: 1px dashed #000;
  }
  .reduct{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25px;
    height: 25px;
    background-color: #fff;
    background: url("http://hdg.faisys.com/image/version3/reset.png?v=201905061514") no-repeat center;
    cursor: pointer;
    border: 1px solid #969696;
    border-radius: 5px;
  }
  .right_edit{
    width: calc(100% - 375px - 70px);
    position: absolute;
    right: 0;
    top: 0;
    height: 97vh;
    background-color: #fff;

  }
  .react_box{
    position: relative;
    float: right;
    width: 100%;
    transition: width .4s ease-in-out;
  }
  .react_box_float{
    /*width: calc(100% - 120px);*/
  }
  .right_tab{
    height: 60px;
    line-height: 60px;
    background: #f6f6f6;
    border-bottom: 1px solid #dadada;
    box-sizing: border-box;

    width: 100%;
    a{
      width: 140px;
      height: 60px;
      color: #535353;
      font-size: 16px;
      display: inline-block;
      text-align: center;
    }
    .router-link-active{
      background-color: white;
    }
    .tabCard{
      padding: 30px;
    }
    .edit-bg1{
      position: absolute;
      width: 136px;
      height: 26px;
      display: flex;
      line-height: 26px;
      justify-content: space-between;
      right: 0;
      top: -26px;
    }

  }
  .phone_title{
    position: absolute;
    width: 100%;
    height: 80px;
    left: 0;
    top: 0;
    z-index: 3;
    text-align: center;
    line-height: 80px;
    color: #000;
    font-size: 18px;
    background: url("http://hd.faisys.com/version2/image/version3/wxTitle.png?v=201905061633") no-repeat center top;
  }
  .editBg{
    position: absolute;
    right: 0;
    top: 40px;
    width: 136px;
    z-index: 1000;
    height: 26px;
    color: #fff;
    background: rgba(0,0,0,.7);
    display: flex;
    line-height: 26px;
    text-align: center;
    justify-content: space-around;
    cursor: pointer;

  }
  .updateImgWrap{
    display: inline-block;
    vertical-align: top;
    width: 80px;
    height: 80px;
    img{
      width: 100%;
    }
  }
  .left_content_loading{
    background: white;
  }
  .switch_page{
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100px;
    width: 50px;
    padding-top: 20px;
    background-color: white;
  }
  .switch_page a,.switch_page div{
    height: 16px;
    width: 26px;
    margin: 0 auto;
    background-image: url("http://hd.faisys.com/version2/image/version3/icon.png?v=201905061633");
    cursor: pointer;
    display: block;

  }
  .switch_page div:nth-child(2){
    background: none;
    height: 28px;
    text-align: center;
    line-height: 28px;
  }
  .switch_page .pre{
    background-position: -438px -160px;
  }
  .switch_page .next{
    background-position: -439px -194px;
  }
  .left_content2{
    background: white;
  }
  .tabcard1_d{
    display: inline-block;
    /*vertical-align: top;*/
    position: relative;
  }
  .tabcard1 .showShadow{
    box-shadow: 1px 0 15px rgba(255,99,0,0.8), -1px 0 15px rgba(255,99,0,0.8), 0px 1px 15px rgba(255,99,0,0.8), 0px -1px 15px rgba(255,99,0,0.8);
  }
  .mapWrap{
    cursor: pointer;
    position: relative;
    z-index: 1000;
  }
  .mapSearch{
    position: absolute;
    left: 10px;
    z-index: 10000;
    top: 10px;
  }
  .map_input_wrap{
    position: relative;
  }
  .buttonWrap{
    padding: 30px 0px;
    text-align: center;
  }
  .left_side{
    position: fixed;
    height: 100%;
    left: 0;
    top: 0;
    width: 120px;
    z-index: 3;
    background-color: white;
    transition: left .4s ease-in-out;
  }
  .left_side_close{
    left: -120px;
  }
  .left_side ul li{
    width: 100%;
    height: 58px;
    font-size: 15px;
    line-height: 58px;
    cursor: pointer;
    text-align: center;
    position: relative;
    color: #7d7d7d;
    border-bottom: 1px solid #eee;
  }
  .left_side ul .liActive{
    color: #2d8cf0;
  }
  .left_side a{
    display: block;
    position: absolute;
    height: 80px;
    width: 20px;
    background-color: lightgray;
    top: calc(50% - 40px);
    padding: 1px 0;
    right: -20px;

    text-align: center;
    span{
      display: inline-block;
      margin-top: 22px;
    }
  }
  .el-scrollbar__wrap{
    overflow: scroll;
  }
.el-form-item__label{
    text-align: center;
  }
</style>
