import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalHistory } from 'src/app/models/medical-history.model';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';
import { PatientService } from 'src/app/services/patient.service';
import { AddMedicalHistoryComponent } from './add-medical-history/add-medical-history.component';
import { UpdateMedicalHistoryComponent } from './update-medical-history/update-medical-history.component';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import { ThrowStmt } from '@angular/compiler';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  patientId: number
  patientData: any = []
  userData: any = []
  medicalHistory: any = []
  medicalHistoryPDF: any = []
  dataSource = new MatTableDataSource<MedicalHistory>()
  displayedColumns = ['dateCreated', 'age', 'height', 'weight', 'description', 'actions']
  constructor(private aRoute: ActivatedRoute, private patientService: PatientService,
    private medicalHistoryService: MedicalHistoryService, private userService: UserService,
    private loginService: LoginService,
    public dialog: MatDialog, private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private eRef: ElementRef) {
    this.patientId = +this.aRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.GetPatient(this.patientId)
    this.GetMedicalHistory(this.patientId)
    this.GetUser()
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddMedicalHistoryComponent, {
      data: {
        patientId: this.patientId,
        patientFullname: this.patientData.name + ' ' + this.patientData.lastname
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      this.GetMedicalHistory(this.patientId)
    })
  }
  GetPatient(patientId: number): void {
    this.patientService.GetPatient(patientId).subscribe(data => {
      this.patientData = data
    }, error => {
      this.router.navigate(['../patients'])
    })
  }
  GetUser(): void {
    const userId = this.loginService.getTokenDecoded()
    this.userService.GetUser(userId).subscribe(data => {
      this.userData = data
    })
  }

  GetMedicalHistory(patientId: number): void {
    this.medicalHistoryService.GetAllMedicalHistoryByPatient(patientId).subscribe(data => {
      this.medicalHistory = data
      this.dataSource = this.medicalHistory
    })
  }


  openUpdateMedicalHistory(patientId: number): void {
    let dialogUpdateMedicalHistory = this.dialog.open(UpdateMedicalHistoryComponent, {
      data: {
        patientId: patientId
      }
    })
    dialogUpdateMedicalHistory.afterClosed().subscribe(data => {
      this.GetMedicalHistory(this.patientId)
    })
  }

  DeleteMedicalHistory(medicalHistoryId: number): void {
    this.medicalHistoryService.DeleteMedicalHistory(medicalHistoryId).subscribe(data => {
      this.GetMedicalHistory(this.patientId)
    }, error => {
      console.log(error)
    })
  }
  generatePDF(medicalHistoryId: number): void {

    this.medicalHistoryPDF = this.medicalHistory.find(x => x.id === medicalHistoryId)
    const dateCreated = this.medicalHistoryPDF['dateCreated'].split(/[T.\s]/)
    const pdfDefinition: any = {
      pageSize: 'A5',
      pageOrientation: 'landscape',
      content: [
        {
          columns: [
            [
              {
                text: this.userData['fullname'], style: 'header', fontSize: 18,
              },
              {
                text: this.userData['medicalSpeciality'], fontSize: 10, margin: [0, 0, 0, 6]
              },
              {
                text: `CMP: ${this.userData['cmp']}`, fontSize: 10
              },
              {
                text: `Dirección: ${this.userData['medicalOffice']}`, fontSize: 10
              },
              {
                text: `Cel: ${this.userData['numberPhone']}`, fontSize: 10
              },
              {
                text: `Email: ${this.userData['email']}`, fontSize: 10
              },
              {
                text: 'Datos de ' + this.patientData['name'] + ' ' + this.patientData['lastname'] + '\n', margin: [0, 32, 0, 0], fontSize: 11
              },
              {
                text: 'Edad: ' + this.medicalHistoryPDF['age'] + ' ' + this.medicalHistoryPDF['ageMeasurement'], fontSize: 10
              },
              {
                text: 'Altura: ' + this.medicalHistoryPDF['height'] + ' ' + this.medicalHistoryPDF['heightMeasurement'], fontSize: 10
              },
              {
                text: 'Peso: ' + this.medicalHistoryPDF['weight'] + ' ' + this.medicalHistoryPDF['weightMeasurement'] , fontSize: 10
              },
              {
                text: 'Indicaciones para ' + this.patientData['name'] + ' ' + this.patientData['lastname'] + ':', margin: [0, 12, 0, 0], fontSize: 11
              },
              {
                text: this.medicalHistoryPDF['description'], fontSize: 10
              }
            ],
            [{ text: dateCreated[0], alignment: 'right', fontSize: 10 }]
          ]
        }

      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open()
  }
}
