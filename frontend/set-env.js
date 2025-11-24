const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path'); 

const envPath = path.resolve(__dirname, '.env');
const targetPath = './src/environments/environment.ts';

const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error(`❌ BŁĄD DOTENV: Nie można wczytać pliku .env z: ${envPath}`);
}

console.log('-------------------------------------------');
console.log(`Wczytana wartość API_BASE_URL: ${process.env.API_BASE_URL}`); 
console.log('-------------------------------------------');

const baseUrl = process.env.API_BASE_URL || 'http://DEFAULT_PLACEHOLDER_URL';

const envFileContent = `export const environment = {
  production: false,
  // Wartość jest zawsze LITERAŁEM STRINGA
  API_BASE_URL: '${baseUrl}', 
};
`;

fs.writeFile(targetPath, envFileContent, function (err) {
  if (err) {
    console.error("❌ BŁĄD ZAPISU PLIKU ŚRODOWISKOWEGO:");
    console.log(err);
  } else {
    console.log(`✅ Pomyślnie wygenerowano ${targetPath}.`);
    console.log(`Pamiętaj o dodaniu ${targetPath} do .gitignore.`);
  }
});