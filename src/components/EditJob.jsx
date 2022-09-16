import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input
} from '@chakra-ui/react'

import {EditIcon} from '@chakra-ui/icons'


import { useRef } from 'react'
import { Formik, Field, Form } from 'formik';

function EditJobDialog(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)


    function validateName(value) {
        let error
        if (!value) {
            error = 'Name is required'
        }
        return error
    }

    return (
        <>
            <Button leftIcon={<EditIcon/>} bg="blue.200"  onClick={onOpen}></Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Edit Job</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <Formik                            
                            initialValues={{
                                companyName: props.job.companyName,
                                jobTitle: props.job.jobTitle

                            }}
                            onSubmit={(values, actions) => {
                                props.onEditJob(values)

                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Field name='companyName' validate={validateName}>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel>Company name</FormLabel>
                                                <Input {...field}  />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>


                                    <Field name='jobTitle' validate={validateName}>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel>Job Title</FormLabel>
                                                <Input {...field} p />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>


                                    <Button
                                        mt={4}
                                        colorScheme='blue'
                                        isLoading={props.isSubmitting}
                                        type='submit'
                                        onClick={onClose}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditJobDialog