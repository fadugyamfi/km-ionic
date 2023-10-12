import { reactive } from "vue";


export default function useForm(fields: object) {

    return reactive({
        fields,
        processing: false,
        error: null as any,

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

        isValid(validator: Function) {

        }
    })
}
