import { environment } from 'src/environments/environment';
import { Injectable, signal, WritableSignal, inject, DestroyRef } from '@angular/core';
import { Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectData } from '../../interfaces/project-data/project-data.interface';
import { demoProjects } from './data/projects.demo';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private firestore = inject(Firestore);
  private destroyRef = inject(DestroyRef);

  mainProjects: WritableSignal<ProjectData[]> = signal([]);

  constructor() {
    if (environment.demo) {
      this.mainProjects.set(demoProjects);
    } else {
      this.loadProductionProjects();
    }
  }

  private loadProductionProjects(): void {
    this.getProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (projects) => this.mainProjects.set(projects),
        error: (err) => console.log('Failed to load projects:', err),
      });
  }

  getProjects(): Observable<ProjectData[]> {
    const projectsCollection = collection(this.firestore, 'projects');
    const q = query(projectsCollection);
    return collectionData(q, { idField: 'id' }) as Observable<ProjectData[]>;
  }
}