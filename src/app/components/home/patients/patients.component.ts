import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  value: String
  users: any = []
  patients: any = []
  constructor(private userService: UserService,
    private patientService: PatientService,
    private loginService: LoginService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPatients()
  }
  openDialog() {
    let dialogRef = this.dialog.open(NewPatientComponent)
    dialogRef.afterClosed().subscribe(data => {
      this.getPatients()
    })
  }
  getPatients() {
    const userId = this.loginService.getTokenDecoded()
    this.patientService.GetPatients(userId).subscribe(data => {
      this.patients = data;
    })
  }

  searchPatient(patientFullname: String) {
    if (patientFullname.length == 0) {
      this.getPatients()
    }
    else {
      this.patients = []
      this.patientService.SearchPatient(patientFullname).subscribe(data => {
        this.patients = data
      })
    }
  }
  clearSearch() {
    this.value = ''
    this.getPatients()
  }
  updatePatient(patientId: number) {
    let updatePatientDialog = this.dialog.open(UpdatePatientComponent, {
      data: {
        patientId: patientId
      }
    })
    updatePatientDialog.afterClosed().subscribe(data => {
      this.getPatients()
    })
  }
  deletePatient(patientId: number) {
    this.patientService.DeletePatient(patientId).subscribe(data => {
      this.getPatients()
    }, error => {
      console.log(error)
    })
  }
}
