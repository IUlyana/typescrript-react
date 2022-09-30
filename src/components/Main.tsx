import React, {  useState } from 'react';
import { checkKey, keyClients, keyСreated } from '../authSlice';
import { addKey } from '../checkKey';
import { useAppDispatch, useAppSelector } from '../hook';
import { generateSerial } from '../renderLisence';
import Registration from './Registration';
const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;


function Main() {
  const [keyClient, setText] = useState('');
  const state= useAppSelector(state => state.auth);
  
  const dispatch = useAppDispatch();
  const recognizedDevices:string = ipcRenderer.sendSync('hhdid');
  const key:string = ipcRenderer.sendSync('idProcess');
  const numLicense = generateSerial(recognizedDevices, key);
  const generateKey:string = addKey(numLicense);
  const checkArr:string[] = [generateKey, keyClient]
  
  const handleAction = () => {
      dispatch(keyСreated(generateKey));
      dispatch(keyClients(keyClient));
      dispatch(checkKey(checkArr));   
      setText('');
  }

  return (
    <div>
      <p>Номер лицензии: {numLicense}</p>
      <Registration
      value={keyClient}
      updateText={setText}
      handleAction={handleAction}/>
      {state.error && <p>{state.error}</p>}
    </div>
  );
}

export default Main;
