import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/appointment.model';
import { Observable } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';
import {map, startWith, take} from 'rxjs/operators';
import { PatientService } from 'src/app/services/patient.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  patient = new FormControl('')
  patientData: any = []
  patients: string[] = []
  filteredOptions: Observable<string[]>;
  newAppointment: FormGroup

  constructor(private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private loginService: LoginService,
    public dialog: MatDialog) {
    this.newAppointment = this.fb.group({
      appointmentDate: ['', [Validators.required]],
      appointmentStartTime: ['', [Validators.required]],
      appointmentEndTime: ['', [Validators.required]],
      patientId: [''],
      statusAppointment: [''],
    })
  }


  ngOnInit(): void {
    this.getPatients()
    this.filteredOptions = this.patient.valueChanges.pipe(
      startWith(''),
      take(4),
      map(value => this._filter(value || '')),
    );
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.patients.filter(option => option.toLowerCase().includes(filterValue));
  }

  getPatients():void{
    const userId = this.loginService.getTokenDecoded()

    this.patientService.GetPatients(userId).subscribe(data => {
      this.patientData = data;
      this.patientData.map((x,i) => {
        this.patients.push(data[i]['id'] + ' - ' + data[i]['name'] + ' ' + data[i]['lastname'])
      })
    })
  }
  padTo2Digits(num):number{
    return num.toString().padStart(2, '0');

  }
  formatDate(date): string{
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }
  addAppointment(formDirective: FormGroupDirective): void {
    const date = this.newAppointment.value.appointmentDate
    const patientId = parseInt(this.patient.value.split("-",1).join(''))
        
    const appointment: Appointment = {
      appointmentDate: this.formatDate(date),
      appointmentStartTime: this.newAppointment.value.appointmentStartTime,
      appointmentEndTime: this.newAppointment.value.appointmentEndTime,
      patientId: patientId,
      statusAppointment: 'ACTIVO',
    }
    this.appointmentService.saveAppointment(appointment).subscribe(data => {
    }, error=>{
      console.log(error)
    })
    console.log(appointment)
  }

}
