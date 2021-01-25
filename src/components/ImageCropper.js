import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cropper from 'cropperjs'

export class ImageCropper extends Component {
  constructor() {
    super()
    this.state = {
      imageDestination: '',
    }
    this.imageElement = React.createRef()
  }

  componentDidMount() {
    const cropper = new Cropper(this.imageElement.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper.getCroppedCanvas()
        this.setState({ imageDestination: canvas.toDataURL('image/png') })
      },
    })
  }

  componentWillUnmount() {}

  render() {
    const { imageDestination } = this.state
    const { src } = this.props
    return (
      <div>
        <div>
          <img ref={this.imageElement} src={src} alt="Source" />
        </div>
        <br />
        <div className="rounded mx-auto d-block">
          <img src={imageDestination} className="img-preview mx-auto d-block" alt="Destination" />
        </div>
      </div>
    )
  }
}
ImageCropper.propTypes = {
  src: PropTypes.string,
}
ImageCropper.defaultProps = {
  src: '',
}
export default ImageCropper
