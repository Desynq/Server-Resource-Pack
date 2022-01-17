import { default as imageSize } from "image-size";
import { readdirSync, statSync } from 'fs';
import path from "path";



function isBaseTwo(n) {
	if (n == 0) return false;
	return Math.floor( Math.log2(n) ) === Math.log2(n);
};




let files = [];
function readDirectory(directory) {
	readdirSync(directory).forEach(file => {
		const absolute = path.join(directory, file);
		if ( statSync(absolute).isDirectory() ) return readDirectory(absolute);
		else return files.push(absolute);
	});
};

readDirectory('./assets/minecraft/textures/');

for (let file of files.filter(file => path.extname(file) === '.png') ) {
	const dimensions = imageSize(file);
	if ( isBaseTwo(dimensions.width * dimensions.height) ) continue
	console.log( file );
}
