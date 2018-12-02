import React, { Component } from "react";

class FontPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontValue: "Lorem ipsum",
      fontStyle: "",
      fontWeight: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFontStyle = this.handleFontStyle.bind(this);
    this.handleFontWeight = this.handleFontWeight.bind(this);
  }

  handleFontStyle(e) {
    this.setState({ fontStyle: e.target.value });
  }

  handleFontWeight(e) {
    this.setState({ fontWeight: e.target.value });
  }

  handleInputChange(e) {
    this.setState({ fontValue: e.target.value });
  }

  render() {
    const { fontValue, fontWeight, fontStyle } = this.state;
    const { fontFamily } = this.props;

    return (
      <div className="c-detailss">
        <div className="form-group">
          <div className="row">
            <div className="col-lg-3 mb-2">
              <input
                type="text"
                className="form-control"
                value={fontValue}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="col-lg-3 mb-2">
              <select
                onChange={this.handleFontWeight}
                className="custom-select"
              >
                <option>Font weight</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
              </select>
            </div>

            <div className="col-lg-3 mb-2">
              <select onChange={this.handleFontStyle} className="custom-select">
                <option>Font style</option>
                <option value="normal">normal</option>
                <option value="italic">italic</option>
                <option value="oblique">oblique</option>
              </select>
            </div>
          </div>
        </div>

        <div className="c-font-preview">
          <h1
            className="mt-4"
            style={{
              fontFamily: fontFamily,
              fontWeight: fontWeight,
              fontStyle: fontStyle
            }}
          >
            {fontValue}
          </h1>
          <h2
            className="mt-4"
            style={{
              fontFamily: fontFamily,
              fontWeight: fontWeight,
              fontStyle: fontStyle
            }}
          >
            {fontValue}
          </h2>
          <h3
            className="mt-4"
            style={{
              fontFamily: fontFamily,
              fontWeight: fontWeight,
              fontStyle: fontStyle
            }}
          >
            {fontValue}
          </h3>
          <h4
            className="mt-4"
            style={{
              fontFamily: fontFamily,
              fontWeight: fontWeight,
              fontStyle: fontStyle
            }}
          >
            {fontValue}
          </h4>
          <p
            className="mt-4"
            style={{
              fontFamily: fontFamily,
              fontWeight: fontWeight,
              fontStyle: fontStyle
            }}
          >
            {fontValue}
          </p>
        </div>
      </div>
    );
  }
}

export default FontPreview;
