import React, { Component } from "react";
import "./FontList.css";

class FontList extends Component {
  constructor() {
    super();

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems() {
    const { fonts, active } = this.props;

    if (fonts.length === 0) return;

    return fonts.map((font, index) => {
      return (
        <li
          key={index}
          className={"c-list-item " + (index === active ? "active" : "")}
          onClick={() => this.props.onClick(font, index)}
        >
          <span className="c-item__title">{font.family}</span>
          <span
            className={"c-item__favourite " + (font.favourites ? "active" : "")}
            onClick={() => {
              this.props.markAsFavourite(font, index);
            }}
          />
        </li>
      );
    });
  }

  render() {
    const { fonts } = this.props;

    return (
      <div className={fonts.length > 0 ? "c-list" : ""}>
        {this.renderItems()}
      </div>
    );
  }
}

export default FontList;
