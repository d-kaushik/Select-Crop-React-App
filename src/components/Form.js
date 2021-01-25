import React, { Component } from 'react'

import { ImageCropper } from './ImageCropper'

export class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errFile: '',
      imgSrc: null,
    }
  }

  FileChange = (event) => {
    const val = event.target.value
    if (!val.endsWith('.jpg')) {
      this.setState({ errFile: <small style={{ color: 'red' }}>Only JPG file Allowed</small> })
    } else {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          this.setState({ imgSrc: reader.result })
        },
        false
      )
      reader.removeEventListener('loadend', () => {})
      if (event.target.files[0] !== '') {
        reader.readAsDataURL(event.target.files[0])
      }
    }
  }

  render() {
    let args
    const { imgSrc } = this.state
    const { errFile } = this.state
    if (imgSrc != null) {
      args = <ImageCropper src={imgSrc} />
    }
    return (
      <div className="container shadow">
        <div className="card">
          <h5 className="card-header">Select and Crop Image</h5>
          <div className="card-body">
            <h6 className="card-title">Select Image for cropping</h6>
            <input
              type="file"
              accept=".jpg"
              className="form-control-file border"
              name="file"
              onChange={this.FileChange}
            />
            {errFile}
          </div>
        </div>
        <div className="card mt-3">{args}</div>
      </div>
    )
  }
}
export default Form
