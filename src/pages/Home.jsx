import React, { Component } from "react";
import Experiment from "../services/Experiment.js";
import {Link} from 'react-router-dom';
import VAcanvas from './VAcanvas.jsx';
import MP3 from './MP3.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import "../css/home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: [],
      memo: "",
      step: 0,
      songnum: 1,
      initop: -50,
      inileft: -50,
      top: -50,
      left: -50,
      width: 0,
      height: 0,
      canvasWidth: 0,
      songs: ["第1首", "第2首", "第3首", "第4首"],
      favorite: -1,
      overallRate: -1,
      v: -10,
      a: -10,
      mid: -1,
      url: "",
      rate: -1,
      fam: -1,
      needNewDate: false,
      newDate: new Date()
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    if (this.props.loggedIn === true && this.props.musicNum > 0) {
      //console.log(this.props.musicNum);
      this.setState({left: (5 + this.props.v) * Math.min(800, window.innerWidth) / 10 - 10});
      this.setState({top: (10 - this.props.a) * Math.min(800, window.innerWidth) / 10 - 10});
      this.setState({step: (this.props.musicNum + 1) * 2});
      this.setState({songnum: this.props.musicNum + 1});
      this.setState({url: this.props.murl});
      this.setState({mid: this.props.mid});
      //console.log(this.props.v * Math.min(800, window.innerWidth) / 10);
      //console.log(this.props.a * Math.min(800, window.innerWidth) / 10);
      //console.log((this.props.musicNum + 1) * 2 );
    }
    //console.log(this.props.endDate);
    //console.log(this.props.endDate === null);

    this.setState({needNewDate: true});
    var date = new Date();
    date.setDate(date.getDate() + 6);
    //console.log(date);
    this.setState({newDate: date});
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    if (window.innerWidth >= 820) {
      this.setState({canvasWidth: 800});
      //console.log("window.innerWidth: " + window.innerWidth + "  canvasWidth: " + 800);
    }
    else{
      this.setState({canvasWidth: window.innerWidth - 20});
      //console.log("window.innerWidth: " + window.innerWidth + "  canvasWidth: " + window.innerWidth);
    }

  }

  startNewExperiment = (v, a) => {
    //console.log("in startNewExperiment");
    //console.log(this.props.endDate);
    Experiment.start(this.props.uId, this.props.expNum, v, a)
      .then(response => {
        //console.log(response);
        if (response !== undefined){
          this.setState({url: response.data.murl});
          this.setState({mid: response.data.mid});
          this.setState({step: this.state.step + 1});
        }else{
          alert("User not exist, please register!");
        }
      })
      .catch(error => console.log(error));
  };

  recordEachMusic = (v, a, rate, fam) => {
    Experiment.musicUpdate(parseInt(this.props.uId), parseInt(this.props.expNum), this.state.songnum - 1, parseInt(this.state.mid), v, a, parseInt(rate), parseInt(fam))
      .then(response => {
        //console.log(response);
        if (response !== undefined){
          this.setState({url: response.data.murl});
          this.setState({mid: response.data.mid});
          this.setState({step: this.state.step + 1});
        }else{
          alert("Something wrong with musicUpdate, please check!");
        }
      })
      .catch(error => console.log(error));
  }

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  processVA = (top, left, v, a, rate, fam) => {
    //console.log("processVA");
    if (this.state.step === 1) {
      this.setState({
        initop: top,
        inileft: left,
        top: top,
        left: left,
        v: v,
        a: a,
      });
      this.startNewExperiment(v, a);
    } else {
      this.setState({
        top: top,
        left: left,
        v: v,
        a: a,
        rate: rate,
        fam: fam,
      });
      //console.log(v + " " + a + " " + rate + " " + fam)
      this.recordEachMusic(v, a, rate, fam);
    }
  }

  selectOverallRate = (e) => {
    this.setState({overallRate: e.target.value});
  }

  selectFavoriteSong = (e) => {
    this.setState({favorite: e.target.value});
  }

  startTest = () => {
    this.setState({step: this.state.step + 1});
  }

  endTest = () => {
    if (this.state.overallRate > 0 && this.state.favorite > 0) {
      Experiment.expEnd(parseInt(this.props.uId), parseInt(this.props.expNum), this.state.v, this.state.a, parseInt(this.state.favorite), parseInt(this.state.overallRate))
      .then(response => {
        //console.log(response);
      })
      this.props.handleLogOut();
    }else {
      if (this.state.overallRate < 0) {
        this.setState({overallRate: 0});
      }
      if(this.state.favorite < 0) {
        this.setState({favorite: 0});
      }
    }
  }

  audioEnd = (writingComment) => {
    if (!writingComment) {
      this.setState({step: this.state.step + 1, songnum: this.state.songnum + 1});
    }
  }

  render() {
    if(this.props.loggedIn === false) {
      return(
        <div style={{"textAlign": "center"}}>
          <h1>请先登录或者注册，谢谢！</h1>
          <br />
          <br />
          <br />
          <h3><Link to="/faq">点击此处阅读实验介绍</Link></h3>
          <br />
          <br />
          <h3><Link to="/login">点击此处登录网页</Link></h3>
          <br />
          <br />
          <h3><Link to="/register">点击此处注册账号</Link></h3>
          <br />
          <br />
          <br />
          <br />
          <h5>咨询相关信息，请加微信 ljy1297745191</h5>
          <h5>联系管理员</h5>
        </div>
      );
    }
    if (this.state.step === 0) {
      return(
        <div className="mainPage">
        <div className="introclass">
          <p className='sTitle'>实验入口</p>
          {this.props.expNum <= 5 &&
          <p className="intro">
              本实验旨在测试音乐对人情绪的影响。<br/>
              实验将分为<span className="numOfTest">5</span> 轮进行，
              {this.state.width >=600 && <br/>}
              我们希望您在<span className="numOfTest">1</span> 天之中完成不多于<span className="numOfTest">2</span> 轮实验，{this.state.width >=600 && <br/>}
              请尽量选择有不同情绪时进行试验，
              并在<span className="numOfTest">3</span> 天之内完成所有<span className="numOfTest">5</span>轮实验。<br/>
              每<span className="numOfTest">1</span> 轮实验开始前我们都将请您输入您当下的情绪数据（采用<Link to="/faq">V-A模型</Link>），{this.state.width >=600 && <br/>}
              之后您将听到<span className="numOfTest">4</span> 段不同的轻音乐。<br/>
              如果音乐唤起了您的部分记忆或情绪，{this.state.width >=600 && <br/>}
              我们希望您能在网页提供的输入框内简洁直白地描述，<br/>
              这将对我们实验中研究记忆如何影响我们对于音乐的理解有极大帮助。<br/>
              在每段音乐结束之后，我们同样会使用V-A模型来采取您情绪变化的数据，{this.state.width >=600 && <br/>}
              以供实验对比。<br />
              该V-A值将在之后用来调整算法，不会影响本轮音乐推荐。<br/><br/>

              请您在实验开始后不要离开这个页面直至结束。<br/>
              如需离开，请您在返回时务必重新登录。<br/>
              如果您在本轮实验开始后的3个小时内重新登录，<br/>
              您将可以继续实验中未完成的部分。<br/>
              如果超过3个小时，
              则本轮实验的记录将清空，您需重新开始本轮实验。<br/>
              <br/>
              <br/>

            这是您的第<span className="numOfTest">{this.props.expNum}</span>轮实验</p>
          }
          {this.props.expNum > 5 &&
            <p  className="intro">您已完成所有实验，我们衷心感谢您的支持与帮助！</p>
          }

          <div>
          {this.props.expNum <= 5 &&
            <Button className="testButtonDisplay" onClick={() => this.startTest()}>开始实验</Button>
          }
          {this.props.expNum > 5 &&
            <Button className="testButtonDisplay" onClick={() => this.props.handleLogOut()}>退出登录</Button>
          }
          </div>
        </div>
        </div>
      );
    }
    if (this.state.step === 10) {
      return(
        <div className="mainPage">
          <div className="introclass">
            <p className='sTitle'>恭喜您，完成本轮实验</p>
            <p className='hint'>当前实验进度为 {this.props.expNum} / 5， <br /><br />请于{isNaN(this.props.endDate.getMonth()) ? this.state.newDate.getMonth() + 1 : this.props.endDate.getMonth() + 1}月{isNaN(this.props.endDate.getDate()) ? this.state.newDate.getDate() : this.props.endDate.getDate()}日之前完成剩余部分</p>
            <div style={{display: "block"}}>
              {this.state.favorite === 0 &&
                <p className="hint" style={{marginBottom: "0px", paddingBottom: "0px", display: "inline", color: "#dd0000"}}>请选择本轮您最满意的音乐：</p>
              }
              {this.state.favorite !== 0 &&
                <p className="hint" style={{marginBottom: "0px", paddingBottom: "0px", display: "inline"}}>请选择本轮您最满意的音乐：</p>
              }
              <select value={this.state.favorite} onChange={this.selectFavoriteSong} style={{display: "inline"}}>
                <option value={0}> （空）</option>
                <option value={1}> {this.state.songs[0]}</option>
                <option value={2}> {this.state.songs[1]}</option>
                <option value={3}> {this.state.songs[2]}</option>
                <option value={4}> {this.state.songs[3]}</option>
              </select>
              <br />
              <br />
              {this.state.overallRate === 0 &&
                <p className="hint" style={{marginBottom: "0px", paddingBottom: "0px", display: "inline", color: "#dd0000"}}>请为本轮推荐的音乐做总评分：</p>
              }
              {this.state.overallRate !== 0 &&
                <p className="hint" style={{marginBottom: "0px", paddingBottom: "0px", display: "inline"}}>请为本轮推荐的音乐做总评分：</p>
              }
              <select value={this.state.overallRate} onChange={this.selectOverallRate} style={{display: "inline"}}>
                <option value={0}> （空）</option>
                <option value={1}> 很失望</option>
                <option value={2}> 有点失望</option>
                <option value={3}> 一般般</option>
                <option value={4}> 比较满意</option>
                <option value={5}> 非常满意</option>
              </select>
            </div>
            <br />
            <br />
            <div>
              <Button className="testButtonDisplay" onClick={() => this.endTest()}>完成实验并退出登录</Button>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.step === 10) {
      return(
        <div className="mainPage">
          <div className="inTest">
          <p className='sTitle'>恭喜您已完成本次实验听音乐的部分，<br />请完成以下问卷以结束实验：</p>
          <div style={{display: "block", width: this.state.canvasWidth+"px", margin: "auto"}}>
          {/*
          <VAcanvas width={this.state.canvasWidth} endTest = {this.endTest} step={this.state.step} display="inherit" top={this.state.top === -50? this.state.initop : this.state.top} left={this.state.left === -50? this.state.inileft : this.state.left}}/>
          */}
          </div>
          </div>
        </div>
      );
    }
    if (this.state.step === 1) {
      return(
        <div className="mainPage">
          <div className="inTest">
          <p className='sTitle'>请输入您当下的情绪：</p>
          <div style={{display: "block", width: this.state.canvasWidth+"px", margin: "auto"}}>
          <VAcanvas width={this.state.canvasWidth} processVA = {this.processVA} step={this.state.step} display="none"/>
          </div>
          </div>
        </div>
      );
    }
    if (this.state.step !== 0 && this.state.step % 2 === 0) {
      return(
        <div className="mainPage">
          <div className="inTest">
            <p className='sTitle'>请听音乐 {this.state.songnum}/ 4</p>
            <div style={{display: "block", width: this.state.canvasWidth+"px", margin: "auto"}}>
              <MP3 width={this.state.canvasWidth} audioEnd = {this.audioEnd} url={this.state.url} expNum={this.props.expNum} songNum={this.state.songnum} uId={this.props.uId}/>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.step !== 0 && this.state.step % 2 === 1) {
      return(
        <div className="mainPage">
          <div className="inTest">
          <p className='sTitle stsm'>请输入您当下的情绪：</p>
          <p className='hint itsm'>(蓝点作为参考表示上一次输入的值)</p>
          <div style={{display: "block", width: this.state.canvasWidth+"px", margin: "auto"}}>
          <VAcanvas width={this.state.canvasWidth} processVA = {this.processVA} step={this.state.step} display="inherit" top={this.state.top === -50? this.state.initop : this.state.top} left={this.state.left === -50? this.state.inileft : this.state.left}/>
          </div>
          </div>
        </div>
      );
    }
    return (
      <div>
      </div>
    );
  }
}

export default Home;
