import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure
  } from '@chakra-ui/react'

  import { useRef } from 'react'

function DeleteJobDialog(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
  
    function DialogDeleteJob(e, id) {
        e.preventDefault()
        props.onDeleteJob(id)
        onClose()
    }

    return (
      <>
        <Button colorScheme='red' onClick={onOpen}>
          Delete Job
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Job
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                {/* props.onDeleteJob(props.job.id) */}

                <Button colorScheme='red' onClick={event => DialogDeleteJob(event, props.job.id)} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

export default DeleteJobDialog