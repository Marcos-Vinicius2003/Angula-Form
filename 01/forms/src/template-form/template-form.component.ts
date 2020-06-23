import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  };
  onSubmit(form){
    console.log(form);


    this.http.post('//https:httpbin.org/post', JSON.stringify(form.value))
   .subscribe(dados => console.log(dados));
  }


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }
  consultaCEP(cep, form) {


    cep = cep.replace(/\D/g, '');

    this.resetaDadosForm(form);


    if (cep !== '') {
         this.http.get(`https://viacep.com.br/ws/${cep}/json`)

         .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
    populaDadosForm(dados, formulario) {
      /*form.setValue({
        bairro: dados.bairro,
        cep: dados.cep,
        cidade: dados.localidade,
        complemento: dados.complemento,
        email: form.value.email,
        estado: dados.uf,
        nome: form.value.nome,
        numero: '',
        rua: dados.logradouro
    });*/

    formulario.form.patchValue({
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    );
  }
  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
}



