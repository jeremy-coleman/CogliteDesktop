import { createMuiTheme as Mui} from "@material-ui/core/styles"
import { observable, computed, action } from "mobx"
import {loadTheme} from 'office-ui-fabric-react'
import * as _ from 'lodash'

export const palette = {
  myriad: {
    primary: "#F44336",
    secondary: "#FFD740",
    background: "#FFFFFF",
  },
  ranger: {
    primary: "#2196F3",
    secondary: "#FFE57F",
    background: "#FFFFFF",
  },
  velocity: {
    primary: "#FFA000",
    secondary: "#607D8B",
    background: "#FFFFFF",
  },
}


export class ToggleValue {
  @observable open = false

  @action
  toggleDrawer = () => {
    this.open = !this.open
  }
}

export class ThemeState {

  @observable themeId = "myriad"
  
  @observable SettingsModalToggle = new ToggleValue()


  //constructor() {}

  @computed
  get muiTheme() {
    const basicTheme =  Mui({
      palette: {
        primary: {
          main: palette[this.themeId].primary,
        },
        secondary: {
          main: palette[this.themeId].secondary,
        }
      },
      
  //   props: {
  //   MuiButtonBase: {
  //     // No more ripple, on the whole application 💣!
  //     disableRipple: true, 
  //   },
  // },
    })
    basicTheme["shape"] = {
      borderRadius: 4
    }
    console.log(basicTheme)
    return basicTheme
  }
  
  @computed
  get fabricTheme(){
    let fabricTheme = loadTheme({
      palette:{
          themePrimary: palette[this.themeId].primary
          //themeSecondary: string;
      }
    })
    return fabricTheme
    
   
  }


@computed 
get combinedTheme(){
  let combinedTheme = _.merge(this.muiTheme, this.fabricTheme)
  return combinedTheme
}

  @action
  updateTheme(themeId) {
    this.themeId = themeId
  }


}

export const themeState = new ThemeState()
export const theme = themeState.combinedTheme
export default theme
