import { Component, computed, effect, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ProjectHeadingCarouselComponent } from "./components/project-heading-carousel/project-heading-carousel.component";
import { ProjectService } from '../../core/services/projects/project.service';
import { ProjectData, ProjectSlide } from '../../core/interfaces/project-data/project-data.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AnimateOnScroll } from '../../shared/directives/animate-on-scroll';
import { ContactAccessCardComponent } from "./components/contact-access-card/contact-access-card.component";
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-project-details',
  imports: [ProjectHeadingCarouselComponent, AnimateOnScroll, ContactAccessCardComponent],
  providers:[PrimeIcons],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css',
})
export class ProjectDetailsComponent implements OnInit {

  private readonly activeRoute = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly titleService = inject(Title);
  targetRoutedProject: WritableSignal<string> = signal<string>('');
  projectDataForDetails: Signal<ProjectData> = computed(() => this.projectService.mainProjects().find((item) => item.projectSlug === this.targetRoutedProject())!);
  projectDataForCarousel: Signal<ProjectSlide[]> = computed(() => this.projectDataForDetails().projectSlides!);

  constructor() {
    effect(() => {
      const project = this.projectDataForDetails();
      if (project) {
        this.titleService.setTitle(project.projectName);
      }
    });
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.targetRoutedProject.set(params.get('slug')!);
    });


  }

}
