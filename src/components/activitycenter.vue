<template>
  <div class="activitycenter">
    <h1>
      this is “活动中心”
    </h1>
    <div style="width: 700px;background-color: cadetblue;height: 300px"></div>
  </div>
</template>

<script>
    export default {
        name: "activitycenter"
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
    min-width: 1200px;
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
    width: calc(100% - 120px);
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
</style>
