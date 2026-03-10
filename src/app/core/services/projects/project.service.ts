import { environment } from 'src/environments/environment';
import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { ProjectData, ProjectFacility, ProjectSlide } from '../../interfaces/project-data/project-data.interface';
import { demoProjects } from './data/projects.demo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private readonly httpClient = inject(HttpClient);
  private readonly apiKey: WritableSignal<string> = signal<string>('');
  private readonly sheetId: WritableSignal<string> = signal<string>('');

  mainProjects: WritableSignal<ProjectData[]> = signal([]);

  constructor() {
    if (environment.demo) {
      this.mainProjects.set(demoProjects);
    } else {
      this.apiKey.set(environment.apiKeyForSheets);
      this.sheetId.set(environment.googleSheetId);
    }
  }

  private getSheetUrl(tabName: string): string {
    return `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId()}/values/${tabName}?key=${this.apiKey()}`;
  }

  getProjects(): Observable<ProjectData[]> {
    return forkJoin({
      projects: this.httpClient.get(this.getSheetUrl('projectsData')),    // Projects Tab
      facilities: this.httpClient.get(this.getSheetUrl('facilitiesData')),  // Facilities Tab
      slides: this.httpClient.get(this.getSheetUrl('slidesData'))      // Slides Tab
    }).pipe(
      map((res: any) => {
        // 1. Convert raw rows to basic objects
        const rawProjects = this.mapRowsToObjects<any>(res.projects.values);
        const rawFacilities = this.mapRowsToObjects<ProjectFacility & { projectId: string }>(res.facilities.values);
        const rawSlides = this.mapRowsToObjects<ProjectSlide & { projectId: string }>(res.slides.values);

        // 2. Final assembly to match ProjectData interface
        return rawProjects.map(p => {
          const project: ProjectData = {
            projectId: p.projectId,
            projectSlug: p.projectSlug,
            projectName: p.projectName,
            projectSlogan: p.projectSlogan,
            projectBrief: p.projectBrief,
            projectDesc: p.projectDesc,
            projectMainImg: p.projectMainImg,

            // Handle unitsType: Convert "Serviced apartments,Townhouse" -> ["Serviced apartments", "Townhouse"]
            unitsType: p.unitsType ? p.unitsType.split(',').map((s: string) => s.trim()) : [],

            // Filter and attach Facilities
            projectFacilities: rawFacilities
              .filter(f => f.projectId === p.projectId)
              .map(({ projectId, ...rest }) => rest as ProjectFacility), // Remove the temp projectId

            // Filter and attach Slides
            projectSlides: rawSlides
              .filter(s => s.projectId === p.projectId)
              .map(({ projectId, ...rest }) => rest as ProjectSlide)
          };
          return project;
        });
      })
    );
  }

  private mapRowsToObjects<T>(rows: any[][]): T[] {
    if (!rows || rows.length < 2) return [];
    const headers = rows[0];
    return rows.slice(1).map(row => {
      const obj: any = {};
      headers.forEach((header, i) => {
        const key = header.trim();
        obj[key] = row[i] !== undefined ? row[i] : '';
      });
      return obj as T;
    });
  }
}

