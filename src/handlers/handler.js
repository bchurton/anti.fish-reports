const { readdirSync } = require("fs");

const fileExtensions = [".js"];

const walkFiles = (path, paths = []) => {
	for (const file of readdirSync(path, { withFileTypes: true })) {
		if (file.isDirectory()) {
			walkFiles(`${path}/${file.name}`, paths);
		} else if (fileExtensions.some((ext) => file.name.endsWith(ext))) {
			paths.push(`${path}/${file.name}`);
		}
	}

	return paths;
};

const handleFromFilePaths = (filePaths, handle) => {
	for (const path of filePaths) {
		const mod = require(path);

		if (!mod.name) {
			throw new Error(`File does not export a name: ${path}`);
		}

		if (!mod.execute) {
			throw new Error(`File does not export an execute function: ${path}`);
		}

		handle(mod);
	}
};

module.exports = {
	walkFiles,
	handleFromFilePaths,
};
