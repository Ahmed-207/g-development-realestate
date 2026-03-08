import { ProjectService } from './../../../core/services/projects/project.service';
import {
  Component, HostListener,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
  Signal,
  computed,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectData } from '../../../core/interfaces/project-data/project-data.interface';

export interface DropdownItem {
  label: string;
  route: string;
}


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  private readonly plat_id = inject(PLATFORM_ID);
  private readonly projectService = inject(ProjectService);
  projectDataForRoute: Signal<ProjectData[]> = computed(() => this.projectService.mainProjects());

  @ViewChild('dropdownHost') dropdownHost!: ElementRef<HTMLElement>;

  isHidden = false; 
  isScrolled = false;  
  dropdownOpen = false;
  mobileMenuOpen = false;


  private lastScrollY = 0;
  private readonly SCROLL_THRESHOLD = 60


  dropdownItems: Signal<DropdownItem[]> = computed(() => {
    const data = this.projectDataForRoute();
    return data.map((item) => ({
      label: item.projectName,
      route: item.projectSlug
    }));
  })



  ngOnInit(): void {
 
    if (isPlatformBrowser(this.plat_id)) {
      this.lastScrollY = window.scrollY;
    }
  }





  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScrollY = window.scrollY;


    this.isScrolled = currentScrollY > 10;


    if (Math.abs(currentScrollY - this.lastScrollY) < 8) return;

    if (currentScrollY > this.lastScrollY && currentScrollY > this.SCROLL_THRESHOLD) {

      this.isHidden = true;
      this.closeDropdown();
      this.closeMobileMenu();
    } else {

      this.isHidden = false;
    }

    this.lastScrollY = currentScrollY;
  }



  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.dropdownOpen &&
      this.dropdownHost &&
      !this.dropdownHost.nativeElement.contains(event.target as Node)
    ) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeDropdown();
    this.closeMobileMenu();
  }


  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) this.closeDropdown();
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

}
