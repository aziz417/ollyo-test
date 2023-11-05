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
      deleteImageIds: [],
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
    if (this.state.deleteImageIds?.length > 0) {

      this.state.deleteImageIds.map((id) => (
        this.props.deleteImage(id)
      ))

      this.setState({
        deleteImageIds: [],
      });
    }


  };

  deleteImageSelect = (id) => {
    if (!this.state.deleteImageIds.includes(id)) {
      this.setState({
        deleteImageIds: [...this.state.deleteImageIds, id],
      });
    } else {
      const index = this.state.deleteImageIds.indexOf(id);
      console.log(this.state.deleteImageIds, index);
      if (index > -1) { // only splice array when item is found
        this.setState({
          deleteImageIds: [...this.state.deleteImageIds.splice(index, 1)],
        });
      }

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
      width: '415px',
      height: '352px'
    }

    const full_image_img = {
      height: '100%'
    }

    return (
      <Fragment>
        {this.state.deleteImageIds?.length > 0 ?
          <div className="flex justify-content-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="multi_items_select_check_box"
                id={'delete_id'}
                checked={this.state.deleteImageIds?.length > 0 ? true : false}
                // value={props.value}
                name={'image_delete'}
                readOnly
              />
              <h3 className="ml-4">{this.state.deleteImageIds?.length} Files Selected</h3>
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
                  className={`gallery-image ${this.state.deleteImageIds?.includes(element.id) ? 'opaciti-zero-3' : ''}`}
                  src={element.file}
                  alt={element.name}
                  style={index == 0 ? full_image_img : { height: '165px' }}
                />

                <div className={`check-box-section ${this.state.deleteImageIds?.includes(element.id) ? 'opaciti-zero-1' : ''}`}>
                  <input
                    type="checkbox"
                    id={element.id}
                    checked={this.isChecked}
                    // value={props.value}
                    name={'image'}
                    onChange={(e) => {
                      this.setState({
                        isChecked: !this.isChecked,
                      });
                      this.deleteImageSelect(element.id)
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
    return <div className="wrapper">{this.renderPreview()}</div>;
  }
}

export default Preview;
