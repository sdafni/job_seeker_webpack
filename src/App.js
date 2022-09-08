import { ChakraProvider, Box, SimpleGrid, HStack, VStack, GridItem, Grid, Container, Heading, Text, Flex, Button } from '@chakra-ui/react'
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

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc
} from "firebase/firestore";// Follow this pattern to import other Firebase services

import { initializeApp } from 'firebase/app';
import { getFirestore } from "@firebase/firestore";
import AddJob from './components/AddJob';
import DeleteJobDialog from './components/DeleteJobDialog'

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



function App() {

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const getJobs = async () => {
      const jobsFromServer = await fetchJobs()
      setJobs(jobsFromServer)
    }

    getJobs()
  }, [])

  // Fetch Jobs
  const fetchJobs = async () => {
    const JobsColSnapshot = await getDocs(jobsCollectionRef);
    const jobsList = JobsColSnapshot.docs.map(doc => doc.data());
    return jobsList;
  }

  // Fetch Job
  const fetchJob = async (id) => {
    const data = doc(db, "jobs", id);
    return data
  }

  // Add Job
  const addJob = async (job) => {
    const id = String(Math.floor(Math.random() * 10000) + 1);
    const newJob = { id, ...job }
    await setDoc(doc(db, "jobs", newJob.id), newJob);

    const data = await fetchJobs()
    const jobsFromServer = await fetchJobs()
    setJobs(jobsFromServer)
  }

  // Delete Job
  const deleteJob = async (id) => {

    const jobDoc = doc(db, "jobs", id);
    await deleteDoc(jobDoc);
    setJobs(jobs.filter((job) => job.id !== id))
  }



  // 2. Wrap ChakraProvider at the root of your app
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

          <GridItem p='2' bg='white' area={'main'} borderRadius="md">

            <AddJob colorScheme='blue' addJob={addJob} > AddJob </AddJob>

            <TableContainer >
              <Table variant='simple' colorScheme="linkedin">
                <TableCaption>Pendig jobs</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Company</Th>
                    <Th>title</Th>
                    <Th>actions</Th>
                  </Tr>
                </Thead>
                <Tbody>

                  {jobs.map((job, index) => (
                    // <Job key={index} job={job} onDelete={onDelete} onToggle={onToggle} />

                    <Tr borderRadius="md" bg="blue.100">
                      <Td>{job.companyName}</Td>
                      <Td>{job.jobTitle}</Td>
                        <Td>
                           <DeleteJobDialog onDeleteJob={deleteJob} job={job}>Delete job dialog</DeleteJobDialog>
                        </Td>
                    </Tr>
                  ))}

                </Tbody>

              </Table>
            </TableContainer>
            {
            /* <VStack w='600px' h='300' spacing='10px' align='left'>

              <Box w='600px' h='100px' borderRadius="md" borderColor="blue.300" boxShadow='dark-lg'>
                <Flex w='600px' h='100' spacing='10px'  align="center" justify="center">

                 <Text h ="90px" w="50%" ontSize='1xl' border="1px" borderColor="blue.300" >company</ Text>
                 <Text h ="90px" ontSize='1xl' border="1px" borderColor="blue.300" >title</Text>

                </Flex>

              </Box>


            </VStack> */}
          </GridItem>
          <GridItem pl='2' bg='white' area={'footer'} borderRadius="md">
            Footer
          </GridItem>
        </Grid>
      </Container>

    </ChakraProvider>
  )
}

export default App;
