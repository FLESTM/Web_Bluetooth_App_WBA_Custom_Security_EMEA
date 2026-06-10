// ******************************************************************************
// * @file    App.js
// * @author  MCD Application Team
// *
//  ******************************************************************************
//  * @attention
//  *
//  * Copyright (c) 2022-2023 STMicroelectronics.
//  * All rights reserved.
//  *
//  * This software is licensed under terms that can be found in the LICENSE file
//  * in the root directory of this software component.
//  * If no LICENSE file comes with this software, it is provided AS-IS.
//  *
//  ******************************************************************************
//import React, { useState } from 'react';
import Header from './components/Header';
import DataThroughput from './onglets/DataThroughput';
import HeartRate from './onglets/HeartRate';
import P2Pserver from './onglets/P2Pserver';
import P2Prouter from './onglets/P2Prouter';
import Ota from './onglets/Ota';
import HealthThermometer from './onglets/HT';
import FingerPrint from './onglets/FingerPrint';
import FingerPrint_MLKEY from './onglets/FingerPrint_MLKEY';
import WeightScale from './onglets/WeightScale';
import BloodPressure from './onglets/BloodPressure';
import RunningSpeedandCadence from './onglets/RSC';
import ContinuousGlucoseMonitoring from './onglets/CGM';
import WifiCommissioning from './onglets/WifiCommissioning';
import FanProject from './onglets/FanProject';
import SMP from './onglets/MCUMGR/SMP';
import Electrocardiogram from './onglets/Electrocardiogram';
import Pulse_Oximeter from './onglets/Pulse_Oximeter'
import HUB_DYN from './onglets/HUB_DYN';
//import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import './styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap';
import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Link, Routes, useNavigate } from "react-router-dom";

const SMP_SERVICE_UUID = "8d53dc1d-1db7-4cd3-868b-8a527460aa84";
const SMP_CHARACTERISTIC_UUID = "da2e7828-fbce-4e01-ae9e-261174997c48";

const normalizeUuid = (uuid) => (uuid || '').toLowerCase().replace(/-/g, '');

