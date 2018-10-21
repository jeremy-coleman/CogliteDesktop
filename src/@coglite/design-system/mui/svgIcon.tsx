import * as React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon';
export let CreateSvGIcon = (path) => {
  const Icon = (props) => <SvgIcon {...props}><path d={path} /></SvgIcon>
  Icon.muiName = 'SvgIcon'
  return Icon
}