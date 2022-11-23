import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { LoginService } from 'src/app/services/login.service';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  appointment: any = []
  dataSource = new MatTableDataSource<Appointment>()
  displayedColumns = ['patientInfo', 'status', 'date','timeStart','actions']
  months = ['-','Ene','Feb','Mar','Abr','Jun','Jul','Ago','Sep','Oct','Nov','Dec']
  constructor(private appointmentService: AppointmentService,
    private loginService: LoginService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getAppointments()
  }

  getAppointments():void{
    var options = {}
    const date = new Date()
    const userId = this.loginService.getTokenDecoded()
    this.appointmentService.getAppointmentsByUser(userId).subscribe(data => {
      this.appointment = data;
      var timeNow = date.toLocaleTimeString().split(":",2).join(":")
      var dateNow = date.toLocaleDateString()
      
      // this.appointment.map((x,i)=>{
      //   console.log(x)
      //   if(x['appointmentDate'] < dateNow || x['appointmentEndTime'] < timeNow && x['appointmentDate'] < dateNow)  {
      //     console.log('Ya paso')
      //   }else {
      //     console.log('Aun no xd')
      //   }
      // })
      
      this.dataSource = this.appointment;
    })
  }

  openDialog():void{
    let dialogRef = this.dialog.open(AddAppointmentComponent)
    dialogRef.afterClosed().subscribe(data => {
      this.getAppointments();
    })
  }
}
