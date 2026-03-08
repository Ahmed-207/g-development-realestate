import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  projectImage: InputSignal<string> = input.required<string>();
  projectName: InputSignal<string> = input.required<string>();
  projectSlug: InputSignal<string> = input.required<string>();


}
