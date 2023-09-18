const meta = (key:string) => {
    const meta = document.querySelector(`meta[name="${key}"]`);
    return meta ? meta.getAttribute('content') : null;
};



export function handleAxiosRequestError(error:any) {
    if( error.response?.status == 401 ) {
        return refreshAuth();
    }

    else if( error.response?.status == 422 ) {
        const message = Array.isArray(error.response.data.message) ? error.response.data.message.join('<br />') : error.response.data.message;
        // Swal.fire("Validation Error", message, "error");
    }

    else if( error.response?.status >= 400 && error.response?.status < 500 ) {
        const message = Array.isArray(error.response.data.message) ? error.response.data.message.join('<br />') : error.response.data.message;
        // Swal.fire("Invalid Request", message, "error");
    }

    else if( error.response?.status >= 500 ) {
        // Swal.fire("Server Error", error.response.data.message, "error");
    }
}

export async function refreshAuth() {
    try {
        if( !localStorage.getItem('auth') ) {
            // Swal.fire('Unauthorized', "Please try again", "error");
            return;
        }

        const stored = localStorage.getItem('auth') || '';
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
            localStorage.setItem("auth", JSON.stringify(json));
            window.location.reload();
        }
    } catch(e) {
        console.log('Auth Refresh Failed')
        console.log(e);
    }
}
