import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-medical-history',
  templateUrl: './update-medical-history.component.html',
  styleUrls: ['./update-medical-history.component.css']
})
export class UpdateMedicalHistoryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    patientId: number
  }) { }

  ngOnInit(): void {
    console.log(this.data.patientId)
  }

}
