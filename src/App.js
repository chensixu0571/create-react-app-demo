import React, { Component } from 'react';
import './App.css';

const orderList = {
       "orderId": "20171009174653544787",
       "buyTime": 1507542413525,
       "status": 1,
       "packageAmount": 10000,
       "orderType": 1,
       "packageId": null,
       "packageName": "10节万元套餐",
       "endTime": 1507478400000,
       "periodDetail": [
           {
               "periodName": "常规课",
               "periodKey": "periods",
               "periodNum": 10
           },
           {
               "periodName": "辅课",
               "periodKey": "subPeriods",
               "periodNum": 2
           },
           {
               "periodName": "免责次数",
               "periodKey": "freeaskTimes",
               "periodNum": 3
           },
           {
               "periodName": "测评课",
               "periodKey": "demoPeriods",
               "periodNum": 10
           }
       ],
       "payType": 2,
       "tradeDetail": [
           {
               "childOrderId": "20171009174653544787-1",
               "amount": 2000,
               "tradeType": 1,
               "status": 2,
               "callbakOrderId": null,
               "refundTime": 1496455200000
           },
           {   
               "refundTime": 1496455200000,
               "childOrderId": "20171009174653544787-2",
               "amount": 8000,
               "tradeType": 2,
               "status": 0,
               "callbakOrderId": null
           }
       ]
   }
function add0(m){return m<10?'0'+m:m }
function format(time,isTime)
{
    var time = new Date(time);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    if(isTime){
      return y+'-'+add0(m)+'-'+add0(d);
    }else{
       return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }
   
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      orderList: orderList
    }
  }
  componentWillMount(){}
  render() {
  const { orderList } = this.state;
  if(orderList){
    return (
      <div className="orderbox">
         <div className="topBox">
            <div className="topTitle">{orderList.packageName}</div>
            <div className="moneyTitle">退款金额(元)</div>
            <div className="moneyNum">{orderList.packageAmount}</div>
         </div>
         <div className="lessonBox">
            <ul className="dataList">
            {
              orderList.periodDetail.map(item => {
                 return(
                     <li key={item.periodName}>
                      <span className="leftTitle">{item.periodName}</span>
                      <span className="rightNum">×{item.periodNum}</span>
                    </li>
                  )
              })
            }
              <li>
                      <span className="leftTitle">预计到期时间</span>
                      <span className="rightNum">{format(orderList.endTime,true)}</span>
              </li>
            </ul>
         </div>
         <div className="borderLine">
            <span className="leftIcon"></span>
            <span className="rightIcon"></span>
         </div>
         {
            orderList.tradeDetail && orderList.tradeDetail.length>0?
            <div>
            {
              orderList.tradeDetail.map(item=> {
                return <div key={item.childOrderId}>
                 <div className="ordermsgBox">
                <ul className="dataList">
                  <li>
                    <span className="leftTitle">退款编号</span>
                    <span className="rightNum">{item.childOrderId}</span>
                  </li>
                   <li>
                    <span className="leftTitle">退款时间</span>
                    <span className="rightNum">{format(item.refundTime)}</span>
                  </li>
                  <li>
                    <span className="leftTitle">交易类型</span>
                    <span className="rightNum">{item.tradeType==1?"定金":"尾款"}</span>
                  </li>
              </ul>
             </div>
             <div className="borderLine">
                <span className="leftIcon"></span>
                <span className="rightIcon"></span>
             </div>
              </div>
              })
            }
           </div>
           :   <div>
                  <div className="ordermsgBox">
                  <ul className="dataList">
                    <li>
                      <span className="leftTitle">退款编号</span>
                      <span className="rightNum">{orderList.orderId}</span>
                    </li>
                     <li>
                      <span className="leftTitle">退款时间</span>
                      <span className="rightNum">{format(orderList.affirmTime)}</span>
                    </li>
                    <li>
                      <span className="leftTitle">交易类型</span>
                      <span className="rightNum">{orderList.orderType==1?"线上支付":"线下转账"}</span>
                    </li>
                </ul>
               </div>
               <div className="borderLine">
                  <span className="leftIcon"></span>
                  <span className="rightIcon"></span>
               </div>
             </div>
         }
         
         <div className="bottomBox">
               <div className="remark">
                 <span className="dotIcon"></span>
                 <span className="remarkText"> 由于退款方式不同，大约需要7个工作日，请您耐心等待。</span>
                </div>
          </div>
      </div>
    ) 
   }else{
    return (<div className="loading--fullscreen">
        <span className="loading__box"><i className="loading__icon"></i></span>
       </div>
    )
   }
  }
}

export default App;
