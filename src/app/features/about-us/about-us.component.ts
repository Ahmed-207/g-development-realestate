import { ProjectService } from './../../core/services/projects/project.service';
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { ProjectCardComponent } from "./components/project-card/project-card.component";
import { ProjectData } from '../../core/interfaces/project-data/project-data.interface';
import { AnimateOnScroll } from "../../shared/directives/animate-on-scroll";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us',
  imports: [ProjectCardComponent, AnimateOnScroll],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {


  private readonly projectService = inject(ProjectService);
  projectsForAbout:WritableSignal<ProjectData[]> = signal<ProjectData[]>([]);

  ngOnInit(): void {
    
    if(environment.demo){
      this.projectsForAbout.set(this.projectService.mainProjects());
    }else{
      this.getProjectsForAbout();
    }
    
  }


  getProjectsForAbout():void{
    this.projectService.getProjects().subscribe({
      next: (res)=>{
        this.projectsForAbout.set(res);
      },
      error: (err)=>{
        console.error(err);
      }
    })
  }



}
