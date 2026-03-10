import { ToastModule } from 'primeng/toast';
import { Component, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { ProjectOverviewComponent } from "./components/project-overview/project-overview.component";
import { ProjectData } from '../../core/interfaces/project-data/project-data.interface';
import { ProjectService } from '../../core/services/projects/project.service';
import { ContactFormComponent } from "../../shared/components/contact-form/contact-form.component";
import { MessageService, PrimeIcons } from 'primeng/api';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home',
  imports: [AnimateOnScroll, ProjectOverviewComponent, ContactFormComponent, ToastModule],
  providers: [PrimeIcons, MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  private readonly projectService = inject(ProjectService);
  private readonly messageService = inject(MessageService);
  isContactModalOpen: boolean = false;
  toastFlagForHome!: boolean;
  mainProjectsForHome: WritableSignal<ProjectData[]> = signal<ProjectData[]>([]);


  openModal(): void {
    this.isContactModalOpen = true;
  }

  closeModal(): void {
    this.isContactModalOpen = false;
  }

  closeModalAfterSuccessReg(flag: boolean): void {
    this.isContactModalOpen = flag;
  }

  showMessage(completed: boolean) {
    this.toastFlagForHome = completed
    if (this.toastFlagForHome) {
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


  ngOnInit(): void {
    this.openModal();
    if(environment.demo){
      this.mainProjectsForHome.set(this.projectService.mainProjects());
    }else{
      this.getProjectsForHome();
    }

  }

  @HostListener('window:keydown.escape', ['$event'])
  handleCloseModal(event: any): void {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  getProjectsForHome():void{
    this.projectService.getProjects().subscribe({
      next:(res)=>{
        this.mainProjectsForHome.set(res);
      },
      error: (err)=>{
        console.error(err);
      }
    })
  }



}



