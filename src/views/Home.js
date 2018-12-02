import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import FontPreview from "../components/FontPreview/FontPreview";
import FontList from "../components/FontList/FontList";
import "./Home.css";

const API_KEY = "AIzaSyDAxaUkDs9VFQEgAssx6nKJCaRpEwcFYwc";
const GOOGLE_FONTS_URL = "https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fonts: [],
      favourites: [],
      font: "",
      fontVariants: "",
      fontFamily: "",
      stylePath: "",
      error: null,
      isLoading: false
    };

    this.handleFontClick = this.handleFontClick.bind(this);
    this.handleFontLoad = this.handleFontLoad.bind(this);
  }

  componentWillMount() {
    this.getFonts();
  }

  getFonts() {
    this.setState({ isLoading: true });
    const cachedItems = JSON.parse(localStorage.getItem("fonts"));

    /* Check if fonts has been cached in the localStorage */
    if (cachedItems === null) {
      axios
        .get(`${GOOGLE_FONTS_URL}${API_KEY}`)
        .then(response => {
          let fonts = response.data.items;
          localStorage.setItem("fonts", JSON.stringify(fonts));
          this.setState({
            fonts: fonts,
            isLoading: false
          });
        })
        .catch(error => {
          this.setState({
            error,
            isLoading: false
          });
        });
    } else {
      this.setState({
        fonts: cachedItems,
        isLoading: false
      });
    }

    /* Get favourite items from Firebase DB */
    this.getFavouritesFromDB();
  }

  getFavouritesFromDB() {
    this.setState({ isLoading: true });

    let dbCon = this.props.db.database().ref("/favourites");
    dbCon.on("value", snapshot => {
      let dbResult = snapshot.val();
      let favourites = _(dbResult)
        .keys()
        .map(favouritesKey => {
          let cloned = _.clone(JSON.parse(dbResult[favouritesKey].font));
          return cloned;
        })
        .value();

      let fonts = _.unionBy(favourites, this.state.fonts, 'family');

      this.setState({
        favourites: favourites,
        fonts: fonts,
        isLoading: false
      });
    });
  }

  markAsFavourite(font, index) {
    let fonts = this.state.fonts;
    fonts[index].favourites = true;

    /* Check if item has already been marked as favourite */
    let query = this.state.favourites.find(item => {
      return item.family === font.family;
    });

    if (typeof query === "undefined") {
      this.setState({
        fonts: fonts,
        favourites: [...this.state.favourites, font]
      });

      /* Save favourite item in Firebase DB */
      let dbCon = this.props.db.database().ref("/favourites");
      dbCon.push({
        font: JSON.stringify(font)
      });
    }
  }

  handleFontClick(font, index, favourites = false) {
    this.setState({ isLoading: true });

    /* Generate font url */
    let url = "https://fonts.googleapis.com/css?family=";
    url += font.family.replace(/ /g, "+");
    url += `:${font.variants[0]}`;
    for (let i = 1; i < font.variants.length; i += 1) {
      url += `,${font.variants[i]}`;
    }

    this.setState({
      stylePath: url,
      font: font.family,
      isLoading: false,
      fontVariants: font.variants,
      activeFont: !favourites ? index : ""
    });

    /* Check if there are more than two added stylesheets and remove them */
    const $tempStyle = document.querySelectorAll("[data-stylesheet]") || "";
    if ($tempStyle.length > 1) {
      $tempStyle[0].parentNode.removeChild($tempStyle[0]);
    }

    /* Create new stylesheet element based on generated url and append it */
    const $link = document.createElement("link");
    $link.rel = "stylesheet";
    $link.href = url;
    $link.setAttribute("data-stylesheet", "");
    $link.addEventListener("load", () => this.handleFontLoad());
    document.head.appendChild($link);
  }

  handleFontLoad() {
    this.setState({
      fontFamily: this.state.font
    });
  }

  render() {
    const {
      fontFamily,
      isLoading,
      fontVariants,
      fonts,
      activeFont
    } = this.state;

    if (isLoading) {
      return (
        <div className="c-loading">
          <span>Loading...</span>
        </div>
      );
    }

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-8 mb-4">
            <FontPreview fontVariants={fontVariants} fontFamily={fontFamily} />
          </div>
          <div className="col-lg-4">
            <h3>Fonts</h3>
            <FontList
              active={activeFont}
              fonts={fonts}
              onClick={(font, index) => this.handleFontClick(font, index)}
              markAsFavourite={(font, index) =>
                this.markAsFavourite(font, index)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
