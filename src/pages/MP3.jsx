import React, { Component } from "react";
import Experiment from "../services/Experiment.js";
import "../css/common.css";
import CD from '../imgs/cd-clipart.png';
import {InputGroup, FormControl} from 'react-bootstrap';
import "../css/va.css";

class MP3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      imgWidth: 800,
      writingComment: false,
      comment: "",
      status: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    var w = this.props.width;
    //console.log(this.props.url);
    if (w < 800) {
      this.setState({imgWidth: w});
    }
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    var w = this.props.width;
    if (w < 800) {
      this.setState({imgWidth: w});
    }
    else{
      this.setState({imgWidth: 800});
    }
  }

  handleChange = e => {
    if (this.state.writingComment === false){
        this.setState({writingComment: true});
    }
    //console.log(e.target.value);
    this.setState({ comment: e.target.value });
  };

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };



  onMouseMove = (e) => {
    var x = (e.nativeEvent.offsetX - 8) - (e.nativeEvent.offsetX - 8) % parseInt(this.state.imgWidth / 33) + this.state.imgWidth / 33 / 2 - 4;
    var y = (e.nativeEvent.offsetY - 8) - (e.nativeEvent.offsetY - 8) % parseInt(this.state.imgHeight / 25) + this.state.imgWidth / 25 / 2 - 12;
    this.setState({ x1: x, y1: y });
    //this.setState({x1: x, y1: y });
    this.setState({ val1x: parseInt(x / (this.state.imgWidth / 33)) - 16, val1y: 12 - parseInt(y / (this.state.imgHeight / 25))});
    if (Math.abs(parseInt(x / (this.state.imgWidth / 33)) - 16) <= 10 && Math.abs(12 - parseInt(y / (this.state.imgHeight / 25))) <= 10) {
      this.setState({ dotdisplay: "" });
    } else {
      this.setState({ dotdisplay: "none" });
    }
  }

  nextStage = () => {
    //console.log("In next stage");
    this.setState({status: 1});
    Experiment.memory(this.props.uId, this.props.expNum, this.props.songNum, this.state.comment)
      .then(response => {
        //console.log(response);
        this.props.audioEnd(false);
      })
      .catch(error => {
        console.log(error);
        this.props.audioEnd(false);
      });
  }

  render() {
    return (
      <div>
        <img src={CD} width={this.state.imgWidth - 40} alt="a black CD"/>
        <audio controls autoPlay onEnded={()=> this.props.audioEnd(this.state.writingComment)}>
          <source src={this.props.url} type="audio/mpeg" />
          Your browser does not support the <code>audio</code> element.
        </audio>
        <br />

        <br />
        <InputGroup variant="dark">
          <InputGroup.Prepend>
            <InputGroup.Text>音乐回忆</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl as="textarea" aria-label="With textarea" onChange={this.handleChange} value={this.state.comment}/>
        </InputGroup>
        <br />
        {!this.state.writingComment && this.state.status === 0 &&
          <div>
            <p>——请在音乐结束页面自动跳转前开始输入回忆——</p>
            <br />
            <br />
            <p>如果音乐无法正常加载，您可以点击<a href={this.props.url} target="_blank" rel="noopener noreferrer">此处</a>获取音源</p>
            <p>并在听完后点击<a onClick={()=> this.props.audioEnd(this.state.writingComment)} style={{"color": "blue"}}>此处</a>进入下一环节</p>
          </div>
        }
        {this.state.writingComment && this.state.status === 0 &&
          <p>——请在完成描述后点击<span onClick={() => this.nextStage()} style={{"color": "blue"}}>此处</span>进入下一环节——</p>
        }
        {this.state.status === 1 &&
          <p>——上传中，请耐心等待...——</p>
        }
      </div>
    );
  }
}

export default MP3;
