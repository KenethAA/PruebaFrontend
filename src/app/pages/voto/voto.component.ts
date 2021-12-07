import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Voto } from 'src/app/models/voto';
import { VotoService } from 'src/app/services/voto.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-voto',
  templateUrl: './voto.component.html',
  styleUrls: ['./voto.component.css']
})

export class VotoComponent implements OnInit {
  form!: FormGroup;
  listOfVoto: Voto[] = [];
  visible = false;
  accion:boolean=true;
  idModificar:string='';

  constructor(
    private votoService: VotoService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      candidato: [''],
      votos: [null],
      designadoPrincipal: [''],
      partido: [''],
      color: ['']
    });
  }

  ngOnInit(): void {
    this.votoService.getAllVoto().toPromise().then(
      (data: Voto[]) => this.listOfVoto = data
    )
  }

  delete(id: string) {
    this.votoService.deleteVoto(id).toPromise().then(() => {
      this.nzMessageService.warning('¡El  voto fue eliminado con exito!');
      this.listOfVoto = this.listOfVoto.filter(x => x.id !== id);
    }, (error) => {
      this.nzMessageService.error('El voto no pudo ser eliminado, por favor intente de nuevo');
      console.error(error);
    })
  }

  cancel(): void {
    this.nzMessageService.info('¡Su voto sigue activo!')
  }

  open(): void {
    this.visible = true;
    this.accion=true;
  }

  close(): void {
    this.visible = false;
    this.buildForm();
  }

  guardar(): void {
    if (this.accion) {
      this.votoService.postVoto(this.form.value).toPromise().then((data: any) => {
      
        this.nzMessageService.success('¡El voto fue ingresado con exito!');
        this.listOfVoto = [...this.listOfVoto, data]
    
        this.buildForm();
        this.visible = false;
      }, (error) => {
        this.nzMessageService.error('El voto no pudo ser ingresado, por favor intente de nuevo');
        console.error(error);
      })
    }else{
      this.votoService.putVoto(this.idModificar,this.form.value).toPromise().then(()=>{
        for(let elemento of this.listOfVoto.filter(x=>x.id===this.idModificar)){
          elemento.candidato=this.form.value.candidato;
          elemento.votos= this.form.value.votos;
          elemento.designadoPrincipal=this.form.value.designadoPrincipal;
          elemento.partido=this.form.value.partido;
          elemento.color=this.form.value.color;
        }
        this.visible = false;
        this.nzMessageService.success('¡El voto fue actualizado con exito!');
      }, (error) => {
        this.nzMessageService.error('El voto no pudo ser actualizado, por favor intente de nuevo');
        console.error(error);
      })
    }
  }

  modificar(item:Voto):void{
    this.accion=false;
    this.idModificar=item.id;
    this.visible = true;
    this.form=this.formBuilder.group({
      candidato: [item.candidato],
      votos: [item.votos],
      designadoPrincipal: [item.designadoPrincipal],
      partido: [item.partido],
      color: [item.color]
    })
  }

  submitForm(): void {
    for (const i in this.form?.controls) {
      this.form?.controls[i].markAsDirty();
      this.form?.controls[i].updateValueAndValidity();
    }
  }
}
