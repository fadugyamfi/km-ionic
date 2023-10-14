import { reactive } from "vue";


export function useForm(fields: { [key: string]: any }) {

    return reactive({
        fields,
        processing: false,
        error: null as any,
        errors: {} as { [key: string]: any },

        async submit(submitter: Function) {
            if( this.processing ) return;

            this.error = null;
            this.processing = true;

            try {
                await submitter(this.fields);
            } catch(err) {
                this.error = err;
            } finally {
                this.processing = false;
            }
        },

        hasErrors() {
            return Object.keys(this.errors).some((key: string) => this.errors[key] != false);
        },

        validate(event: Event) {
            const input = (event.target as HTMLInputElement);
            const value = input.value;
            const name = input.name;
            this.errors[name] = false;

            if( input.required && (!value || value == '') ) {
                this.errors[name] = true;
            }
        },

        validateSelectInput(event: Event) {
            const input = (event.target as HTMLSelectElement);
            const value = input.value;
            const name = input.name;
            this.errors[name] = false;

            if( input.required && (!value || value == '') ) {
                this.errors[name] = true;
            }
        },
    })
}
