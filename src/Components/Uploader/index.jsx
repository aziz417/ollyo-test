import React, { Component } from "react";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageValidationError: null,
    };
  }

  // multiple file select and configure file render
  filesSelectedHandler = (e) => {
    if (this.checkMimeType(e)) {
      const { imagesPreviewUrls } = this.props;
      const files = Array.from(e.target.files);
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = {
            file: reader.result,
            size: file.size,
            name: file.name,
            isChecked: false,
          };
          this.setState({ imageValidationError: null });
          imagesPreviewUrls(result);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // check mime type and validation set image size 2mb  
  checkMimeType(event) {
    const { files } = event.target;
    let size = 2;
    let err = "";
    // set avable extentions / type
    // set validation message and type messages
    const types = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    for (let x = 0; x < files.length; x += 1) {
      if (types.every((type) => files[x].type !== type)) {
        err += `${files[x].type} is not a supported format\n`;
      }
      // convert kb to mb
      const fileSize = ((files[x].size / 1024) / 1024).toFixed(2)
      if (fileSize > size) {
        err += `Must be with in ${size} MB\n`;
      }
    }

    // error message set state and event target value null set
    if (err !== "") {
      event.target.value = null;
      this.setState({ imageValidationError: err });
      return false;
    }
    return true;
  }

  render() {
    const { imageValidationError } = this.state;
    return (
      <>
        <div className="uploads">
          <div id="main">
            {/* multiple file input field */}
            <input
              type="file"
              name="file"
              id="file"
              className="custom-file-input"
              onChange={this.filesSelectedHandler}
              accept="image/png, image/jpeg, image/webp"
              multiple
            />
            <p>Add Images within 2MB.</p>
            {/* show error message list  */}
            {imageValidationError ? (
              <span className="error-msg">{imageValidationError}</span>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default Uploader;
