import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  formularioRecuperar: FormGroup;
  constructor(public fb:FormBuilder) { 

    this.formularioRecuperar = this.fb.group({
      'email': new FormControl("",Validators.required)
    });
  }
  ngOnInit() {
  }

}
