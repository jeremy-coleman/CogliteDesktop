import { getId } from 'office-ui-fabric-react';
import * as React from 'react';

import IconButton from '@material-ui/core/IconButton'
import Clear from '@material-ui/icons/Clear'

import Button from '@material-ui/core/Button'

import InputLabel from '@material-ui/core/InputLabel'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from'@material-ui/core/FormControl'
import FormControlLabel from'@material-ui/core/FormControlLabel'

import FormGroup from'@material-ui/core/FormGroup'
import Typography from '@material-ui/core/Typography'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'

import FileUpload from '@material-ui/icons/CloudUpload'

interface IFileFieldProps {
  name: string,
  label: string
  onChange: any,
  helperText: string,
  formControlProps: object,
  inputLabelProps: object,
  inputProps: object,
}


class FileField extends React.Component<IFileFieldProps, any> {
  fileInputRef: any;
  
  constructor(props) {
    super(props)
    this.state = {
      file: '',
    }
  }

  handleClickUploadButton() {
    this.fileInputRef.click()
  }

  getFileName(file) {
    return file && file.name
  }

  handleFileChange(event) {
    const file = event.target.files[0]

    if (!file) return

    this.setState({ file })

    this.props.onChange(file)
  }

  render() {
    return (
      <FormControl fullWidth {...this.props.formControlProps}>
        <InputLabel
          htmlFor={this.props.name}
          shrink={true}
          {...this.props.inputLabelProps}
        >
          {this.props.label}
        </InputLabel>
        <Input
          type="text"
          endAdornment={<FileUpload />}
          value={this.getFileName(this.state.file)}
          onClick={() => this.handleClickUploadButton()}
          {...this.props.inputProps}
        />
        <input
          ref={input => {
            this.fileInputRef = input
          }}
          type="file"
          style={{ display: 'none' }}
          onChange={e => this.handleFileChange(e)}
        />
        {this.props.helperText && (
          <FormHelperText>{this.props.helperText}</FormHelperText>
        )}
      </FormControl>
    )
  }
}


export { IFileFieldProps, FileField }

