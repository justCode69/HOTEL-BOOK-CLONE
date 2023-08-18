import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RoutesComponent } from './routes/routes.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { hotelReducer } from './store/hotels.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    HomeComponent,
    HotelsComponent,
    CheckoutComponent,
    RoutesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    LayoutsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    StoreModule.forFeature('hotel', hotelReducer),
    // EffectsModule.forFeature([HotelEffects]),
  ],
})
export class PagesModule {}
