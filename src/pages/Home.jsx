import React, { Component } from 'react';
import Experiment from '../services/Experiment.js';
import { Link } from 'react-router-dom';
import VAcanvas from './VAcanvas.jsx';
import MP3 from './MP3.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../css/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: [],
      memo: '',
      step: 0,
      songnum: 1,
      initop: -50,
      inileft: -50,
      top: -50,
      left: -50,
      width: 0,
      height: 0,
      canvasWidth: 0,
      songs: ['First Song', 'Second Song', 'Third Song', 'Fourth Song'],
      favorite: -1,
      overallRate: -1,
      v: -10,
      a: -10,
      mid: -1,
      url: '',
      rate: -1,
      fam: -1,
      needNewDate: false,
      newDate: new Date(),
      weather: 0,
      context: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    if (this.props.loggedIn === true && this.props.musicNum > 0) {
      //console.log(this.props.musicNum);
      this.setState({
        left: ((5 + this.props.v) * Math.min(800, window.innerWidth)) / 10 - 10,
      });
      this.setState({
        top: ((10 - this.props.a) * Math.min(800, window.innerWidth)) / 10 - 10,
      });
      this.setState({ step: (this.props.musicNum + 1) * 2 });
      this.setState({ songnum: this.props.musicNum + 1 });
      this.setState({ url: this.props.murl });
      this.setState({ mid: this.props.mid });
      //console.log(this.props.v * Math.min(800, window.innerWidth) / 10);
      //console.log(this.props.a * Math.min(800, window.innerWidth) / 10);
      //console.log((this.props.musicNum + 1) * 2 );
    }
    //console.log(this.props.endDate);
    //console.log(this.props.endDate === null);

    this.setState({ needNewDate: true });
    var date = new Date();
    date.setDate(date.getDate() + 6);
    //console.log(date);
    this.setState({ newDate: date });
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    if (window.innerWidth >= 820) {
      this.setState({ canvasWidth: 800 });
      //console.log("window.innerWidth: " + window.innerWidth + "  canvasWidth: " + 800);
    } else {
      this.setState({ canvasWidth: window.innerWidth - 20 });
      //console.log("window.innerWidth: " + window.innerWidth + "  canvasWidth: " + window.innerWidth);
    }
  }

  startNewExperiment = (v, a) => {
    //console.log("in startNewExperiment");
    //console.log(this.props.endDate);
    Experiment.start(
      this.props.uId,
      this.props.expNum,
      v,
      a,
      this.state.weather,
      this.state.context
    )
      .then((response) => {
        //console.log(response);
        if (response !== undefined) {
          this.setState({ url: response.data.murl });
          this.setState({ mid: response.data.mid });
          this.setState({ step: this.state.step + 1 });
        } else {
          alert('User not exist, please register!');
        }
      })
      .catch((error) => console.log(error));
  };

  recordEachMusic = (v, a, rate, fam) => {
    Experiment.musicUpdate(
      parseInt(this.props.uId),
      parseInt(this.props.expNum),
      this.state.songnum - 1,
      parseInt(this.state.mid),
      v,
      a,
      parseInt(rate),
      parseInt(fam)
    )
      .then((response) => {
        //console.log(response);
        if (response !== undefined) {
          this.setState({ url: response.data.murl });
          this.setState({ mid: response.data.mid });
          this.setState({ step: this.state.step + 1 });
        } else {
          alert('Something wrong with musicUpdate, please check!');
        }
      })
      .catch((error) => console.log(error));
  };

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
  };

  selectOverallRate = (e) => {
    this.setState({ overallRate: e.target.value });
  };

  selectFavoriteSong = (e) => {
    this.setState({ favorite: e.target.value });
  };

  selectWeather = (e) => {
    this.setState({ weather: e.target.value });
  };

  selectContext = (e) => {
    this.setState({ context: e.target.value });
  };

  startTest = () => {
    this.setState({ step: this.state.step + 1 });
  };

  endTest = () => {
    if (this.state.overallRate > 0 && this.state.favorite > 0) {
      Experiment.expEnd(
        parseInt(this.props.uId),
        parseInt(this.props.expNum),
        this.state.v,
        this.state.a,
        parseInt(this.state.favorite),
        parseInt(this.state.overallRate)
      ).then((response) => {
        //console.log(response);
      });
      this.props.handleLogOut();
    } else {
      if (this.state.overallRate < 0) {
        this.setState({ overallRate: 0 });
      }
      if (this.state.favorite < 0) {
        this.setState({ favorite: 0 });
      }
    }
  };

  audioEnd = (writingComment) => {
    if (!writingComment) {
      this.setState({
        step: this.state.step + 1,
        songnum: this.state.songnum + 1,
      });
    }
  };

  render() {
    if (this.props.loggedIn === false) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h2 className='login-context'>
            Please log in or register first,
            <br />
            thank you!
          </h2>
          <br />
          <br />
          <br />
          <h3>
            <Link to='/faq'>
              Click here to read the experiment introduction
            </Link>
          </h3>
          <br />
          <br />
          <h3>
            <Link to='/login'>Click here to access the login page</Link>
          </h3>
          <br />
          <br />
          <h3>
            <Link to='/register'>Click here to register an account</Link>
          </h3>
          <br />
          <br />
          <br />
          <br />
          <p>
            For further information, please contact the administrator via
            WeChat:
            <br />
            szxh20190131 or Nag12333.
          </p>
        </div>
      );
    }
    if (this.state.step === 0) {
      return (
        <div className='mainPage'>
          <div className='introclass'>
            <p className='sTitle'>Experiment Entrance</p>
            {this.props.expNum <= 4 && (
              <p className='intro'>
                This experiment aims to test the impact of music on human
                emotions.
                <br />
                The experiment consists of <span className='numOfTest'>
                  4
                </span>{' '}
                rounds,
                {this.state.width >= 600 && <br />}
                and we kindly request you to complete no more than{' '}
                <span className='numOfTest'>2</span> rounds within{' '}
                <span className='numOfTest'>1</span> day.
                {this.state.width >= 600 && <br />}
                Please try to choose different emotional states for the tests
                and finish all <span className='numOfTest'>4</span> rounds
                within <span className='numOfTest'>3</span> days.
                <br />
                Before each round, we will ask you to input your current
                emotional data (using the <Link to='/faq'>V-A model</Link>),
                {this.state.width >= 600 && <br />}
                and then you will listen to <span className='numOfTest'>
                  4
                </span>{' '}
                different pieces of light music.
                <br />
                If the music evokes any memories or emotions,
                {this.state.width >= 600 && <br />}
                we kindly ask you to provide a{' '}
                <span className='numOfTest'>
                  concise and straightforward description
                </span>{' '}
                in the provided text box,
                <br />
                as it will greatly help us understand how memories influence our
                perception of music in our research.
                <br />
                After each piece of music, we will also collect your emotional
                data using the V-A model,
                {this.state.width >= 600 && <br />}
                for comparison purposes in the experiment.
                <br />
                These V-A values will be used to adjust the algorithm and will
                not affect the current round of music recommendation.
                <br />
                <br />
                Please do not leave this page until the experiment is complete.
                <br />
                If you need to leave, please make sure to log in again upon
                returning.
                <br />
                If you log in again within 3 hours after the start of the
                current round,
                <br />
                you will be able to continue from where you left off.
                <br />
                If it exceeds 3 hours, the current round's progress will be
                cleared, and you will need to start the round again.
                <br />
                <br />
                <br />
                This is your{' '}
                <span className='numOfTest'>{this.props.expNum}</span> round of
                the experiment.
              </p>
            )}
            {this.props.expNum > 4 && (
              <p className='intro'>
                You have completed all the experiments. We sincerely appreciate
                your support and assistance!
              </p>
            )}
            <div>
              {this.props.expNum <= 4 && (
                <Button
                  className='testButtonDisplay'
                  onClick={() => this.startTest()}
                >
                  Start Experiment
                </Button>
              )}
              {this.props.expNum > 4 && (
                <Button
                  className='testButtonDisplay'
                  onClick={() => this.props.handleLogOut()}
                >
                  Log Out
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }
    if (this.state.step === 10) {
      return (
        <div className='mainPage'>
          <div className='introclass'>
            <p className='sTitle'>
            Congratulations on completing this round
            </p>
            <p className='hint'>
            Current progress: {this.props.expNum} / 4 <br />
              <br />
              Please complete the remaining parts before
              {/* {isNaN(this.props.endDate.getMonth())
      ? this.state.newDate.getMonth() + 1
      : this.props.endDate.getMonth() + 1} */}
              Month 2
              {/* {isNaN(this.props.endDate.getDate())
      ? this.state.newDate.getDate()
      : this.props.endDate.getDate()} */}
              Day.
            </p>
            <div style={{ display: 'block' }}>
              {this.state.favorite === 0 && (
                <p
                  className='hint'
                  style={{
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    display: 'inline',
                    color: '#dd0000',
                  }}
                >
                  Select your most satisfied music:
                </p>
              )}
              {this.state.favorite !== 0 && (
                <p
                  className='hint'
                  style={{
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    display: 'inline',
                  }}
                >
                  Select your most satisfied music:
                </p>
              )}
              <select
                value={this.state.favorite}
                onChange={this.selectFavoriteSong}
                style={{ display: 'inline' }}
              >
                <option value={0}> （空）</option>
                <option value={1}> {this.state.songs[0]}</option>
                <option value={2}> {this.state.songs[1]}</option>
                <option value={3}> {this.state.songs[2]}</option>
                <option value={4}> {this.state.songs[3]}</option>
              </select>
              <br />
              <br />
              {this.state.overallRate === 0 && (
                <p
                  className='hint'
                  style={{
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    display: 'inline',
                    color: '#dd0000',
                  }}
                >
                  Your overall rate for this round:
                </p>
              )}
              {this.state.overallRate !== 0 && (
                <p
                  className='hint'
                  style={{
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    display: 'inline',
                  }}
                >
                  Your overall rate for this round:
                </p>
              )}
              <select
                value={this.state.overallRate}
                onChange={this.selectOverallRate}
                style={{ display: 'inline' }}
              >
                <option value={0}> (Empty) </option>
                <option value={1}> Very Disappointed </option>
                <option value={2}> Somewhat Disappointed </option>
                <option value={3}> Neutral </option>
                <option value={4}> Quite Satisfied </option>
                <option value={5}> Very Satisfied </option>
              </select>
            </div>
            <br />
            <br />
            <div>
              <Button
                className='testButtonDisplay'
                onClick={() => this.endTest()}
              >
                Complete and log out
              </Button>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.step === 10) {
      return (
        <div className='mainPage'>
          <div className='inTest'>
            <p className='sTitle'>
              Congratulations on completing the music listening part of the
              experiment.
              <br />
              Please complete the following questionnaire to finish the
              experiment:
            </p>
            <div
              style={{
                display: 'block',
                width: this.state.canvasWidth + 'px',
                margin: 'auto',
              }}
            >
              {/*
          <VAcanvas width={this.state.canvasWidth} endTest = {this.endTest} step={this.state.step} display="inherit" top={this.state.top === -50? this.state.initop : this.state.top} left={this.state.left === -50? this.state.inileft : this.state.left}}/>
          */}
            </div>
          </div>
        </div>
      );
    }
    if (this.state.step === 1) {
      return (
        <div className='mainPage'>
          <p className='sTitle'>
          Select the current weather condition:
          </p>
          <select
            className='selectWeather'
            value={this.state.weather}
            onChange={this.selectWeather}
            style={{ display: 'inline' }}
          >
            {
              //onChange需要添加
            }
            {/* <option value={0} defaultValue disabled> （空）</option> */}
            <option value={0}>Sunny</option>
            <option value={1}>Cloudy/Rainy</option>
            <option value={2}>Hot</option>
            <option value={3}>Cold</option>
          </select>
          <p className='sTitle'>Select your current mood:</p>

          <select
            className='selectContext'
            value={this.state.context}
            onChange={this.selectContext}
            style={{ display: 'inline' }}
          >
            {/* <option value={0} defaultValue disabled> （空）</option> */}
            <option value={3}>
              Intense: Breakdown, Anger, Irritability...
            </option>
            <option value={0}>
              Negative: Sickness, Depression, Heartbreak...
            </option>
            <option value={1}>Low: Boredom, Overtime, Solitude...</option>
            <option value={2}>Calm: Reading, Learning, Leisure...</option>
            <option value={5}>
              Positive: Recreational Sports, Traveling...
            </option>
            <option value={6}>
              Excited: Gaming, Competition, Intense Sports...
            </option>
            <option value={4}>Lovely: Romance, Gathering...</option>
          </select>
          <p className='sTitle'>Enter your current Emotion:</p>

          <div
            style={{
              display: 'block',
              width: this.state.canvasWidth + 'px',
              margin: 'auto',
            }}
          >
            <VAcanvas
              width={this.state.canvasWidth}
              processVA={this.processVA}
              step={this.state.step}
              display='none'
            />
          </div>
          {/* </div> */}
        </div>
      );
    }
    if (this.state.step !== 0 && this.state.step % 2 === 0) {
      return (
        <div className='mainPage'>
          <div className='inTest'>
            <p className='sTitle'>
            Listen to the music  {this.state.songnum}/ 4
            </p>
            <div
              style={{
                display: 'block',
                width: this.state.canvasWidth + 'px',
                margin: 'auto',
              }}
            >
              <MP3
                width={this.state.canvasWidth}
                audioEnd={this.audioEnd}
                url={this.state.url}
                expNum={this.props.expNum}
                songNum={this.state.songnum}
                uId={this.props.uId}
              />
            </div>
          </div>
        </div>
      );
    }
    if (this.state.step !== 0 && this.state.step % 2 === 1) {
      return (
        <div className='mainPage'>
          <div className='inTest'>
            <p className='sTitle stsm'>Enter your current emotion:</p>
            <p className='hint itsm'>
              (The blue dot serves as a reference for the previous input)
            </p>
            <div
              style={{
                display: 'block',
                width: this.state.canvasWidth + 'px',
                margin: 'auto',
              }}
            >
              <VAcanvas
                width={this.state.canvasWidth}
                processVA={this.processVA}
                step={this.state.step}
                display='inherit'
                top={
                  this.state.top === -50 ? this.state.initop : this.state.top
                }
                left={
                  this.state.left === -50 ? this.state.inileft : this.state.left
                }
              />
            </div>
          </div>
        </div>
      );
    }
    return <div></div>;
  }
}

export default Home;
