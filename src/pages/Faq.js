import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/faq.css';
import VAbg from '../imgs/va model.png';

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      questions: [false, false, false, false, false],
      imgHeight: 680,
      imgWidth: 680,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  ifShowContent = (num) => {
    let q = this.state.questions;
    q[num] = !q[num];
    this.setState({questions: q});
  }

  componentDidMount() {
    var w = window.innerWidth;
    //console.log("w: " + w);
    if (w < 820) {
      this.setState({imgHeight: w * 0.6, imgWidth: w * 0.6});
    }
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    var w = window.innerWidth;
    if (w >= 820){
      this.setState({imgHeight: 680, imgWidth: 680});
    }
    else{
      this.setState({imgHeight: w * 0.6, imgWidth: w * 0.6});
      //console.log(w * 0.6);
    }
  }


  render() {
    return (
      <div className="disclaimer">
        <h1 className="disclaimer-title">项目介绍</h1>
        <div className="faq-block">
          <p className="faq-title" onClick={() => this.ifShowContent(0)}>
            实验目的
          </p>
          {this.state.questions[0] &&
            <p className="faq-content">
            本实验旨在测试音乐对人情绪的影响。<br/>
            实验中您会听几段音乐，并在听音乐前后输入您的情绪变化。<br/>
            我们将通过您给予的反馈调整我们的推荐方案，<br/>
            以求给您带来更好的聆听体验。<br/>
            <br/>
            同时，我们将采集您由音乐引发的回忆，<br/>
            并研究不同的回忆如何影响您的选择。<br/>
          </p>}
        </div>
        <br/>
        <div className="faq-block">
          <p className="faq-title" onClick={() => this.ifShowContent(1)}>
            实验过程
          </p>
          {this.state.questions[1] &&
            <div>
            <p className="faq-content">
            本实验将分为五轮进行，<br/>
            我们希望您在一天之中完成不多余一轮实验，<br/>
            并在五天之内完成所有实验。<br/>
            每一轮实验开始前我们都将请您输入您当下的情绪数据（采用V-A模型），<br/>
            之后您将听到四段不同的音乐。<br/>
            如果音乐唤起了您的部分回忆或情绪，<br/>
            我们希望您能在网页提供的输入框内简洁直白地描述。<br/>
            在每段音乐结束之后，我们同样会使用V-A模型来采取您情绪变化的数据。<br />
          </p>
          </div>
        }
        </div>
        <br/>
        <div className="faq-block">
          <p className="faq-title" onClick={() => this.ifShowContent(2)}>
            V-A表的使用
          </p>
          {this.state.questions[2] &&
            <div>
              <p className="faq-content">
                Valence-Arousal/愉悦度-兴奋度模型是一种心理学中常用的情绪标注模型。<br/>
                其中，Valence代表情绪的积极程度，<br/>
                也就是音乐所表达的情绪是悲伤还是高兴；<br/>
                Arousal代表唤起程度的高低，<br/>
                也就是兴奋程度。<br/>
                这两个维度都是通过数值来代表其高低程度。<br/>
                比如下图所示的愉悦度区间为[-5, 5]，<br/>
                其中-5代表非常悲伤/消极，5代表非常高兴/积极；<br/>
                兴奋度区间为[0, 10] ，其中0代表平静，10代表非常激动。<br/><br/>

                根据这个定义，喜悦根据程度不同可以用V(愉悦度)：5，A(兴奋度)：8等表示；<br/>
                愤怒可以用V(愉悦度)：-3，A(兴奋度)：6等表示；<br/>
                抑郁则可以用V(愉悦度)：-5，A(兴奋度)：2等表示。
            </p>
            <img src={VAbg} width={this.state.imgWidth} height={this.state.imgHeight} alt="Valence-arousal background"/>
          </div>
          }
        </div>
        <br />
        <div className="faq-block">
          <p className="faq-title" onClick={() => this.ifShowContent(3)}>
            如何描述音乐相关的回忆/情绪
          </p>
          {this.state.questions[3] &&
            <div>
            <p className="faq-content">
            我们希望您能在听音乐时尽可能多地描述您被音乐唤起的回忆。<br/>
            描述回忆时，<br/>
            我们希望您能在开头一两句话内简洁直白地描述与回忆关联的情绪。<br />
            （例：这首曲子激励我度过最艰难的时期，如今每次听见都还备受鼓舞 <br />
            / 听这首乐曲时还是中学，如今大家天各一方，真让人难过）<br/>
            在进行这项描述后，<br />
            您可以选择是否继续详细描述您回忆中的细节。<br />
            如果您能够回想起回忆相关的时间点，<br />
            比如几年前或者人生某个特定阶段时，<br />
            我们也希望您能在输入框内简短描述一下。
            <br/>
            <br/>
          </p>
          </div>
        }
        </div>
        <br/>
      </div>
    );
  }
}

export default Faq;
