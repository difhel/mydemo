import { useState, useRef, useEffect } from 'react'
import './App.css'
import useForceUpdate from './util/useForceUpdate';

function App() {
  const [mainButtonText, setMainButtonText] = useState('Click me');
  const isMainButtonShownRef = useRef(false);
  const isMainButtonActiveRef = useRef(true);
  const isMainButtonProgressShownRef = useRef(false);
  const [mainButtonTextColor, setMainButtonTextColor] = useState('#000');
  const [mainButtonColor, setMainButtonColor] = useState('#fff');
  const [mainButtonDisabledColor, setMainButtonDisabledColor] = useState('#00000050');
  const [authResult, setAuthResult] = useState('');
  const forceUpdate = useForceUpdate();

  const updateMainButton = () => {
    window['dapp-mainbutton']?.setParams({
      text: mainButtonText,
      textColor: mainButtonTextColor,
      color: mainButtonColor,
      disabledColor: mainButtonDisabledColor,
      isVisible: isMainButtonShownRef.current,
      isActive: isMainButtonActiveRef.current
    });
  };

  useEffect(() => {
    window['dapp-mainbutton']?.onClick(() => {
      alert('clicked');
    });
  }, []);

  return (
    <>
      <h1>MyTonWallet Demo DApp</h1>
      <ul>
        <li>
          Is MyTonWallet environment? {window.mytonwalletClient ? <span className="ok">true</span> : <span className="error">false</span>}
        </li>
        <li>
          MyTonWallet version: <b>{window.mytonwalletClient?.v}</b>
        </li>
        <li>
          MyTonWallet styles injected: {window.mytonwalletClient?.$internal.stylesInjected ? <span className="ok">true</span> : <span className="error">false</span>}
        </li>
        <li>
          window.visualViewport patched for virtual keyboard: {window.mytonwalletClient?.$internal.virtualKeyboardHeightChangeReady ? <span className="ok">true</span> : <span className="error">false</span>}
        </li>
      </ul>

      <div>
        <h2>Main Button</h2>
        <div className="item">
          <label>Text</label>
          <input type="text" value={mainButtonText} onChange={(e) => setMainButtonText(e.target.value)} />
          <button onClick={updateMainButton}>Update</button>
        </div>
        <div className="item">
          <label>Text color</label>
          <input type="text" value={mainButtonTextColor} onChange={(e) => setMainButtonTextColor(e.target.value)} />
          <button onClick={updateMainButton}>Update</button>
        </div>
        <div className="item">
          <label>Background color</label>
          <input type="text" value={mainButtonColor} onChange={(e) => setMainButtonColor(e.target.value)} />
          <button onClick={updateMainButton}>Update</button>
        </div>
        <div className="item">
          <label>Disabled background color</label>
          <input type="text" value={mainButtonDisabledColor} onChange={(e) => setMainButtonDisabledColor(e.target.value)} />
          <button onClick={updateMainButton}>Update</button>
        </div>
        <div className="item final">
          <button onClick={() => {
            isMainButtonShownRef.current = !isMainButtonShownRef.current;
            forceUpdate();
            updateMainButton();
          }}>{isMainButtonShownRef.current ? 'Hide' : 'Show'}</button>
          <button onClick={() => {
            isMainButtonActiveRef.current = !isMainButtonActiveRef.current;
            forceUpdate();
            updateMainButton();
          }}>{isMainButtonActiveRef.current ? 'Disable' : 'Enable'}</button>
          <button onClick={() => {
            isMainButtonProgressShownRef.current = !isMainButtonProgressShownRef.current;
            forceUpdate();
            if (isMainButtonProgressShownRef.current) {
              window['dapp-mainbutton']?.showProgress();
            } else {
              window['dapp-mainbutton']?.hideProgress();
            }
          }}>{isMainButtonProgressShownRef.current ? 'Hide progress' : 'Show progress'}</button>
        </div>
      </div>
      <div>
        <h2>Auth</h2>
        <div className="item">
          {authResult && <span className="ok">{authResult}</span>}
        </div>
        <div className="item final">
          <button onClick={() => {
            (window as any).invokeNativeFunc('client:dapp-verify-password', [], (result: any) => {
              setAuthResult(result);
              console.log(result);
            });
          }}>Start auth</button>
        </div>
      </div>
    </>
  )
}

export default App
