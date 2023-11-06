import React, { Component, Fragment } from "react";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImages: [],
      dragId: "",
      isChecked: false,
    };
  }

  componentDidMount() {
    const { imagesPreviewUrls } = this.props;
    this.setState({
      previewImages: imagesPreviewUrls,
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.imagesPreviewUrls !== state.previewImages) {
      return {
        previewImages: props.imagesPreviewUrls,
      };
    }
    return null;
  }


  // multiple deleteable image select
  deleteImageSelect = (id, e) => {
    const { previewImages } = this.state;
    if (previewImages.length > 0) {
      let new_array = previewImages.map((item) => {
        if (item.id == id) {
          // set image checked true false and checked list count props method call
          item.isChecked = e.target.checked;
          this.props.imageSelect(e.target.checked)
        }
      })

      this.setState({ previewImages: new_array })
    }
  };


  handleOver = (ev) => {
    ev.preventDefault();
  };

  handleDrag = (ev) => {
    this.setState({
      dragId: ev.currentTarget.id,
    });
  };

  handleDrop = (ev) => {
    ev.preventDefault();
    const { previewImages } = this.state;
    const { dragId } = this.state;
    const dragImage = previewImages.find((image) => image.id == dragId);
    const dropImage = previewImages.find(
      (image) => image.id == ev.currentTarget.id
    );
    const arr = this.moveItem(dragImage.id - 1, dropImage.id - 1);

    this.setState({
      previewImages: arr,
    });
  };

  moveItem(from, to) {
    const { previewImages } = this.state;
    const f = previewImages.splice(from, 1)[0];
    previewImages.splice(to, 0, f);
    return previewImages;
  }

  renderPreview() {
    const { previewImages } = this.state;
    if (previewImages.length > 0) {
      previewImages.map((items, index) => {
        items.id = index + 1;
      });
    }

    return (
      <Fragment>

        {previewImages.length > 0 &&
          previewImages.map((element, index) => {
            return (
              <div
                className={`gallery`}
                key={index}
                id={element.id}
                draggable
                onDragOver={(e) => this.handleOver(e)}
                onDragStart={(e) => this.handleDrag(e)}
                onDrop={(e) => this.handleDrop(e)}
              >
                {/* when checkout per item opacitiy manage */}
                <img
                  className={`gallery-image ${element.isChecked ? 'opaciti-zero-3' : ''}`}
                  src={element.file}
                  alt={element.name}
                />
                {/* when checkout per item opacitiy manage */}
                <div className={`check-box-section ${element.isChecked ? 'opaciti-zero-1' : ''}`}>
                  <input
                    type="checkbox"
                    id={element.id}
                    checked={element.isChecked}
                    name={'image'}
                    onChange={(e) => {
                      this.deleteImageSelect(element.id, e)
                    }}
                  />
                </div>

              </div>
            );
          })}
      </Fragment>
    );
  }

  render() {
    return <>{this.renderPreview()}</>;
  }
}

export default Preview;
