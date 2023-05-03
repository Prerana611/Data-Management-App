import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';

const materialcomponent = [
  MatInputModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSelectModule,
  MatButtonModule,
  ReactiveFormsModule,
  MatDividerModule,
  MatNativeDateModule,
  MatIconModule,
  MatTableModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSortModule,
  
]
@NgModule({
  declarations: [],
  imports: [
    materialcomponent
  ],
  exports:[materialcomponent]
})
export class MaterialModule { }
