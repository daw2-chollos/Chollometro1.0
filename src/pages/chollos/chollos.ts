import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { UploadPage } from "../upload/upload";
import { ChollosProvider } from "../../providers/chollos/chollos"
import {visitValue} from "@angular/compiler/src/util";
import {CholloDetailPage} from "../chollo-detail/chollo-detail";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the ChollosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chollos',
  templateUrl: 'chollos.html',
})
export class ChollosPage {

  chollitos : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingController: LoadingController, public provChollo: ChollosProvider) {
  }


  //Usamos ionViewWillEnter para que cuando creas un chollo  te devuelva a ChollosPage y te cargue el nuevo chollo que
  //se ha subido a la base de datos.

  ionViewWillEnter() {
    let loader = this.loadingController.create({
      content: "Cargando los mejores chollos"
    });
    loader.present()
    this.provChollo.getChollos()
      .then((snapshot) => {
        //Vaciamos el vector pq cuando subimos un nuevo chollo, se quedan en el vector los anteriores chollos
        // y además carga otra vez todos y el nuevo
        this.chollitos = [];
        for (let k in snapshot) {
          this.chollitos.push({
            id: k,
            title: snapshot[k].title,
            desc: snapshot[k].desc,
            url: snapshot[k].url,
            user: snapshot[k].user,
            date: snapshot[k].date,
          })
        }
      })
      .then(() => loader.dismiss())
      .then(()=>console.log(this.chollitos));

  }


  goToUploadPage(){
    this.navCtrl.push(UploadPage);
  }


  goToCholloDetail(id: any) {
    this.navCtrl.push(CholloDetailPage,id);
  }
}
