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

import { useRef } from 'react'
import { Formik, Field, Form } from 'formik';
import AddNewJobForm from './AddNewJobForm';

function AddJob(props) {
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: props.content_view })

    const initialRef = useRef(null)

    // TODO review validate
    function validateName(value) {
        let error
        if (!value) {
            error = 'Name is required'
        }
        return error
    }

    return (
        <>
            <Button onClick={onOpen}
                    variant={"positive"}
                        >Add job</Button>

            <Modal
                layerStyle={'base'}
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Create new Job</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <Formik
                            initialValues={{
                                companyName: '',
                                jobTitle: ''

                            }}
                            onSubmit={(values, actions) => {
                                props.addJob(values)

                            }}
                        >
                            <AddNewJobForm onClose={onClose}></AddNewJobForm>

                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddJob