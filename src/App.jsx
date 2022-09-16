
import { ChakraProvider, Box, SimpleGrid, HStack, VStack, GridItem, Grid, Container, Heading, Text, Flex, Button, Stack } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import { useState, useEffect } from 'react'

import AddJob from './components/AddJob';
import DeleteJobDialog from './components/DeleteJobDialog';
import EditJobDialog from './components/EditJob';



import { initializeApp } from 'firebase/app';
import { getFirestore } from "@firebase/firestore";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc
} from "firebase/firestore";// Follow this pattern to import other Firebase services


const firebaseConfig = {
  apiKey: "AIzaSyBZAyI_ON7F4VEZ_9k1ETzF4_k6qcBJ1uo",
  authDomain: "yuveta2-166505.firebaseapp.com",
  databaseURL: "https://yuveta2-166505-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "yuveta2-166505",
  storageBucket: "yuveta2-166505.appspot.com",
  messagingSenderId: "238877844764",
  appId: "1:238877844764:web:0b49af2563aa55139806d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const jobsCollectionRef = collection(db, "jobs");







function App(props) {

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getJobs = async () => {
      const jobsFromServer = await fetchJobs()
      setJobs(jobsFromServer)
    }
    getJobs()
  }, [])


  const fetchJobs = async () => {
    const JobsColSnapshot = await getDocs(jobsCollectionRef);
    const jobsList = JobsColSnapshot.docs.map(doc => doc.data());
    return jobsList;
  }

  const addJob = async (job) => {
    const id = String(Math.floor(Math.random() * 10000) + 1);
    const newJob = { id, ...job }
    await setDoc(doc(db, "jobs", newJob.id), newJob);
    setJobs([...jobs, newJob])
  }

  const deleteJob = async (id) => {
    const jobDoc = doc(db, "jobs", id);
    await deleteDoc(jobDoc);
    setJobs(jobs.filter((job) => job.id !== id))
  }

  const updateJob = async (modifiedJob) => {
    const jobDoc = doc(db, "jobs", modifiedJob.id);
    await updateDoc(jobDoc, modifiedJob);
    setJobs(jobs.map(j => modifiedJob.id === j.id ? Object.assign(j, modifiedJob) : j))
  }

  if (props.content_view) {

      let box_pos = {
          border: "1px",
          height: "90px",
          width: "250px",
          position: "fixed",
          bottom: "0",
          right: "0",
          marginLeft: "100px",
          marginRight: "3px",
          marginBottom: "17px"
      }  
    
      return (
          <ChakraProvider >
                  <Box 
                      {...box_pos}
                  
                  > Job Seeker add job
                      <AddJob  addJob={addJob} > Add Job </AddJob>
                  </Box>
          </ChakraProvider>
      )
    
  } else {
  return (
    <ChakraProvider>
      <Container
        p="2"
        bg="gray.200"
        maxH="100%"
        maxW="100%"
      >

        <Grid
          templateAreas={`"header header"
                          "nav main"
                          "nav footer"`}
          gridTemplateRows={'60px 1fr 100px'}
          gridTemplateColumns={'100px 1fr'}
          gap='1.5'
          color='blackAlpha.700'
          fontWeight='bold'
          height="900px"
          maxW="100%"
        >
          <GridItem pl='2' bg='white' area={'header'} borderRadius="md">
            <Heading textAlign="center" fontSize="ld"> Jobs Dashboard </Heading>
          </GridItem>
          <GridItem pl='2' bg='white' area={'nav'} borderRadius="md">
            Nav placeholder
          </GridItem>

          <GridItem  p='2' bg='white' area={'main'} borderRadius="md">
            <AddJob  addJob={addJob} > AddJob </AddJob>
            
          <VStack align="left" >
            {jobs.map((job, index) => (

                <HStack 
                height="80px"
                padding="10px 10px "
                spacing={6}
                align="left"
                borderRadius="md"
                bg="cyan.100"
                justify="left"
                maxWidth="900px"
                >
                            <Box padding="20px 10px " borderRight="1px" width="300px">{job.companyName}</Box>
                            <Box padding="20px 10px " borderRight="1px" width="300px">{job.jobTitle}</Box>
                            <Box padding="10px 10px " >
                              <Flex >
                                <DeleteJobDialog onDeleteJob={deleteJob} job={job}>Delete job dialog</DeleteJobDialog>
                                <EditJobDialog onEditJob={values => updateJob({...values, id: job.id})} job={job}>Edit job modal</EditJobDialog>
                              </Flex>
                            </Box>
                    </HStack>
                        ))}

          </VStack>
            {/* <TableContainer >
              <Table variant='simple'  colorScheme="whiteAlpha"  style={{ borderCollapse: 'separate' }}>
                <TableCaption>Pendig jobs</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Company</Th>
                    <Th>title</Th>
                    <Th>actions</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
           
                  {jobs.map((job, index) => (
                    <Tr  m="22px" borderRadius="md"  border='1px' borderColor='gray.800' style={{ borderCollapse: 'separate' }}>
                      <Td>{job.companyName}</Td>
                      <Td>{job.jobTitle}</Td>
                      <Td>
                        <Flex>
                          <DeleteJobDialog onDeleteJob={deleteJob} job={job}>Delete job dialog</DeleteJobDialog>
                          <EditJobDialog onEditJob={values => updateJob({...values, id: job.id})} job={job}>Edit job modal</EditJobDialog>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}

                </Tbody>
              </Table>
            </TableContainer> */}

          </GridItem>
          <GridItem pl='2' bg='white' area={'footer'} borderRadius="md">
            Footer
          </GridItem>
        </Grid>



      </Container>

    </ChakraProvider>
  )
          }

}



export  default App;
