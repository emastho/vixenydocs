import { routes } from '../src/lib/routes';
import fs from 'node:fs';

let step = 0;
const log = (message: string) => {
	step++;
	process.stdout.write(`    📋 [${step}/4] ${message}.\n`);
};
const error = (a: string) => log(`ERROR: ${a}`);

interface GeneratedList {
	url: string;
	content: string;
}

let generatorDir = import.meta.dir.split('/');
generatorDir.pop();
generatorDir.push('src');

const srcDir = generatorDir.join('/');

async function main() {
	log('Starting to scan files');

	let file = false;
	let path = '';

	for (let i = 0; i < routes.length; i++) {
		if (routes[i].categoryId == 2) {
			continue;
		}
		path = `${srcDir}/routes${routes[i].href}/+page.md`;
		file = fs.existsSync(path);
		if (!file) {
			error(`"${routes[i].href}" doesnt exist, path used "${path}"`);
			return;
		}
	}

	log('All files exist, starting to fill the "database"');

	let data: GeneratedList[] = [];
	for (let i = 0; i < routes.length; i++) {
		if (routes[i].categoryId == 2) {
			continue;
		}
		path = `${srcDir}/routes${routes[i].href}/+page.md`;

		const file = Bun.file(path);
		const contents = await file.text();
		data.push({ url: routes[i].href, content: contents });
	}
	const generatedFile = Bun.file('data.json').writer();
	generatedFile.write(JSON.stringify(data));

	log('Filled database succesfully');

	fs.renameSync('data.json', `${srcDir}/lib/data.json`);

	log('Database moved to frontend');
}
main();
