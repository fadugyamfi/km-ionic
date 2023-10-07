import { useToastStore } from '../stores/ToastStore';
import AppStorage from '../stores/AppStorage';

const storage = new AppStorage();

const meta = (key:string) => {
    const meta = document.querySelector(`meta[name="${key}"]`);
    return meta ? meta.getAttribute('content') : null;
};



export function handleAxiosRequestError(error:any) {
    const toastStore = useToastStore();

    if( error.response?.status == 401 ) {
        return refreshAuth();
    }

    else if( error.response?.status == 422 ) {
        const message = Array.isArray(error.response.data.message) ? error.response.data.message.join('<br />') : error.response.data.message;
        toastStore.showError(message, 'Validation Error');
    }

    else if( error.response?.status >= 400 && error.response?.status < 500 ) {
        const message = Array.isArray(error.response.data.message) ? error.response.data.message.join('<br />') : error.response.data.message;
        toastStore.showError(message, 'Invalid Request');
    }

    else if( error.response?.status >= 500 ) {
        toastStore.showError(error.response.data.message, 'Server Error');
    }
}

export async function refreshAuth() {
    const toastStore = useToastStore();

    try {
        const authResult = await storage.get('auth');
        if( !authResult ) {
            toastStore.showError('Unauthorized. Please try again');
            return;
        }

        const stored = authResult || '';
        const auth = JSON.parse(stored);

        const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': meta("csrf-token"),
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.access_token}`
            } as HeadersInit,
            body: JSON.stringify({
                "Token": `${auth.access_token}`
            })
        });

        const json = await response.json();

        if( json && json.access_token ) {
            storage.set("auth", json);
            window.location.reload();
        }
    } catch(e) {
        toastStore.showError('Auth Refresh Failed')
        console.log(e);
    }
}
