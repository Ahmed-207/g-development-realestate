import { FirebaseOptions } from "@angular/fire/app";

export const environment = {
    production: false,
    demo: true,
    firebase: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    } as FirebaseOptions,
    apiKeyForSheets:'',
    googleSheetId:''
};
