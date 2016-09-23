/**
* dat-guiVR Javascript Controller Library for VR
* https://github.com/dataarts/dat.guiVR
*
* Copyright 2016 Data Arts Team, Google Inc.
* 
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
* 
*     http://www.apache.org/licenses/LICENSE-2.0
* 
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import createInteraction from './interaction';

export function create( { group, panel } = {} ){

  const interaction = createInteraction( panel );

  interaction.events.on( 'onGripped', handleOnGrip );
  interaction.events.on( 'onReleaseGrip', handleOnGripRelease );

  let oldParent;
  let oldPosition = new THREE.Vector3();

  function handleOnGrip( {inputObject}={} ){

    console.log('gripping');
    const folder = group.folder;
    if( folder === undefined ){
      return;
    }

    oldPosition.copy( folder.position );
    folder.position.set( 0,0,0 );

    oldParent = folder.parent;
    inputObject.add( folder );

  }

  function handleOnGripRelease( {inputObject}={} ){

    console.log('releasing grip');
    const folder = group.folder;
    if( folder === undefined ){
      return;
    }
    if( oldParent === undefined ){
      return;
    }

    oldParent.add( folder );
    oldParent = undefined;
  }

  return interaction;
}