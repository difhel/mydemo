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
        },
        'dapp-client'?: {
            openUrl: (url: string) => void;
            openEnrollment: () => void;
            showKeyboardAccessoryView: (isShow: boolean) => void; // noop
            lockScroll: (isLocked: boolean) => void; // noop since scrolling is locked by default
            subscribed: (isSubscribed: boolean) => void;
            closeApp: () => void;

        },
        'dapp-auth'?: {
            authenticate: (callback: (result: { isAuthenticated: boolean; error: string }) => void) => void;
        }
    }
}
