import { Injectable, inject } from '@angular/core';
import { delay, from, Observable, of, tap } from 'rxjs';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { LeadData } from '../interfaces/lead-data.interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LeadService {

  private readonly firestore = inject(Firestore);
  addNewLead(leadData: LeadData): Observable<any> {
    if (environment.demo) {
      return of(undefined).pipe(
        delay(1200),
        tap(() => console.log('[DEMO] intercepted:', leadData))
      );
    } else {
      const leadsCollection = collection(this.firestore, 'leads');
      return from(addDoc(leadsCollection, {
        ...leadData,
        createdAt: new Date()
      }));
    }
  }

}
