
import {observable, action} from 'mobx';


export class NavState {
  @observable route: string;
  @observable chartDrawerRoute: string;
  @observable mlDrawerRoute: string;
  @observable items: any[] = []
  @observable farItems: any[] = []

  constructor(){
    this.route = 'home'
 };

  @action.bound goTo = (inputRoute: string) => this.route = inputRoute;
  @action.bound goToChartDrawer = (inputRoute: string) => this.chartDrawerRoute = inputRoute;
  @action.bound goToMlDrawer = (inputRoute: string) => this.mlDrawerRoute = inputRoute;

}
