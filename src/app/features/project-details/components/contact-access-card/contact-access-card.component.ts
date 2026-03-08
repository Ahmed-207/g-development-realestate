import { Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-contact-access-card',
  imports: [RouterLink],
  providers: [PrimeIcons],
  templateUrl: './contact-access-card.component.html',
  styleUrl: './contact-access-card.component.css',
})
export class ContactAccessCardComponent {

}
