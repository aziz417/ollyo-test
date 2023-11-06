import React, { Component, Fragment } from "react";
import { Media } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImages: [],
      dragId: "",
      isChecked: false,
      deleteImageIds: null,
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

  deleteImage = () => {
    this.props.deleteImage()
    this.setState({ deleteImageIds:null })
  };

  deleteImageSelect = (id, e) => {
    const { previewImages, deleteImageIds } = this.state;
    if (previewImages.length > 0) {
      let new_array = previewImages.map((item, index) => {
        if (item.id == id) {

          item.isChecked = e.target.checked;
          this.setState({ deleteImageIds: e.target.checked ? deleteImageIds + 1 : deleteImageIds - 1 })
        
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

    const full_image_style = {
      width: '425px',
      height: '390px'
    }

    const full_image_img = {
      height: '100%'
    }

    return (
      <Fragment>
        {this.state.deleteImageIds > 0 ?
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
          <h3>Gallery</h3>
        }
        <hr />
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
                style={index == 0 ? full_image_style : {}}
              >
                <img
                  className={`gallery-image ${element.isChecked ? 'opaciti-zero-3' : ''}`}
                  src={element.file}
                  alt={element.name}
                  style={index == 0 ? full_image_img : { height: '185px' }}
                />

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
    const { previewImages } = this.state;
    return <div>{this.renderPreview()}</div>;
  }
}

export default Preview;
