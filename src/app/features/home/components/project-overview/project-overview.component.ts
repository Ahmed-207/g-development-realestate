import { Component, ElementRef,computed,inject,input, viewChild } from '@angular/core';
import { AnimateOnScroll } from '../../../../shared/directives/animate-on-scroll';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-overview',
  imports: [AnimateOnScroll],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.css',
})
export class ProjectOverviewComponent {

private readonly router = inject(Router);
imageUrl = input.required<string>();
projectName = input.required<string>();
projectNotation = input.required<string>();
projectSlugForBtn = input.required<string>();

  // 2. Use Signal queries
  myProject = viewChild<ElementRef>('projectSpecific');

  // 3. Create a computed style string
  backgroundStyle = computed(() => {
    return `url(${this.imageUrl()})`;
  });


  navigateToProject(projectSlugForNav:string):void{
    this.router.navigate(['/project-details', projectSlugForNav]);
  }


}
