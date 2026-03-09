const fs = require('fs');
const path = require('path');

const envDir = path.join(process.cwd(), 'src', 'environments');
const targetPath = path.join(envDir, 'environment.ts');
const demoPath = path.join(envDir, 'environment.demo.ts');

if (!fs.existsSync(envDir)) {
    fs.mkdirSync(envDir, { recursive: true });
}

// Get the config from Vercel. 
// It MUST be a valid JSON string like: {"apiKey": "...", "projectId": "..."}
const firebaseConfig = process.env.FIREBASE_CONFIG_DEMO || '{}';

const envConfigFile = `
import { FirebaseOptions } from "@angular/fire/app";

export const environment = {
    production: false,
    demo: true,
    firebase: ${firebaseConfig} as FirebaseOptions
};
`;

fs.writeFileSync(targetPath, envConfigFile);
fs.writeFileSync(demoPath, envConfigFile);

console.log('Environment files generated successfully for Angular 21.');