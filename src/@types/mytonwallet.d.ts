export declare global {
    interface Window {
        myTonWalletClient?: {
            v: string;
            $internal: {
                stylesInjected: boolean;
                virtualKeyboardHeightChangeReady: boolean;
            }
        }
        'dapp-mainbutton'?: {
            show: () => void;
            hide: () => void;
            setParams: (params: { text: string; textColor: string; color: string; disabledColor: string; isVisible: boolean; isActive: boolean; }) => void;
            onClick: (callback: () => void) => void;
            offClick: (callback: () => void) => void;
            showProgress: () => void;
            hideProgress: () => void;
        }
    }
}
