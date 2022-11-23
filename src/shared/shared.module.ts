import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MatAutocompleteModule,MatButtonModule, MatCardModule, MatDividerModule, MatProgressSpinnerModule, MatInputModule, MatListModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatTableModule, MatSidenavModule, MatToolbarModule, MatTabsModule, MatDialogModule, MatSelectModule, MatMenuModule, MatSortModule, MatChipsModule, MatDatepickerModule,MatNativeDateModule
  ], exports: [
    LoadingComponent,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,MatButtonModule, MatCardModule, MatDividerModule, MatProgressSpinnerModule, MatInputModule, MatListModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatTableModule, MatSidenavModule, MatToolbarModule, MatTabsModule, MatDialogModule, MatSelectModule, MatMenuModule, MatSortModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule
  ]
})
export class SharedModule { }
