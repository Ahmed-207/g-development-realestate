import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { RouterOutlet, RouterLinkWithHref, Router } from "@angular/router";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, ButtonModule, RouterLinkWithHref],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {

  private readonly router = inject(Router);
  isActivatedRouteContact: WritableSignal<boolean> = signal<boolean>(false);
  contactBtnStopped: Signal<boolean> = computed<boolean>(() => !this.isActivatedRouteContact());

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isActivatedRouteContact.set(this.router.url.includes('contact-us'));
    });
  }


}
