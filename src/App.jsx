import React, { Component } from "react";
import "./App.css";
import Uploader from "./Components/Uploader";
import Preview from "./Components/Preview";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesPreviewUrls: [],
      deleteImageCount: null,
    };
  }

  // valid image list receive and spread all old and new image
  imagesPreviewUrls = (result) => {
    this.setState({
      imagesPreviewUrls: [...this.state.imagesPreviewUrls, result],
    });
  };

  //when click delete button remove all checked image
  //from imagesPreviewUrls state and deleteImageCount state update by null
  deleteImage = () => {
    const { imagesPreviewUrls } = this.state;
    if (imagesPreviewUrls.length > 0) {
      const filterImages = imagesPreviewUrls.filter((image) => image?.isChecked == false);
      this.setState({
        imagesPreviewUrls: filterImages,
        deleteImageCount: null,
      });
    }
  };

  //checked image count manage 
  imageSelect = (isChecked) => {
    this.setState({
      //when checked any image count value 1 increment 
      //when un-checked any image count value 1 dicrement 
      deleteImageCount: isChecked ? this.state.deleteImageCount + 1 : this.state.deleteImageCount - 1,
    });
  };


  render() {
    const { imagesPreviewUrls } = this.state;
    return (
      <>
        <div className="wrapper">
          {/* when checken any image for delete then show delete button and show checked image count number */}
          <div style={{ height: '60px' }} >
            {
              this.state.deleteImageCount > 0 ?
                <div className="flex justify-content-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="multi_items_select_check_box"
                      id={'delete_id'}
                      checked={this.state.deleteImageCount > 0 ? true : false}
                      name={'image_delete'}
                      readOnly
                    />
                    <h3 className="ml-4">{`${this.state.deleteImageCount} File${this.state.deleteImageCount > 1 ? 's' : ''} Selected` } </h3>
                  </div>
                  {/* multiple image delete button */}
                  <a onClick={() => this.deleteImage()} className="delete-button">{`Delete File${this.state.deleteImageCount > 1 ? 's' : ''}`}</a>
                </div>
                :
                <div className="flex justify-content-between items-center">
                  <h3>Image Gallery</h3>
                </div>
            }
          </div>
          <hr />

          <div className="grid">
            {/* call image preview component */}
            {/* pass two props, 1 image list state 2 image checked count manage method*/}
            {imagesPreviewUrls.length > 0 ? (
              <Preview
                imagesPreviewUrls={imagesPreviewUrls}
                imageSelect={this.imageSelect}
              />
            ) : null}

            {/* call image uploader component pass 1 props method that give valid image list*/}
            <Uploader imagesPreviewUrls={this.imagesPreviewUrls} />
          </div>

        </div>

      </>
    );
  }
}

export default App;
