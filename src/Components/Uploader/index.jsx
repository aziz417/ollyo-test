import React, { Component } from "react";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageValidationError: null,
    };
  }

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

  checkMimeType(event) {
    const { files } = event.target;
    let err = "";
    const types = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    for (let x = 0; x < files.length; x += 1) {
      if (types.every((type) => files[x].type !== type)) {
        err += `${files[x].type} is not a supported format\n`;
      }
    }

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
            <input
              type="file"
              name="file"
              id="file"
              className="custom-file-input"
              onChange={this.filesSelectedHandler}
              accept="image/png, image/jpeg, image/webp"
              multiple
            />
            <p>Add Images.</p>
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
