import { Component, computed, inject, Signal } from '@angular/core';
import { ContactFormComponent } from "../../shared/components/contact-form/contact-form.component";
import { ContactInfoService } from '../../core/services/contact-info/contact-info.service';
import { ContactInfo } from '../../core/interfaces/contact-info/contact-info.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-contact-us',
  imports: [ContactFormComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  private readonly contactInfoService = inject(ContactInfoService);
  contact: Signal<ContactInfo> = computed<ContactInfo>(() => this.contactInfoService.contactInfo());
  private readonly messageService = inject(MessageService);
  toastFlagForContact!: boolean;


  showMessage(completed: boolean) {
    this.toastFlagForContact = completed
    if (this.toastFlagForContact) {
      this.messageService.add({
        severity: 'success', summary: 'G-Developments', detail: 'your interest has been registered successfully, we will contact you soon', key: 'tr',
        life: 4000
      });
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error', detail: 'something went wrong, please re-enter your data', key: 'tr',
        life: 4000
      });
    }
  }

}
