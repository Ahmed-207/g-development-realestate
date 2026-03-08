import { ProjectData } from "../../../interfaces/project-data/project-data.interface";

export const demoProjects: ProjectData[] = [
    {
        projectId: '11',
        projectName: 'Project 1',
        projectSlug: 'project-one',
        projectSlogan: 'Some Slogan',
        projectBrief: 'project brief here',
        projectDesc: 'project description here ,project description here ,project description here ,project description here ,project description here ,project description here ,project description here ,',
        unitsType: ['unit type 1', 'unit type 2', 'unit type 3', 'unit type 4'],
        projectMainImg: '/assets/images/project-overview.png',
        projectSlides: [
            {
                slideTag: 'Project 1',
                slideImg: '/assets/images/buying-real-estate-concept.jpg',

            },
            {
                slideTag: 'Slogan',
                slideImg: '/assets/images/home-bg.jpg'
            },
            {
                slideImg: '/assets/images/3d-rendering-house-model.jpg'

            }
        ],
        projectFacilities: [{
            facilityId: '111',
            facilityName: 'Hotels',
            facilityDesc: 'something to type here',
            facilityImg: '/assets/images/project-overview.png'
        },
        {
            facilityId: '112',
            facilityName: 'Hotels',
            facilityDesc: 'something to type here',
            facilityImg: '/assets/images/project-overview.png'
        },
        {
            facilityId: '113',
            facilityName: 'Hotels',
            facilityDesc: 'something to type here',
            facilityImg: '/assets/images/project-overview.png'
        }
        ]
    },
    {
        projectId: '22',
        projectName: 'Project 2',
        projectSlug: 'project-two',
        projectSlogan: 'Some Slogan2',
        projectBrief: 'project brief here2',
        projectDesc: 'project description here 2,project description here ,project description here ,project description here ,project description here ,project description here ,project description here ,',
        unitsType: ['unit type 1', 'unit type 2', 'unit type 3', 'unit type 4'],
        projectMainImg: '/assets/images/project-overview.png',
        projectSlides: [
            {
                slideTag: 'Project 2',
                slideImg: '/assets/images/buying-real-estate-concept.jpg',

            },
            {
                slideTag: 'Slogan',
                slideImg: '/assets/images/home-bg.jpg'
            },
            {
                slideImg: '/assets/images/3d-rendering-house-model.jpg'

            }
        ],
        projectFacilities: [{
            facilityId: '221',
            facilityName: 'Hotels',
            facilityDesc: 'something to type here',
            facilityImg: '/assets/images/project-overview.png'
        },
        {
            facilityId: '222',
            facilityName: 'Hotels',
            facilityDesc: 'something to type here',
            facilityImg: '/assets/images/project-overview.png'
        },
        {
            facilityId: '223',
            facilityName: 'Hotels',
            facilityDesc: 'something to type here',
            facilityImg: '/assets/images/project-overview.png'
        }
        ]
    }]