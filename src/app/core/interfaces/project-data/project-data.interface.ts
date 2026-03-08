export interface ProjectData {
    projectId: string;
    projectSlug: string;
    projectName: string;
    projectSlogan?: string;
    projectBrief: string;
    projectDesc: string;
    unitsType: string[];
    projectMainImg: string;
    projectSlides?: ProjectSlide[];
    projectBrochure?: File;
    projectFacilities: ProjectFacility[];
}

export interface ProjectFacility {

    facilityId: string;
    facilityName: string;
    facilityDesc: string;
    facilityImg: string;

}

export interface ProjectSlide {
    slideTag?: string;
    slideImg: string;
}
