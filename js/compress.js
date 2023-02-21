// https://stackoverflow.com/questions/18142129/how-to-convert-multiple-files-to-compressed-zip-file-using-node-js

import { createWriteStream } from 'fs';
import archiver from 'archiver';





const cd = 'C:/Users/notde/curseforge/minecraft/Instances/1.19.3 Vanilla/config/openloader/resources/Server-Resource-Pack/';

let output = createWriteStream(cd + 'pack.zip');
let archive = archiver('zip', {
	gzip: true,
	zlib: { level: 9 }
});

archive.on('error', function(err) {
	throw err;
});

archive.pipe(output);



archive.directory(cd + 'assets/', 'assets');


for (let file of ['pack.mcmeta', 'pack.png', 'README.md', 'credits.md']) {
	archive.file(cd + file, {name: file});
}

archive.finalize();