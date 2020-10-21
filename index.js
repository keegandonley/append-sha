const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const exec = require('@actions/exec');

try {
	const sha = github.context.sha;

	let myOutput = '';
	let myError = '';

	const options = {};
	options.listeners = {
		stdout: (data) => {
			myOutput += data.toString();
		},
		stderr: (data) => {
			myError += data.toString();
		}
	};
	options.cwd = './lib';

	await exec.exec('ls', options);
	console.log(myOutput);
	console.log(myError);

	const packageFile = fs.readFileSync('./github/workspace/package.json', 'utf-8');
	const packageLockFile = fs.readFileSync('./github/workspace/package-lock.json', 'utf-8');

	const package = JSON.parse(packageFile);
	const packageLock = JSON.parse(packageLockFile);

	const newVersion = `${package.version}${sha ? `-${sha}` : ''}`;

	package.version = newVersion;
	packageLock.version = newVersion;

	fs.writeFileSync('./github/workspace/package.json', JSON.stringify(package, null, 2));
	fs.writeFileSync('./github/workspace/package-lock.json', JSON.stringify(packageLock, null, 2));

	core.setOutput('version', newVersion);
	
} catch (e) {
	core.setFailed(e.message);
}