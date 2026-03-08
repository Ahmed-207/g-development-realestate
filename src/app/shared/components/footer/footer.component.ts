import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimateOnScroll } from '../../directives/animate-on-scroll';
import { ContactInfoService } from '../../../core/services/contact-info/contact-info.service';
import { ContactInfo } from '../../../core/interfaces/contact-info/contact-info.interface';




@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, AnimateOnScroll],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private readonly contactInfoService = inject(ContactInfoService);
  contact: Signal<ContactInfo> = computed<ContactInfo>(()=> this.contactInfoService.contactInfo());
  currentYear: number = new Date().getFullYear();




}
