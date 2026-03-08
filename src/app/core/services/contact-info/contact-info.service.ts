import { Injectable, signal, WritableSignal } from '@angular/core';
import { ContactInfo } from '../../interfaces/contact-info/contact-info.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactInfoService {

  contactInfo: WritableSignal<ContactInfo> = signal({
    phone: '+2 01067376718',
    email: 'atef@testfordomain.com',
  })

}
