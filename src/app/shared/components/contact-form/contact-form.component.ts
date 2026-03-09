import { Component, computed, inject, OnInit, output, PLATFORM_ID, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../core/services/projects/project.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select, SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { isPlatformBrowser } from '@angular/common';
import { LeadData } from '../../../features/contact-us/interfaces/lead-data.interface';
import { LeadService } from '../../../features/contact-us/services/lead.service';
import { PrimeIcons } from 'primeng/api';
import { finalize } from 'rxjs';
import { environment } from '@env/environment';
import { ProjectData } from '../../../core/interfaces/project-data/project-data.interface';


interface ProjectsForSelection {
  name: string;
  value: string;
};

interface UnitsForSelection {
  name: string;
  value: string;
}

@Component({
  selector: 'app-contact-form',
  imports: [FloatLabelModule, InputTextModule, SelectModule, FormsModule, DatePickerModule, ReactiveFormsModule],
  providers: [PrimeIcons],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);
  private readonly plat_id = inject(PLATFORM_ID);
  private readonly leadService = inject(LeadService);
  availableProjects: Signal<string[]> = computed(() => { return this.projectService.mainProjects().map((item) => item.projectName) });
  availableProjectsArr: Signal<ProjectData[]> = computed(() => { return this.projectService.mainProjects() });
  projectsForSelect: Signal<ProjectsForSelection[]> = computed(() => { return this.availableProjects().map((item) => { return { name: item, value: item } }) });
  unitOptionValues: WritableSignal<UnitsForSelection[]> = signal<UnitsForSelection[]>([]);
  datetime12h: Date[] | undefined;
  isBrowser: WritableSignal<boolean> = signal(false);
  leadFormData: WritableSignal<FormGroup> = signal({} as FormGroup);
  modalFlagForHome = output<boolean>();
  toastFlag = output<boolean>();
  submitFlag: boolean = false;
  projectSelectEle = viewChild.required(Select);

  onProjectSelectionChange(): void {
    if (this.leadFormData().get('clientProjectOfInterest')?.value.name) {
      const selectedProject = this.leadFormData().get('clientProjectOfInterest')?.value.name
      this.unitOptionValues.set(this.availableProjectsArr().find((project) => project.projectName === selectedProject)?.unitsType.map((item) => { return { name: item, value: item } })!)
    };
    this.leadFormData().get('clientPreferedUnitType')?.setValue(null);
    this.projectSelectEle().hide();
  }

  closeModalAfterSuccess(): void {
    this.modalFlagForHome.emit(false);
  }

  showToastSuccess(): void {
    this.toastFlag.emit(true);
  }

  showToastError(): void {
    this.toastFlag.emit(false);
  }

  createLeadForm(): void {

    this.leadFormData.set(this.fb.group({
      clientName: [null, Validators.required],
      clientPhone: [null, [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      clientEmail: [null, [Validators.required, Validators.email]],
      clientProjectOfInterest: [null, [Validators.required]],
      clientPreferedUnitType: [null],
      clientSuitableDate: [null]
    }));




  }


  onSubmitForm(): void {
    if (this.leadFormData().valid) {
      this.submitFlag = true;
      const formData: LeadData = this.leadFormData().value;
      this.leadService.addNewLead(formData).pipe(finalize(() => { this.submitFlag = false })).subscribe({
        next: (response) => {
          if (environment.demo) {
            console.log('DEMO: Form data recieved , no data stored ')
            this.closeModalAfterSuccess();
            this.showToastSuccess();
            this.leadFormData().reset();

          } else {
            console.log('Success! Document ID:', response.id);
            this.closeModalAfterSuccess();
            this.showToastSuccess();
            this.leadFormData().reset();
          }
        },
        error: (err) => {
          console.error('Firebase Error:', err);
          this.showToastError();
        }
      });
    }
  }

  ngOnInit(): void {

    this.createLeadForm();

    if (isPlatformBrowser(this.plat_id)) {
      this.isBrowser.set(true);
    }



  }

}
