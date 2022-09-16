import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    
  } from '@chakra-ui/react'

import {DeleteIcon} from '@chakra-ui/icons'

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
        <Button leftIcon={<DeleteIcon/>}   marginRight="10px" colorScheme='red' onClick={onOpen}>
          
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