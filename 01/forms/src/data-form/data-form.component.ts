import { EstadoBr } from './../app/shared/models/estado-br.model';
import { ConsultaCepService } from './../app/shared/consulta-cep.service';
import { DropdownService } from './../app/shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
    ) { }

  ngOnInit() {
      this.dropdownService.getEstadosBr().subscribe(dados => {
        this.estados = dados;
        console.log(dados);
      });
      this.formulario = this.formBuilder.group({
        nome: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],

        endereco: this.formBuilder.group({
        cep: [null, Validators.required ],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
      });



  }
  onSubmit(){
    console.log(this.formulario);

    if (this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .subscribe(dados => {
      console.log(dados);

      // reseta o form
      // this.formulario.reset();
      this.resetar();
    },
    (error: any) => alert ('erro')
    );

    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }
  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup){
      this.verificaValidacoesForm(controle);
      }
      });

  }


  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {

    return(
    !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificarEmailInvalido(){
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors){
      return campoEmail.errors[' email '] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }
  consultaCEP() {

    const cep = this.formulario.get('endereco.cep').value;

    if  (cep != null && cep !== ''){
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }
  populaDadosForm(dados) {
    // this.formulario.setValue({});

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    // this.formulario.get('nome').setValue('null');

    // console.log(form);
  }

  resetaDadosForm() {
    this.formulario.patchValue({
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
