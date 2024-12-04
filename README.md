# Instructions
This should be `git clone`-ed in the Parent Directory of the screeps.com Folder.
* In Windows, the default would be "C:\Users\<user>\AppData\Local\Screeps\scripts".

After cloning, run `pnpm install`.

The `src` Folder should be where development is done, as that is analyzed by Typescript. Each screeps Branch should have its own Folder within the `src` Folder.

To actually sync the `src` Folder to screeps, run `pnpm compile` to output the changes to the `screeps.com` Folder, and then `git commit`. Screeps should automatically sync upon detecting changes in the `master` Branch.
