import React, { useState } from 'react';
import { addAuth } from '../authSlice';
import { addKey } from '../checkKey';
import { useAppDispatch, useAppSelector } from '../hook';
import { generateSerial } from '../renderLisence';
import Registration from './Registration';
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


function Main() {
  const [text, setText] = useState('')
  const { error } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addAuth(text));
      setText('');
    }
  }

  const recognizedDevices:string = ipcRenderer.sendSync('hhdid');
  const key:string = ipcRenderer.sendSync('idProcess');
  const numLicense = generateSerial(recognizedDevices, key);
  const numKey = addKey(numLicense);
  console.log(numKey);
  
  return (
    <div>
      <p>Номер лицензии: {numLicense}</p>
      <Registration
      value={text}
      updateText={setText}
      handleAction={handleAction}/>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Main;
