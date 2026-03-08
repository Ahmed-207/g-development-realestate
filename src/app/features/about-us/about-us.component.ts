import { ProjectService } from './../../core/services/projects/project.service';
import { Component, computed, inject, Signal } from '@angular/core';
import { ProjectCardComponent } from "./components/project-card/project-card.component";
import { ProjectData } from '../../core/interfaces/project-data/project-data.interface';
import { AnimateOnScroll } from "../../shared/directives/animate-on-scroll";
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-about-us',
  imports: [ProjectCardComponent, AnimateOnScroll],
  providers:[PrimeIcons],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {


  private readonly projectService = inject(ProjectService);
  projectsForAbout:Signal<ProjectData[]> = computed(()=> this.projectService.mainProjects());



}
