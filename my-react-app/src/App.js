import logo from './logo.svg';
import searchIcon from "./search.svg";
import contactSupportIcon from "./contact_support.svg";
import personIcon from "./person.svg";
import tuneIcon from "./tune.svg";
import './App.css';
import React, { useState } from "react";
import Select from "react-select";

const patientOptions = [
  { value: 'patient_a', label: 'Patient A' },
  { value: 'patient_b', label: 'Patient B' },
  { value: 'patient_c', label: 'Patient C' },
];

const questionOptions = [
  { value: 'age', label: "What is the patient's age?" },
  { value: 'allergy', label: 'Does the patient has any allergy?' },
  { value: 'prescription', label: 'Does the patient has any existing prescription?' },
];

function App() {
  const [question, setQuestion] = useState("");
  const [patientId, setPatientId] = useState("");
  const [messages, setMessages] = useState([]);
  const [patientName, setPatientName] = useState("First Last");
  const [patientGender, setPatientGender] = useState("")
  const [patientDOB, setPatientDOB] = useState("")
  const [patientAddr, setPatientAddr] = useState("")

  return (
    <div style={{ width: 1920, height: 1500, left: 0, top: 0, position: 'absolute', background: '#F0FFFF' }}>
      <div style={{ width: 1500, height: 1500, left: 75, top: 74, position: 'absolute' }}>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div style={{ width: 500, height: 67, left: 0, top: 24, position: 'absolute', color: '#1D98DF', fontSize: 64, fontFamily: 'Inter', fontWeight: 400 }}>
              Hello, Doctor
          </div>
          <div style={{ width: 397, left: 890, top: 0, position: 'absolute', display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <img src={logo} alt="logo" style={{ width: 200, height: 200 }} />
              <div style={{ width: 268, height: 67, textAlign: 'right', color: '#1D98DF', fontSize: 48, fontFamily: 'Inter', fontWeight: 700 }}>
                ClinicalBot
              </div>
          </div>
          <div style={{ width: 1287, height: 712, left: 0, top: 177, position: 'absolute' }}>


            <div style={{
              left: 0, top: 0, position: 'absolute',
              display: 'inline-flex', alignItems: 'center', gap: 16
            }}>
              <div style={{
                width: 509.79, height: 62, padding: 14,
                background: 'white', boxShadow: '0px 4px 4px rgba(0,0,0,0.25) inset',
                borderRadius: 35, display: 'flex', alignItems: 'center', gap: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 40.72, height: 40.72, padding: 5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={searchIcon} alt="search" style={{ width: 30.54, height: 30.54 }} />
                  </div>
                  <Select
                      options={[
                        { value: "Adrianne466_Jonnie215_Glover433_99d3b9b2-46c1-ef9e-da70-81ac3d365f52", label: "Adrianne Jonnie Glover", gender: "female", dob: "1939-06-16", address: "203 Marvin Parade Suite 80, North Westport, MA, US, 00000" },
                        { value: "Ada662_Sari509_Balistreri607_dbc4a3f7-9c69-4435-3ce3-4e1988ab6b91", label: "Ada Sari Balistreri", gender: "female", dob: "1959-08-01", address: "315 Simonis Parade, Somerville, MA, USA, 02138" },
                        { value: "Aleen595_Alanna27_Rogahn59_5358446e-e631-c640-5880-c6cf99dc8bed", label: "Aleen Alanna Rogahn", gender: "female", dob: "1973-10-11", address: "949 Okuneva Skyway Suite 61, Worcester, MA, US, 01604" },
                        { value: "Aleisha941_Treutel973_2d799deb-df07-0c4a-8692-42cce7595251", label: "Aleisha Treutel", gender: "female", dob: "2006-02-13", address: "1095 Will Ville, Springfield, MA, US, 01108" },
                        { value: "Zenia843_Genesis248_Weimann465_655baba7-47ed-22ac-2093-1196ebb44928", label: "Zenia Genesis Weimann", gender: "female", dob: "1927-03-20", address: "161 Hammes Union Unit 6, West Tisbury, MA, US, 00000" },
                      ]}
                      onChange={(e) => {
                        setPatientId(e.value)
                        setPatientName(e.label)
                        setPatientGender(e.gender)
                        setPatientDOB(e.dob)
                        setPatientAddr(e.address)
                      }}
                      placeholder="Select a patient..."
                      styles={{ container: (base) => ({ ...base, width: 300 }) }}
                    />

                </div>
                <button
                  onClick={() => {
                    setMessages(prev => [...prev, { type: 'user', text: `Patient ${patientId}: ${question}` }]);
                     fetch(`${process.env.REACT_APP_BACKEND_URL}/getPatientNotesById`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ patientId, doctor_request: question })
                    })
                      .then(res => res.json())
                      .then(data => {
                        const reply = data.response || data.initial_llm_response || JSON.stringify(data);
                        setMessages(prev => [...prev, { type: 'bot', text: reply }]);
                      })
                      .catch(err => console.error(err));
                  }}
                  style={{ marginLeft: 10, height: 35 }}
                >
                  Begin!
                </button>
              </div>
              <div style={{
                width: 46.82, height: 46.82, padding: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <img src={tuneIcon} alt="tune" style={{ width: 35.12, height: 35.12 }} />
              </div>
            </div>

            <div style={{
              width: 567, height: 62, padding: 9,
              left: 719.62, top: 0, position: 'absolute',
              background: 'white', boxShadow: '0px 4px 4px rgba(0,0,0,0.25) inset',
              borderRadius: 35, display: 'inline-flex', alignItems: 'center', gap: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ width: 42, height: 42, padding: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={contactSupportIcon} alt="support" style={{ width: 29.75, height: 35 }} />
                </div>
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  style={{ width: 300, height: 30, fontSize: 16, paddingLeft: 10 }}
                />
              </div>
              <button
                onClick={() => {
                  setMessages(prev => [...prev, { type: 'user', text: question }]);
                  fetch(`${process.env.REACT_APP_BACKEND_URL}/chatMessage`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ doctor_request: question })
                  })
                    .then(res => res.json())
                    .then(data => {
                      const reply = data.response || data.reply || JSON.stringify(data);
                      setMessages(prev => [...prev, { type: 'bot', text: reply }]);
                    })
                    .catch(err => console.error(err));
                }}
                style={{ marginLeft: 10, height: 35 }}
              >
                Ask
              </button>
            </div>

            <div style={{
              width: 573, padding: 45,
              left: 0, top: 106, position: 'absolute',
              background: 'white', boxShadow: '0px 4px 4px rgba(0,0,0,0.25) inset',
              borderRadius: 35, display: 'inline-flex', alignItems: 'center', gap: 43
            }}>
              <div style={{ padding: 23, borderRadius: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={personIcon} alt="person" style={{ width: 66, height: 66 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                <div style={{ color: '#828282', fontSize: 36, fontFamily: 'Inter', fontWeight: 400 }}>
                  {patientName}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div style={{ color: '#828282', fontSize: 24 }}>Gender: {patientGender}</div>
                  <div style={{ color: '#828282', fontSize: 24 }}>DOB: {patientDOB}</div>
                  <div style={{ color: '#828282', fontSize: 24 }}>Address: {patientAddr}</div>
                </div>
              </div>
            </div>

            <div style={{
              width: 567, height: 571, padding: 20,
              left: 720, top: 106, position: 'absolute',
              background: 'white', boxShadow: '0px 4px 4px rgba(0,0,0,0.25) inset',
              borderRadius: 35, overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 10,
                height: '100%', overflowY: 'auto'
              }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                      backgroundColor: msg.type === 'user' ? '#0078fe' : '#e0e0e0',
                      color: msg.type === 'user' ? 'white' : 'black',
                      padding: 12, borderRadius: 20, maxWidth: '70%'
                    }}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
