
declare module "file-loader?!*"
declare module "url-loader?!*"
declare module "*.json"
declare module "*.png"

import {IStyle} from 'office-ui-fabric-react'
import {types} from 'typestyle'
declare type IStyle = IStyle | types.CSSProperties