const AppInner = () => {
  const [allServices, setAllServices] = useState([]);
  const [allCharacteristics, setAllCharacteristics] = useState([]);
  const [isDisconnected, setIsDisconnected] = useState(true);
  const navigate = useNavigate();   // <-- nouveau

  let listItems = [];

  const hasSMPService = allServices.some(
    (service) => normalizeUuid(service.service.uuid) === normalizeUuid(SMP_SERVICE_UUID)
  );

  const hasSMPCharacteristic = allCharacteristics.some(
    (entry) => normalizeUuid(entry.characteristic.uuid) === normalizeUuid(SMP_CHARACTERISTIC_UUID)
  );

  const hasSMP = hasSMPService || hasSMPCharacteristic;

  // <-- NOUVEAU useEffect : redirige vers SMP si le service est présent
  useEffect(() => {
    if (hasSMP && !isDisconnected) {
      navigate("/SMP");
    }
  }, [hasSMP, isDisconnected, navigate]);
  // --> FIN nouveau useEffect

  allServices.map(service => {
    if(service.service.uuid === "0000fe80-cc7a-482a-984a-7f2ed5b3e58f"){
      listItems.push(<li className="liProfile"><Link to="/DT">Data Throughput</Link></li>);
    }
    if(service.service.uuid === "0000180d-0000-1000-8000-00805f9b34fb"){
      listItems.push(<li className="liProfile"><Link to="/HR">Heart Rate</Link></li>);
    }
    if(service.service.uuid === "0000fe40-cc7a-482a-984a-7f2ed5b3e58f"){
      listItems.push(<li className="liProfile"><Link to="/P2P">P2P Server</Link></li>);
    }
    if(service.service.uuid === "0000feb0-cc7a-482a-984a-7f2ed5b3e58f"){
      listItems.push(<li className="liProfile"><Link to="/P2P_ROUTER">P2P Router</Link></li>);
    }
    if(service.service.uuid === "0000fe20-cc7a-482a-984a-7f2ed5b3e58f"){
      listItems.push(<li className="liProfile"><Link to="/OTA">Firmware Update Over The Air</Link></li>);
    }
    if(service.service.uuid === "00001809-0000-1000-8000-00805f9b34fb"){
      listItems.push(<li className="liProfile"><Link to="/HT">Health Thermometer</Link></li>);
    }
    if(service.service.uuid === "d973f2e0-b19e-11e2-9e96-0800200c9a66"){
      listItems.push(<li className="liProfile"><Link to="/FP">Finger Print</Link></li>);
    }
    if(service.service.uuid === "0000fec0-cc7a-482a-984a-7f2ed5b3e58f"){
      listItems.push(<li className="liProfile"><Link to="/FP_MLKEY">Finger Print MLKEY</Link></li>);
    }
    if(service.service.uuid === "00001810-0000-1000-8000-00805f9b34fb"){
      listItems.push(<li className="liProfile"><Link to="/BLS">Blood Pressure</Link></li>);
    }
    if(service.service.uuid === "0000181d-0000-1000-8000-00805f9b34fb"){
      listItems.push(<li className="liProfile"><Link to="/WS">Weight Scale</Link></li>);
    }
    if(service.service.uuid === "00001814-0000-1000-8000-00805f9b34fb"){
      listItems.push(<li className="liProfile"><Link to="/RSC">Running Speed and Cadence</Link></li>);
    }
    if(service.service.uuid === "0000181f-0000-1000-8000-00805f9b34fb"){
      listItems.push(<li className="liProfile"><Link to="/CGM">Continuous Glucose Monitoring</Link></li>);
    }
    if(service.service.uuid === "0000ff9a-cc7a-482a-984a-7f2ed5b3e58f"){
      listItems.push(<li className="liProfile"><Link to="/WCom">Wifi Commissioning</Link></li>);
    }
    if(service.service.uuid === "0000f11a-cc7a-482a-984a-7f2ed5b3e58f"){
      listItems.push(<li className="liProfile"><Link to="/FC">Fan Project</Link></li>);
    }
    if(service.service.uuid === "00001840-0000-1000-8000-00805f9b34fb"){
      if(service.device.name.startsWith("ECG_"))
        listItems.push(<li className="liProfile"><Link to="/Electrocardiogram">Electrocardiogram</Link></li>);
      if(service.device.name.startsWith("PO_"))
        listItems.push(<li className="liProfile"><Link to="/Pulse_Oximeter">Pulse Oximeter</Link></li>);
    }
    if(service.service.uuid === "0000fe90-cc7a-482a-984a-7f2ed5b3e58f"){
      listItems.push(<li className="liProfile"><Link to="/HUB_DYN">BLE HUB Zigbee</Link></li>);
    }
  });

  if (hasSMP) {
    listItems.push(<li className="liProfile"><Link to="/SMP">Simple Management Protocol</Link></li>);
  }

  return (
    <div>
      <Header
        setIsDisconnected={setIsDisconnected}
        setAllServices={setAllServices}
        setAllCharacteristics={setAllCharacteristics}
      />
      <ul className="ulProfile">{listItems}</ul>

      <div className="main-route-place">
        <Routes>
          <Route path="/"/>
          <Route path="*"/>
          <Route path="/DT" element={isDisconnected ? null : <DataThroughput allCharacteristics={allCharacteristics} />} />
          <Route path="/HR" element={isDisconnected ? null : <HeartRate allCharacteristics={allCharacteristics} />} />
          <Route path="/P2P" element={isDisconnected ? null : <P2Pserver allCharacteristics={allCharacteristics} />} />
          <Route path="/P2P_ROUTER" element={isDisconnected ? null : <P2Prouter allCharacteristics={allCharacteristics} />} />
          <Route path="/OTA" element={isDisconnected ? null : <Ota allCharacteristics={allCharacteristics} />} />
          <Route path="/HT" element={isDisconnected ? null : <HealthThermometer allCharacteristics={allCharacteristics} />} />
          <Route path="/FP" element={isDisconnected ? null : <FingerPrint allCharacteristics={allCharacteristics} />} />
          <Route path="/FP_MLKEY" element={isDisconnected ? null : <FingerPrint_MLKEY allCharacteristics={allCharacteristics} />} />
          <Route path="/BLS" element={isDisconnected ? null : <BloodPressure allCharacteristics={allCharacteristics} />} />
          <Route path="/WS" element={isDisconnected ? null : <WeightScale allCharacteristics={allCharacteristics} />} />
          <Route path="/RSC" element={isDisconnected ? null : <RunningSpeedandCadence allCharacteristics={allCharacteristics} />} />
          <Route path="/CGM" element={isDisconnected ? null : <ContinuousGlucoseMonitoring allCharacteristics={allCharacteristics} />} />
	        <Route path="/WCom" element={isDisconnected ? null : <WifiCommissioning allCharacteristics={allCharacteristics} />} />
          <Route path="/FC" element={isDisconnected ? null : <FanProject allCharacteristics={allCharacteristics} />} />
          <Route path="/SMP" element={isDisconnected ? null : <SMP allCharacteristics={allCharacteristics} />} />
          <Route path="/Electrocardiogram" element={isDisconnected ? null : <Electrocardiogram allCharacteristics={allCharacteristics} />} />
          <Route path="/Pulse_Oximeter" element={isDisconnected ? null : <Pulse_Oximeter allCharacteristics={allCharacteristics} />} />
	        <Route path="/HUB_DYN" element={isDisconnected ? null : <HUB_DYN allCharacteristics={allCharacteristics} />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <HashRouter>
    <AppInner />
  </HashRouter>
);

export default App;

