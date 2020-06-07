import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioServiceService } from '../services/usuario-service.service';
import { Observable } from 'rxjs';
import { ToastController, AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuarios$: Observable<Usuario[]>;
  constructor(
    private usuarioService: UsuarioServiceService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  )
  {

  }

  ngOnInit() {
    this.usuarios$ = this.usuarioService.getAll();
  }

  async edit(u: Usuario){
    const alert = await this.alertCtrl.create({
      inputs:[
        {
          name: 'matricula',
          type: 'number',
          min: 0,
          max: 999,
          label: 'Matrícula',
          value: u.matricula
        },
        {
          name: 'nome',
          type: 'text',
          label: 'Nome',
          value: u.nome
        },
        {
          name: 'cargo',
          type: 'text',
          value: u.cargo,
          label: 'Cargo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data: any) => {
            // const _u: Usuario = {
            //   matricula: data.matricula,
            //   nome: data.nome,
            //   cargo: data.cargo
            // };
            // console.log('Confirm Ok', _u);
            // this.usuarioService.save(_u)
            u.matricula = data.matricula;
            u.nome = data.nome;
            u.cargo = data.cargo;
            console.log('Confirm Ok', u);
            this.usuarioService.save(u)
            .pipe(
              take(1)
            )
            .subscribe( async i => {
              console.log('usuarioService');
              (await this.toastCtrl.create({
                message: 'Usuário salvo com sucesso',
                position: 'bottom',
                duration: 2000
              })).present();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  delete(u: Usuario){
    this.usuarioService.delete(u)
    .pipe(
      take(1)
    )
    .subscribe( async i => {
      const toast = await this.toastCtrl.create({
        message: 'Usuário excluído com sucesso',
        position: 'bottom',
        duration: 2000
      });
      toast.present();
    });
  }

}
