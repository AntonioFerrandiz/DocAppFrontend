import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { LoginService } from 'src/app/services/login.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {
  newPatient: FormGroup
  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private loginService: LoginService) {
    this.newPatient = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      numberPhone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      gender: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  addPatient(formDirective: FormGroupDirective): void{
    const userId = this.loginService.getTokenDecoded()
    const patient: Patient = {
      name: this.newPatient.value.name,
      lastname: this.newPatient.value.lastname,
      numberPhone: this.newPatient.value.numberPhone,
      gender: this.newPatient.value.gender,
      userId: userId
    }

    this.patientService.SavePatient(patient).subscribe(data =>{
      formDirective.resetForm()
      this.newPatient.reset()
    }, error => {
      console.log(error)
    })
  }

}
