const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
	const sha = github.context.sha;
	const package = fs.readFileSync('./package.json');
	const packageLock = fs.readFileSync('./package-lock.json');

	if (!sha) {
		throw new Error('No commit sha found');
	}
	
} catch (e) {
	core.setFailed(e.message);
}