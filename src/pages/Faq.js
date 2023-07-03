import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/faq.css';
import VAbg from '../imgs/va model.png';

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [false, false, false, false, false],
      imgHeight: 680,
      imgWidth: 680,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  ifShowContent = (num) => {
    let q = this.state.questions;
    q[num] = !q[num];
    this.setState({ questions: q });
  };

  componentDidMount() {
    var w = window.innerWidth;
    //console.log("w: " + w);
    if (w < 820) {
      this.setState({ imgHeight: w * 0.6, imgWidth: w * 0.6 });
    }
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    var w = window.innerWidth;
    if (w >= 820) {
      this.setState({ imgHeight: 680, imgWidth: 680 });
    } else {
      this.setState({ imgHeight: w * 0.6, imgWidth: w * 0.6 });
      //console.log(w * 0.6);
    }
  }

  render() {
    return (
      <div className='disclaimer'>
        <h1 className='disclaimer-title'>项目介绍</h1>
        <div className='faq-block'>
          <p className='faq-title' onClick={() => this.ifShowContent(0)}>
            实验目的
          </p>
          {this.state.questions[0] && (
            <p className='faq-content'>
              This experiment is designed to assess the impact of music on human
              emotions.
              <br />
              During the experiment, you will listen to several pieces of music
              and record your emotional changes before and after listening.
              <br />
              Based on your feedback, we will adjust our recommendation scheme,
              <br />
              aiming to provide you with an improved listening experience.
              <br />
              <br />
              Simultaneously, we will collect memories evoked by the music,
              <br />
              and study how different memories influence your choices.
              <br />
            </p>
          )}
        </div>
        <br />
        <div className='faq-block'>
          <p className='faq-title' onClick={() => this.ifShowContent(1)}>
            Experiment Procedure
          </p>
          {this.state.questions[1] && (
            <div>
              <p className='faq-content'>
                The experiment will be divided into four rounds:
                <br />
                In the first and fourth rounds, we will recommend music from our
                library to you,
                <br />
                while in the second and third rounds, we will generate segments
                of music for you.
                <br />
                <br />
                We hope that you complete
                <span className='faq-highlight'>
                  no more than two rounds
                </span>{' '}
                of the experiment in a day,
                <br />
                and finish all experiments before{' '}
                <span className='faq-highlight'>April 2nd</span>.
                <br />
                <br />
                At the beginning of each round, we will ask you to input your
                current emotional data (using the V-A model),
                <br />
                then you will listen to four different pieces of music.
                <br />
                If the music evokes some memories or emotions,
                <br />
                we would like you to describe them succinctly and directly in
                the input box provided on the webpage.
                <br />
                After each piece of music, we will also use the V-A model to
                collect data on your emotional changes.
                <br />
              </p>
            </div>
          )}
        </div>
        <br />
        <div className='faq-block'>
          <p className='faq-title' onClick={() => this.ifShowContent(2)}>
            Use of V-A Scale
          </p>
          {this.state.questions[2] && (
            <div>
              <p className='faq-content'>
                The Valence-Arousal (V-A) model is a commonly used emotion
                annotation model in psychology.
                <br />
                Here, Valence represents the positivity or negativity of an
                emotion,
                <br />
                in other words, whether the emotion expressed by the music is
                sad or happy.
                <br />
                Arousal represents the intensity of the arousal,
                <br />
                or excitement level.
                <br />
                Both of these dimensions are represented by numerical values to
                denote their intensity.
                <br />
                For instance, as shown in the figure below, the range for
                Valence is [-5, 5],
                <br />
                where
                <span className='faq-highlight'>
                  -5 signifies extreme sadness/negativity and 5 represents
                  extreme happiness/positivity;
                </span>
                <br />
                the Arousal range is [0, 10] where
                <span className='faq-highlight'>
                  0 stands for calm and 10 signifies extreme excitement.
                </span>
                <br />
                <br />
                According to this definition, joy could be represented as V
                (Valence): 5, A (Arousal): 8, depending on the intensity;
                <br />
                anger could be represented as V (Valence): -3, A (Arousal): 6;
                <br />
                depression could be represented as V (Valence): -5, A (Arousal):
                2.
              </p>
              <img
                src={VAbg}
                width={this.state.imgWidth}
                height={this.state.imgHeight}
                alt='Valence-arousal background'
              />
            </div>
          )}
        </div>
        <br />
        <div className='faq-block'>
          <p className='faq-title' onClick={() => this.ifShowContent(3)}>
            How to Describe Music-Related Memories/Emotions
          </p>
          {this.state.questions[3] && (
            <div>
              <p className='faq-content'>
                We hope that while listening to the music, you can describe as
                many of your
                <span className='faq-highlight'>
                  memories evoked by the music
                </span>{' '}
                as possible.
                <br />
                When describing these memories,
                <br />
                we would like you to succinctly and directly describe the
                associated emotions in the first sentence or two.
                <br />
                (Example: This song helped me through the toughest times, and
                still inspires me every time I hear it.
                <br />
                / I used to listen to this music in high school, now we're all
                living our separate lives, it really makes me feel sad.)
                <br />
                After providing this description,
                <br />
                you can choose whether or not to further detail the specifics of
                your memories.
                <br />
                If you can recall the temporal context of these memories,
                <br />
                such as a few years ago or a specific stage of your life,
                <br />
                we also hope you could briefly describe it in the input box.
                <br />
                <br />
              </p>
            </div>
          )}
        </div>
        <br />
      </div>
    );
  }
}

export default Faq;
