<template>
  <div class="demo_content" @click.stop="closeAll" >
    <div style="position: fixed;top: 0;left: 0;z-index: 9999">
      <button @click="queryData">showJSON</button>
      <button @click="queryData">clearCache</button>
      <button @click.stop="locationElement">定位元素</button>
    </div>
    <div class="react_box" :class="react_box_classname" ref="react_box">
      <!--左边部分-->
      <div class="left_wrap">
        <!--loading页-->
        <div class="left_content left_content_loading" v-if="loading">
          <loading></loading>
        </div>
        <div  v-if="!loading">
          <div class="left_content" :style="{background:'url('+parentItem.bgUrl +')',backgroundColor:'white'}"
               v-for="(parentItem,parentIndex) in activityCenterData" v-show="currentPageId == parentItem.pageId" :key="parentItem.title" >
            <div class="phone_title">
              {{parentItem.title}}
            </div>
            <!--编辑背景-->
            <div  @click.stop="" class="editBg" v-if="parentItem.pageType == 'mainBody'">
              <span @click="tcBg=!tcBg">背景设置</span>
              <span>其他设置</span>
            </div>
            <!--模拟手机页面的主体 主页面-->
            <el-scrollbar style="height:100%"  v-if="parentItem.pageType == 'mainBody'">
              <!--图片 拖拽 与 伸缩-->
              <div class="dragBox" v-for="(item,index) in parentItem.banner" >
                <vue-drag-resize :aspectRatio="true" @dragging="dragging(item)" @resize="resize(index)"
                                 @resizing="resizing(item)" @resizestop="resizestop" @dragstop="dragstop"
                                 :x="item.info.left"  :y="item.info.top"  :w="item.info.width" :h="item.info.height"
                                 :parentLimitation="true">
                  <img  style="width: 100%;height: 100%" :src="item.image" alt="">
                  <!--<div v-show="isReductShow" @click="reduct" class="reduct"></div>-->
                  <span class="edit">编辑</span>
                </vue-drag-resize>
              </div>
              <!--中间文字拖拽 修改颜色字体等-->
              <div class="middle_msg">
                <vue-drag-resize v-for="(item,index) in parentItem.textMsg.luckDrawMsg"  :w="item.info.width" :h="item.info.height"
                                 :x="item.info.left"  :y="item.info.top" :isResizable="false" :parentLimitation="true"
                                 :key="item.text" @dragging="dragging(item)" @dragstop="dragstop" >
                  <p>
                    {{item.text1}} {{item.num}} {{item.text2}}
                  </p>
                  <span class="edit" @click.stop="locationEle(item)">编辑</span>
                </vue-drag-resize>
              </div>
              <!--带图片和文字-->
              <div class="text_wrap">
                <div class="title" @click.stop="setImage(parentItem.textMsg.prize)" >
                  <img :src="parentItem.textMsg.prize.image" title="点击修改图片">
                </div>
                <div class="textmiddle"  @dbclick.stop="setFontStyle(parentItem.textMsg.prize)">
                  <p :style="{fontSize:parentItem.textMsg.prize.style.fontSize + 'px',color:parentItem.textMsg.prize.style.color}"
                     v-for="(item,index) in parentItem.textMsg.prize.text">
                    {{item}}
                  </p>
                </div>
                <span @click.stop="setFontStyle(parentItem.textMsg.prize)" class="editStyle">
                  编辑样式
                </span>
              </div>
              <!--模拟滑块上移 下移-->
              <div class="demo_bottom">
                <div class="title" @click.stop="setImage(parentItem.activities)" >
                  <img :src="parentItem.activities.image" alt="">
                </div>
                <div class="activeRuleInfoBox">
                  <transition-group  name="flip-list" tag="div" enter-active-class="animated bounceInUp position"
                                     leave-active-class="animated bounceOutDown position">
                    <div ref="top" class="top top1"  v-for="(item,index) in parentItem.activities.activity" :key="item.name">
                      <h1>{{item.name}}</h1>
                      <h2 v-if="item.type !== 'setTime'">{{item.text}}</h2>
                      <h2 v-if="item.type == 'setTime'">{{item.text[0]}} - {{item.text[1]}}</h2>
                      <!--<h2 v-show="item.type">{{activityInfo.newTime}}</h2>-->
                      <div class="edit_act">
                        <span @click.stop="moveUp(parentItem.activities.activity,item,index)" v-if="index!=0">上移</span>
                        <span @click.stop="moveDown(parentItem.activities.activity,item,index)"
                              v-if="index!=parentItem.activities.activity.length - 1">
                          下移
                        </span>
                        <span @click.stop="locationEle(item)">编辑</span>
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
            <!--普通的列表信息 输入框-->
            <el-scrollbar style="height: 100%" v-if="parentItem.pageType != 'mainBody'">
              <ul class="tabcard1 tabcard_content1" >
                <li v-for="(item,index) in parentItem.activityInfoList" @dblclick.stop="showShadow(item,index)" :key="index">
                  <span>{{item.name}}：</span>
                  <span v-if="item.type != 'setTime'">{{item.text}}</span>
                  <span v-if="item.type == 'setTime'">
                    {{item.text[0]}} - {{item.text[1]}}
                  </span>
                  <span class="right_edit1" @click.stop="locationEle(item)">编辑</span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
        <div class="switch_page">
          <a class="pre" @click.stop="prePage"></a>
          <div>{{currentPageId + 1}} / {{activityCenterData.length}}</div>
          <a class="next" @click.stop="nextPage"></a>
        </div>
      </div>
      <!--右边部分-->
      <div class="right_edit">
        <el-scrollbar style="height: 100%">
          <div class="right_edit_top">
            <!--右边tab选项卡-->
            <Tabs v-model="stringcurrentPageId">
              <TabPane v-for="(parentItem,parentIndex) in activityCenterData" :key="parentIndex"
                       :label="parentItem.pageName" :name="parentItem.pageId + ''">
                <!--条件1-->
                <ul  v-if="parentItem.activities"  class="tabcard1 tabcard_tab">
                  <li>
                    <span>活动标题：</span>
                    <div class="inputwrap">
                      <Input type="text" v-model="parentItem.title"></Input>
                    </div>
                  </li>
                  <li  v-for="(item,index) in parentItem.activities.activity"
                       :class="{showShadow:currentEditEle.name == item.name}" :key="index">
                    <span>{{item.name}}：</span>
                    <div class="inputwrap" v-if="item.type==='default'">
                      <Input :type="item.textArea?'textarea':'text'"  v-model="item.text"></Input>
                    </div>
                    <div class="inputwrap" v-if="item.type==='setTime'">
                      <DatePicker :value="item.text" format="yyyy/MM/dd" type="daterange"
                                  placement="top-start" @on-change="changeData" @on-open-change="changeDataEnd(item)" style="width: 170px">
                      </DatePicker>
                    </div>
                  </li>
                  <li :class="{showShadow:currentEditEle.name == item.name}" v-for="(item,index) in parentItem.textMsg.luckDrawMsg" :key="item.name">
                    <span>{{item.name}}：</span>
                    <div class="inputwrap">
                      <Input type="number" v-model="item.num"  @on-change="inputNum(item)"></Input>
                    </div>
                  </li>
                </ul>
                <!--条件2-->
                <ul v-if="parentItem.activityInfoList" class="tabcard1 tabcard_list">
                  <li :class="currentEditEle.name == item.name? 'showShadow':''"
                      v-for="(item,index) in parentItem.activityInfoList" :key="index">
                    <span>{{item.name}}：</span>
                    <div @click.stop="" class="tabcard1_d" v-if="item.type == 'setTime'">
                      <DatePicker :value="item.text" format="yyyy/MM/dd" type="daterange"
                                   placement="top-start" @on-change="changeData" @on-open-change="changeDataEnd(item)" style="width: 200px">
                      </DatePicker>
                    </div>
                    <div class="tabcard1_d" v-if="item.usertime" >
                      <RadioGroup  v-model="item.usertime">
                        <Radio label="全部时段"></Radio>
                        <Radio label="部分时段"></Radio>
                      </RadioGroup>
                      <CheckboxGroup v-show="item.chooseMore" v-model="item.editInfoListCheck">
                        <Checkbox v-for="(i,index) in  item.editInfoList" :label="i" :key="index"></Checkbox>
                      </CheckboxGroup>
                    </div>
                    <div class="tabcard1_d" v-if="item.type == 'setSite'">
                      <RadioGroup  v-model="item.editLocationValue">
                        <Radio label="地图选址"></Radio>
                        <a @click.stop="showMap(item)" v-if="item.editLocationValue == '地图选址'">设置</a>
                        <Radio label="自定义"></Radio>
                      </RadioGroup>
                      <div class="inputwrap">
                        <Input type="text" v-model="item.text" v-if="item.editLocationValue == '自定义'"></Input>
                      </div>
                    </div>
                    <div class="tabcard1_d" v-if="item.type == 'setGoods'">
                      <Select v-model="item.text" style="width:200px">
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
    <!--公共弹窗 设置文字-->
    <Modal
      v-model="modallText"
      title="修改"
      @on-ok="ok"
      @on-cancel="cancel">
      <div  v-if="currentEditEle && modallText">
        <div class="slideWrap">
          <span>字体大小</span>
          <div>
            <Slider v-model="currentEditEle.style.fontSize"></Slider>
          </div>
          <span>{{currentEditEle.style.fontSize}}px</span>
        </div>
        <div>
          <span>字体颜色</span>
          <ColorPicker  v-model="currentEditEle.style.color"  size="small" />
        </div>
      </div>

    </Modal>
    <!--公共弹窗 上传图片-->
    <Modal v-model="tc.modallImage"
            title="上传图片"
            @on-ok="ok"
            @on-cancel="cancel">
      <div v-if="currentEditEle && tc.modallImage">
        <div class="updateImgWrap">
          <img :src="currentEditEle.image" alt="">
        </div>
        <div  class="updateImgWrap">
          <Upload action="//jsonplaceholder.typicode.com/posts/"
                  :on-success="updateimgsuccess">
            <Button icon="ios-cloud-upload-outline">上传替换</Button>
          </Upload>
        </div>
      </div>
    </Modal>
    <!--弹出 地图-->
    <Modal width="800" v-model="tc.map"  @on-ok="ok"  @on-cancel="cancel">
      <p slot="header" style="text-align:left">
        <span>选择地点</span>
        <span style="margin-left: 20px">
          <span>当前:</span>
          <span>{{currentEditTimeEle.text}}</span>
        </span>
      </p>
      <div class="mapWrap" v-if="currentEditTimeEle.type == 'setSite'" @click.stop="">
        <baidu-map
          @click="cMap" :mapClick="false" style="height: 400px;width: 100%" class="bm-view" :center="{lng: 116.404, lat: 39.915}"
          :scroll-wheel-zoom="true" :zoom="13" :double-click-zoom="true">
          <div class="mapSearch" @click.stop="">
            <bm-view class="map"></bm-view>
            <bm-auto-complete  v-if="1" v-model="keyword" :sugStyle="{zIndex: 9999}"  @highlight="highlight" @confirm="confirm">
              <div class="map_input_wrap">
                <span>检索地点：</span>
                <input type="text" autofocus="true" @blur="mapSearch=false" v-model="keyword" placeholder="请输入地名关键字">
                <a @click="keyword=''">清空</a>
              </div>
              <bm-local-search :keyword="keyword"  :auto-viewport="true" :style="{display:'none'}"></bm-local-search>
            </bm-auto-complete>
            <!--<div class="map_input_wrap" v-show="!mapSearch">-->
              <!--<span>当前选择：</span>-->
              <!--<input type="text" @focus="mapSearch=true" v-model="keyword" placeholder="请输入地名关键字">-->
              <!--<a @click="keyword=''">清空</a>-->
            <!--</div>-->
          </div>

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
  import {getData,getActivityCenterData} from "../api";
  import $ from 'jquery'
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


        activityCenterData:'',//整个页面的数据
        currentPageId:0,//当前显示的页面的id
        stringcurrentPageId:"",
        currentEditEle:'',//当前要编辑的元素
        currentEditDragEle:'',//当前正在拖拽和自定义缩放的元素
        currentEditTimeEle:'',//当前正在改变日期的元素
        tc:{
          modallImage:false,//弹窗 上传图片
          map:false // 地图弹窗
        },
        modallText:false,// 弹窗 修改文字样式
        mapSearch:false,//是否开启地图搜索功能
      }
    },
    components:{
      loading,
      VueDraggableResizable,
      VueDragResize,
    },
    created(){
      let that = this;
      let cacheData = JSON.parse(sessionStorage.getItem("activityCenterData"));
      if(cacheData){
        console.log("取缓存");
        that.activityCenterData = cacheData;
        that.stringcurrentPageId = this.currentPageId + "";
        this.loading = false;
      }else {
        //获取整个页面的数据
        getActivityCenterData().then((res)=>{
          that.activityCenterData = res.data;
          that.stringcurrentPageId = this.currentPageId + "";
          sessionStorage.setItem("activityCenterData",JSON.stringify(res.data));
          this.loading = false;
        })
      }
    },
    mounted(){
      let that = this;
      //获取缓存
      window.onbeforeunload = function (e) {
        sessionStorage.setItem("activityCenterData",JSON.stringify(that.activityCenterData));
        console.log("活动模板页面刷新");
      }
    },
    computed:{
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

    },
    methods:{
      //格式化时间
      formatTime(time){
        if(time == ''){
          return "2019-5-14"
        }
        let date =  new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      },
      closeAll(){
        // console.log("点击空白区");
        this.showShdow = '';
        this.currentEditEle = ''
      },
      showAll(){
        this.editBgShow = !this.editBgShow
      },
      //弹窗确定
      ok (data) {
        this.$Message.info('Clicked ok');
      },
      //弹窗取消
      cancel (data) {
        this.$Message.info('Clicked cancel');
      },
      //卡片上移效果
      moveUp(data,item,index1){
        data.splice(index1,1);//先删除掉当前元素 在当前元素的上一个元素之上 再把当前元素添加上  实现两个元素上下交换位置
        data.splice(index1 -1, 0, item);//
      },
      //卡片下移效果
      moveDown(data,item,index1){
        data.splice(index1,1);//先删除掉当前元素 在当前元素的下一个元素之上 再把当前元素添加上  实现两个元素上下交换位置
        data.splice(index1 +1, 0, item);//
      },
      reduct(){//还原图大小
        this.divStyle.width = this.oldMsg.width;
        this.divStyle.height = this.oldMsg.height;
        let _this = this;
        setTimeout(function () {
          _this.isReductShow = false
        })
      },
      updateimgsuccess(...pra){
        console.log("上传成功");
        console.log(pra);
      },
      //正在拖拽的事件 顶部图片
      dragging(item){
        this.currentEditDragEle = item;
      },
      //拖拽结束的事件 顶部图片
      dragstop(pra){
        this.currentEditDragEle.info = pra
      },
      //缩放中的事件 顶部图片
      resizing(item){
        this.currentEditDragEle = item;
      },
      //缩放结束的事件 顶部图片
      resizestop(pra){
        this.currentEditDragEle.info = pra
      },
      //上一页
      prePage(){
        let length = this.activityCenterData.length;
        this.currentPageId == 0?this.currentPageId=(length-1):this.currentPageId=this.currentPageId-=1;
      },
      //下一页
      nextPage(){
        let length = this.activityCenterData.length  - 1;
        this.currentPageId == length?this.currentPageId=0:this.currentPageId=this.currentPageId+=1;

      },
      //定位成功
      locationSuccess(...data){
        console.log(data);
      },
      changetab(...val){//左边选项卡切换时的方法

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
      //修改输入数据
      inputNum(val){
        console.log(val);

        if( val.num <1){
          val.num = 1
        }
      },
      //定位要编辑的元素
      locationEle(item){
        this.currentEditEle = item;
        setTimeout(()=>{
          this.locationElement(".right_edit",".el-scrollbar__wrap");
        },100)
      },
      //滚动页面到定位的元素位置
      locationElement(className1,className2){
        let className = className1 + " " + className2;
        let ele1 = $(className);
        let scrollTopscrollTop = ele1.scrollTop();//被卷去的高度 被卷去的高度即滚动条滚动的距离
        let currenteleHeight = ele1.height();//元素的高度
        let currtEleTop = $(".showShadow");
        // console.log("被卷去的高度即滚动条滚动的距离",scrollTopscrollTop);
        // console.log("被卷去的高度 + 元素的高度=",scrollTopscrollTop + currenteleHeight);
        // console.log("滚动元素的高度",scrolleleHeight);
        if(currtEleTop.length > 0){
          if(currtEleTop.offset().top < 0){
            ele1.animate({
              scrollTop:currtEleTop.offset().top + scrollTopscrollTop - 20
            },"fast");//返回顶部
          }else if(currtEleTop.offset().top < currenteleHeight){
            return;
          }else if(currtEleTop.offset().top > currenteleHeight){
            ele1.animate({
              scrollTop:currtEleTop.offset().top + scrollTopscrollTop
            },"fast");//返回顶部
          }
        }
      },
      //弹窗  上传修改图片
      setImage(ele){
        this.tc.modallImage = true;
        this.currentEditEle = ele
      },
      //弹窗 设置文字的样式
      setFontStyle(ele){
        this.modallText = true;
        this.currentEditEle = ele;
      },
      //时间改变 刷新数据源
      changeData(val,data){
        this.currentEditTimeEle.text = val;
      },
      //
      changeDataEnd(val){
        this.currentEditTimeEle = val;
      },
      //地图弹出
      showMap(data){
        this.tc.map = true;
        this.currentEditTimeEle = data;
      },
      //地图点击事件
      cMap(dot){
        // console.log(dot.currentTarget.Xg);
        let geocoder= new BMap.Geocoder();//创建地址解析器的实例
        geocoder.getLocation(dot.point,(res)=>{
          // this.keyword = res.address;
          this.currentEditTimeEle.text = res.address;
          // this.add.site = rs.address;
          //地址描述(string)=
          // console.log(rs.address);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
          // console.log(rs.addressComponents);//结构化的地址描述(object)
          // console.log(rs.addressComponents.province); //省
          // console.log(rs.addressComponents.city); //城市
          // console.log(rs.addressComponents.district); //区县
          // console.log(rs.addressComponents.street); //街道
          // console.log(rs.addressComponents.streetNumber); //门牌号
          // console.log(rs.surroundingPois); //附近的POI点(array)
          // console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
        });
      },
      confirm(data){
        this.currentEditTimeEle.text = this.keyword;
      },
      highlight(data){
        // console.log(data);
      },
      //打印修改后的数据
      queryData(){
        // console.log(this.activityCenterData);
        sessionStorage.setItem("activityCenterData",'')
      }
    },
    watch:{
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

      stringcurrentPageId(val){
        // console.log("31231");
        // this.$forceUpdate();
        this.currentPageId = Number(val);
      },
      currentPageId(val){
        this.stringcurrentPageId = val + "";
      },
      activityCenterData:{
        deep:true,
        handler(val){
          console.log("数据改变");
        }
      }
    },
    destroyed() {
      console.log("组件销毁");
    }
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
  }
  .left_wrap{
    width: 445px;
    height: 687px;
    position: absolute;
    padding:20px 50px 0 20px;
    background-color:lightgray;
  }
  .right_edit_top{
    /*position: absolute;*/
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
    font-size: 14px;
    color: #fff;
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
  .middle_msg .edit,.dragBox .edit{
    position: absolute;
    font-size: 12px;
    color: #fff;
    top: -28px;
    padding: 10px 0;
    right: 0;
    cursor: pointer;
    display: none;
  }
  .middle_msg .vdr:hover .edit,.dragBox .vdr:hover .edit{
    display: block;
  }
  .middle_msg .vdr:hover {
    border: 1px dashed #dedede;
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
    display: none;
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
  .title{
    cursor: pointer;
  }
  .text_wrap:hover .editStyle{
    display: block;
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
  .ivu-tabs{
    overflow: inherit;
  }
  .tabcard_tab li{
    padding: 5px;
    /*margin-bottom: 150px;*/

  }
  .tabcard_tab .inputwrap{
    display: inline-block;
    font-size: 12px;
    .ivu-input{
      font-size: 12px;
      background-color: firebrick;
    }
  }
  .inputwrap{
    display: inline-block;
  }

</style>
