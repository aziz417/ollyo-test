import React, { Component } from "react";
import "./App.css";
import Uploader from "./Components/Uploader";
import Preview from "./Components/Preview";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesPreviewUrls: [],
    };
  }

  imagesPreviewUrls = (result) => {
    this.setState({
      imagesPreviewUrls: [...this.state.imagesPreviewUrls, result],
    });
  };

  deleteImage = (ids) => {
    const { imagesPreviewUrls } = this.state;
    if (imagesPreviewUrls.length > 0) {
      const filterImages = imagesPreviewUrls.filter((image) => !ids.includes(image.id));
      this.setState({
        imagesPreviewUrls: filterImages,
      });
    }
  };

  render() {
    const { imagesPreviewUrls } = this.state;
    // console.log(imagesPreviewUrls);
    return (
      <div>
       
        {imagesPreviewUrls.length > 0 ? (
          <Preview
            imagesPreviewUrls={imagesPreviewUrls}
            deleteImage={this.deleteImage}
          />
        ) : null}

        <Uploader imagesPreviewUrls={this.imagesPreviewUrls} />
      </div>
    );
  }
}

export default App;
