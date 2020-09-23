
## Canvas version changes
#### v4.0.2 merges PR to add variables for fillColorPickerText and strokeColorPickerText
https://github.com/webfactorymk/ng2-canvas-whiteboard/pull/68

#### v3.1.2, v4.0.1
Exports all existing canvas shapes, so that they can be easily unregistered from the canvas. (see README for unregistering the shapes).

#### v4.0.0 Switches the repo to an angular-workspace and uses ng-packagr for *building the library*.
 
 It will help with testing, maintaining and future changes of the library. The peer-dependency for @angular is ^10.0.6

#### v3.1.1 Audits the npm packages and upgrades the lodash version from 4.17.11 to 4.17.13

#### v3.1.0 Merges the pull request from https://github.com/webfactorymk/ng2-canvas-whiteboard/pull/55 to allow the component to be used in Angular 8 and 9 applications. Also fixes the imports for rxjs items from 'rxjs/index' to 'rxjs'

#### v3.0.4 Fixes a bug with production build and recognition of shape names by adding an abstract method in the base Shape class.

#### v3.0.0 Removes the `rxjs-compat` library and adds `rxjs^6`. This means that older versions will not be supported if they upgrade to `ng2-canvas-whiteboard^3.0.0`.
#### *This version also changes the way of how this library is built and made ready for publish.*

#### For applications before Angular 6 please use versions below v3.0.0.
#
