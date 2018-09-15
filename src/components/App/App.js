import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            uploadedFileCloudinaryUrl: '',
         };
    }
    onImageDrop = (files) => {
        const CLOUDINARY_UPLOAD_PRESET = 'ffusji9p';
        const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/db0oxvrdr/image/upload'

        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', files[0])
            upload.end((err, response) => {
                if (err) {
                  console.error(err);
                }
          
                if (response.body.secure_url !== '') {
                  this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                  }, () => console.log(this.state.uploadedFileCloudinaryUrl));
                }
              });
    }
    removeImage = () => {
        this.setState({ uploadedFileCloudinaryUrl: ''})
    }
    render() {
        return (
            <div>
            {(this.state.uploadedFileCloudinaryUrl) ? 
                <React.Fragment>
                    <img src={`${this.state.uploadedFileCloudinaryUrl}`} width="150px"/>
                    <button onClick={this.removeImage}>REMOVE IMAGE</button>
                </React.Fragment>
                : <div>
                    <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop}>
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                </div>
            }
          </div>
        )
    }
}

export default App;