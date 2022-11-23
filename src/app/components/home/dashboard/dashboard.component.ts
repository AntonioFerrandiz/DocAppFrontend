import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';

import { ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any = []
  patients: any = []
  totalPatients: 0
  totalMedicalHistories: 0

  // charts
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },

    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Masculino', 'Femenino'],
    datasets: [{
      data: [],
      backgroundColor:[
        'rgba(92, 122, 234, .75)',
        'rgba(255, 135, 202, .75)',
      ],
      hoverBackgroundColor: [
        'rgba(92, 122, 234)',
        'rgba(255, 135, 202)',
      ],
      hoverBorderColor:[
        'rgba(255, 255, 255)',
        'rgba(255, 255, 255)',
      ]
    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [];

  

  constructor(private userService: UserService, private patientService: PatientService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getUser()
    this.getPatients()
    this.getTotalOfMedicalHistoriesByUser()
    this.getNumberOfPatientsGender()

  }
  getUser() {
    const userId = this.loginService.getTokenDecoded()
    this.userService.GetUser(userId).subscribe(data => {
      this.user = data;
    })
  }

  getPatients() {
    const userId = this.loginService.getTokenDecoded()
    this.patientService.GetPatients(userId).subscribe(data => {
      this.patients = data;
      this.totalPatients = this.patients.length


    })
  }
  getTotalOfMedicalHistoriesByUser() {
    const userId = this.loginService.getTokenDecoded()
    this.userService.GetTotalOfMedicalHistoriesByUser(userId).subscribe(data => {
      this.totalMedicalHistories = data
    })
  }
  getNumberOfPatientsGender(){
    const userId = this.loginService.getTokenDecoded()
    this.patientService.GetNumberOfPatientsGender(userId).subscribe(data => {
      this.pieChartData.datasets[0].data.push(data['patientsMale'])
      this.pieChartData.datasets[0].data.push(data['patientsFemale'])
      this.chart.update()
    })}
}
