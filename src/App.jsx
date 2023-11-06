import React, { Component } from "react";
import "./App.css";
import Uploader from "./Components/Uploader";
import Preview from "./Components/Preview";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesPreviewUrls: [],
      deleteImageIds: null,
    };
  }

  imagesPreviewUrls = (result) => {
    this.setState({
      imagesPreviewUrls: [...this.state.imagesPreviewUrls, result],
    });
  };

  deleteImage = () => {
    const { imagesPreviewUrls } = this.state;
    if (imagesPreviewUrls.length > 0) {
      const filterImages = imagesPreviewUrls.filter((image) => image?.isChecked == false);
      this.setState({
        imagesPreviewUrls: filterImages,
        deleteImageIds: null,
      });
    }
  };

  imageSelect = (isChecked) => {
    this.setState({
      deleteImageIds: isChecked ? this.state.deleteImageIds + 1 : this.state.deleteImageIds - 1,
    });
  };


  render() {
    const { imagesPreviewUrls } = this.state;
    return (
      <>
        <div className="wrapper">
          {
            this.state.deleteImageIds > 0 ?
              <div className="flex justify-content-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="multi_items_select_check_box"
                    id={'delete_id'}
                    checked={this.state.deleteImageIds > 0 ? true : false}
                    name={'image_delete'}
                    readOnly
                  />
                  <h3 className="ml-4">{this.state.deleteImageIds} Files Selected</h3>
                </div>
                <a onClick={() => this.deleteImage()} className="delete-button">Delete File</a>
              </div>
              :
              <h3>Image Gallery</h3>
          }
          <hr />

          <div className="grid">
            {imagesPreviewUrls.length > 0 ? (
              <Preview
                imagesPreviewUrls={imagesPreviewUrls}
                imageSelect={this.imageSelect}
              />
            ) : null}

            <Uploader imagesPreviewUrls={this.imagesPreviewUrls} />
          </div>

        </div>

      </>
    );
  }
}

export default App;
