import React, { Component } from 'react';
import '../css/common.css';
import VAbg from '../imgs/va model.png';
import RDot from '../imgs/red-dot.png';
import BDot from '../imgs/blue-dot.png';
import { Button } from 'react-bootstrap';

import '../css/va.css';

class VAcanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      x1: 0,
      y1: 0,
      val1x: -50,
      val1y: -50,
      imgHeight: 800,
      imgWidth: 800,
      rdotdisplay: 'none',
      color: '#666666',
      rate: 0,
      fam: 0,
      favorite: 0,
      overallRate: 0,
      canvasNotFilled: false,
      rateNotFilled: false,
      famNotFilled: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    var w = this.props.width;
    // console.log(w);
    //console.log("w: " + w);
    if (w < 800) {
      this.setState({ imgHeight: w, imgWidth: w });
    }
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    var w = this.props.width;
    if (w < 800) {
      this.setState({ imgHeight: w, imgWidth: w });
    } else {
      this.setState({ imgHeight: 800, imgWidth: 800 });
    }
    // this.setState({ imgHeight: 800, imgWidth: 800 });
  }

  updateField = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  selectRate = (e) => {
    this.setState({ rate: e.target.value });
    this.setState({ rateNotFilled: false });
  };

  selectFam = (e) => {
    this.setState({ fam: e.target.value });
    this.setState({ famNotFilled: false });
  };

  onMouseMove = (e) => {
    var x =
      e.nativeEvent.offsetX +
      (e.nativeEvent.offsetX % parseInt(this.state.imgWidth / 20)) -
      ((e.nativeEvent.offsetX +
        (e.nativeEvent.offsetX % parseInt(this.state.imgWidth / 20))) %
        parseInt(this.state.imgWidth / 10)) -
      10;
    var y =
      e.nativeEvent.offsetY +
      (e.nativeEvent.offsetY % parseInt(this.state.imgHeight / 20)) -
      ((e.nativeEvent.offsetY +
        (e.nativeEvent.offsetY % parseInt(this.state.imgHeight / 20))) %
        parseInt(this.state.imgHeight / 10)) -
      10;
    this.setState({ x1: x, y1: y });
    // console.log(`x2:${this.state.val1x},y2:${this.state.val1y}`);
    // console.log(x, y);
    //this.setState({x1: x, y1: y });
    var w = this.props.width;
    this.setState({
      //  val1x: parseInt(x / (this.state.imgWidth / 11)) - 5,
      val1x: Math.round((x + 10) / (w / 10) - 5),
      val1y: Math.floor(-((y + 10) / (w / 10) - 10)),
    });

    if (
      Math.abs(parseInt(x / (this.state.imgWidth / 11)) - 5) <= 5
      // Math.abs(10 - parseInt(0.2 + y / (this.state.imgHeight / 11)) - 5) <= 5
    ) {
      this.setState({ rdotdisplay: '' });
    } else {
      this.setState({ rdotdisplay: 'none' });
    }
  };

  handleButtonClick = () => {
    //console.log("handleButtonClick");

    if (
      this.state.val1x < -5 ||
      this.state.val1x > 5 ||
      this.state.val1y < 0 ||
      this.state.val1x > 10
    ) {
      this.setState({ canvasNotFilled: true });
      this.setState({ color: '#dd0000' });
    }
    if (this.props.step > 1 && this.state.rate === 0) {
      this.setState({ rateNotFilled: true });
    }
    if (
      this.state.val1x >= -5 &&
      this.state.val1x <= 5 &&
      this.state.val1y >= 0 &&
      this.state.val1y <= 10 &&
      (this.props.step === 1 || this.state.rate !== 0)
    ) {
      //console.log(this.state.val1x + this.state.val1x);
      this.props.processVA(
        this.state.y1,
        this.state.x1,
        this.state.val1x,
        this.state.val1y,
        this.state.rate,
        this.state.fam
      );
    }
  };

  render() {
    return (
      <div>
        <div style={{ position: 'relative' }}>
          <img
            src={VAbg}
            className='va-background'
            onClick={this.onMouseMove.bind(this)}
            width={this.state.imgWidth}
            height={this.state.imgHeight}
            alt='Valence-arousal background'
          />
          {Math.abs(this.state.val1x) <= 5 && (
            <h1 className='hint'>
              Your current Valence value is: {this.state.val1x}, and your
              Arousal value is: {this.state.val1y}.
            </h1>
          )}

          <img
            src={BDot}
            style={{
              position: 'absolute',
              top: this.props.top - 5 + 'px',
              left: this.props.left + 'px',
              display: this.props.display,
            }}
            width={20}
            height={20}
            alt='red dot'
          />
          <img
            src={RDot}
            style={{
              position: 'absolute',
              top: this.state.y1 - 5 + 'px',
              left: this.state.x1 + 'px',
              display: this.state.rdotdisplay,
            }}
            width={20}
            height={20}
            alt='blue dot'
          />
          {this.props.step <= 9 && this.props.step > 1 && (
            <div>
              {!this.state.rateNotFilled && (
                <p
                  className='hint hintsm'
                  style={{
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    display: 'inline',
                  }}
                >
                  Please rate the recommendation for this music segment:
                </p>
              )}
              {this.state.rateNotFilled && (
                <p
                  className='hint hintsm'
                  style={{
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    display: 'inline',
                    color: '#dd0000',
                  }}
                >
                  Please rate the recommendation for this music segment:
                </p>
              )}
              <select
                value={this.state.rate}
                onChange={this.selectRate}
                style={{ display: 'inline' }}
              >
                <option value={0}> (Empty) </option>
                <option value={1}> Very Disappointed </option>
                <option value={2}> Somewhat Disappointed </option>
                <option value={3}> Neutral </option>
                <option value={4}> Quite Satisfied </option>
                <option value={5}> Very Satisfied </option>
              </select>
              <br />
              <br />
              {!this.state.rateNotFilled && (
                <p
                  className='hint hintsm'
                  style={{
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    display: 'inline',
                  }}
                >
                  Please select your level of familiarity with this music
                  segment:
                </p>
              )}
              {this.state.rateNotFilled && (
                <p
                  className='hint hintsm'
                  style={{
                    marginBottom: '0px',
                    paddingBottom: '0px',
                    display: 'inline',
                    color: '#dd0000',
                  }}
                >
                  Please select your level of familiarity with this music
                  segment:
                </p>
              )}
              <select
                value={this.state.fam}
                onChange={this.selectFam}
                style={{ display: 'inline' }}
              >
                <option value={0}> (Empty) </option>
                <option value={1}> Not familiar </option>
                <option value={2}> Possibly heard before </option>
                <option value={3}> Fairly familiar </option>
                <option value={4}> Very familiar </option>
                <option value={5}> Familiar and like it </option>
              </select>
              <br />
              <br />
              <p
                className='hint hintsm'
                style={{ color: '#dd5500', fontWeight: 'bolder' }}
              >
                Your current emotion input will not affect the music
                recommendation for this round.
              </p>
            </div>
          )}
          {this.props.step <= 9 && (
            <div>
              <Button
                className='testButtonDisplay'
                onClick={() => this.handleButtonClick()}
              >
                Continue the experiment.
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default VAcanvas;
