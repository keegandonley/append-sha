# NPM Append Sha

Appends the current (short) sha to the end of the current npm version and writes the change back to the `package.json` and `package-lock.json`.

Provides one output variable, `version` which is the new version that was changed to.

## Usage

```yml
- name: Append Sha
  uses: keegandonley/append-sha@master
  id: version
```