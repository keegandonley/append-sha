const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
	const sha = github.context.sha;
	const packageFile = fs.readFileSync('./package.json', 'utf-8');
	const packageLockFile = fs.readFileSync('./package-lock.json', 'utf-8');

	const package = JSON.parse(packageFile);
	const packageLock = JSON.parse(packageLockFile);

	const newVersion = `${package.version}${sha ? `-${sha}` : ''}`;

	package.version = newVersion;
	packageLock.version = newVersion;

	fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
	fs.writeFileSync('./package-lock.json', JSON.stringify(packageLock, null, 2));

	core.setOutput('version', newVersion);
	
} catch (e) {
	core.setFailed(e.message);
}