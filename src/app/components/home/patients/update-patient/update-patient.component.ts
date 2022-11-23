import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  patientId: number

  updatePatient: FormGroup

  patient: any = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    patientId: number
  }, private fb: FormBuilder, private patientService: PatientService,
  private router: Router) { 
    this.updatePatient = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      numberPhone: ['', [Validators.required, Validators.maxLength(9)]],
      gender: [{value: '', disabled: true}, Validators.required]
    })
  }

  ngOnInit(): void {
    
    this.setValues()
  }
  
  setValues():void{
    this.patientService.GetPatient(this.data.patientId).subscribe(data => {
      this.patient = data
      this.updatePatient.controls['name'].setValue(this.patient['name'])
      this.updatePatient.controls['lastname'].setValue(this.patient['lastname'])
      this.updatePatient.controls['numberPhone'].setValue(this.patient['numberPhone'])
      this.updatePatient.controls['gender'].setValue(this.patient['gender'])
    }) 
  }

  submitPatient(formDirective: FormGroupDirective):void{
    const patient: Patient = {
      name: this.updatePatient.value.name,
      lastname: this.updatePatient.value.lastname,
      numberPhone: this.updatePatient.value.numberPhone,
    }
    this.patientService.UpdatePatient(this.data.patientId, patient).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    })
  }
}
