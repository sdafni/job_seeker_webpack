import { useRef } from 'react'
import { Formik, Field, Form } from 'formik';
import {

    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input
} from '@chakra-ui/react'

//TODO use in edit
//TODO aut
// 
function AddNewJobForm(props) {
return (
    // TODO re-add validate
    <Form>


        <Field name='companyName' >
            {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel>Company name</FormLabel>
                    <Input {...field} placeholder='Company name' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
            )}
        </Field>


        <Field name='jobTitle' >
            {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel>Job Title</FormLabel>
                    <Input {...field} placeholder='Job Title' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
            )}
        </Field>

        <Button
            marginTop={4}
            isLoading={props.isSubmitting}
            type='submit'
            onClick={props.onClose}
            variant={"positive"}
        >
            Submit
        </Button>
    </Form>
)}

export  default  AddNewJobForm;