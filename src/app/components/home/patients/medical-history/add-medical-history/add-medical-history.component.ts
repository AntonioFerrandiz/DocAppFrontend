import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Route } from '@angular/router';
import { MedicalHistory } from 'src/app/models/medical-history.model';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';
@Component({
  selector: 'app-add-medical-history',
  templateUrl: './add-medical-history.component.html',
  styleUrls: ['./add-medical-history.component.css']
})
export class AddMedicalHistoryComponent implements OnInit {
  patientId: number
  newMedicalHistory: FormGroup
  constructor(private aRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {
      patientId: number,
      patientFullname: string
    },
    private fb: FormBuilder,
    private medicalHistoryService: MedicalHistoryService,
    public dialog: MatDialog) {
    this.newMedicalHistory = this.fb.group({
      description: ['', Validators.required],
      age: ['', Validators.required],
      ageMeasurement: ['', Validators.required],
      weight: ['', Validators.required],
      weightMeasurement: ['', Validators.required],
      height: ['', Validators.required],
      heightMeasurement: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    console.log(this.data.patientId)
  }

  addMedicalHistory(formDirective: FormGroupDirective):void {
    const medicalHistory: MedicalHistory = {
      description: this.newMedicalHistory.value.description,
      age: this.newMedicalHistory.value.age,
      ageMeasurement: this.newMedicalHistory.value.ageMeasurement,
      weight: this.newMedicalHistory.value.weight,
      weightMeasurement: this.newMedicalHistory.value.weightMeasurement,
      height: this.newMedicalHistory.value.height,
      heightMeasurement: this.newMedicalHistory.value.heightMeasurement,
      patientId: this.data.patientId,
    }
    this.medicalHistoryService.CreateMedicalHistory(medicalHistory).subscribe(data =>{
      formDirective.resetForm()
      this.newMedicalHistory.reset()
    }, error => {
      console.log(error)
    })
  }

}
