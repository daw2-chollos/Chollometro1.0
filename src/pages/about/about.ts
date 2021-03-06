import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false, 'myMenu');
  }

}
