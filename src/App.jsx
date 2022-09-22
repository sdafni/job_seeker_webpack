
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
  Box, SimpleGrid, HStack, VStack, GridItem, Grid, Container, Heading, Text, Flex, Button, Stack
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

// TODO db dups, as in bg script
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

  // 2. Extend the theme with new layer styles
  const theme = extendTheme(
    {
      //https://chakra-ui.com/docs/styled-system/customize-theme
      components: {
        Button: {
          // 3. We can add a new visual variant
          variants: {
            'negative': {
              bg: 'red.200',
            },
            'positive': {
              bg: 'blue.200',
            },
          },
        },
      },
      layerStyles: {
        base: {
          bg: 'gray.50',
          //border: '1px solid',
          borderColor: 'gray.400',
          borderRadius: "md",
          padding: "20px 5px ",
        },
        card_section: {
          padding: "0px 5px 8px 3px",
          borderRight: "1px",
          borderColor: 'blue.400',
          width: "300px",
        }
      },
    },
    )



  return (
    <ChakraProvider theme={theme}>
      <Container
        layerStyle={'base'}
        marginLeft="10px"
        maxH="100%"
        maxW="100%"

      >
        <Grid
          layerStyle={'base'}
          maxW="700px"
          height="900px"
        >
          <GridItem
            layerStyle={'base'}
          >
            <VStack
              layerStyle={'base'}
              align="left"
              spacing="20px"
            >
              <Box >
                <AddJob addJob={addJob} > </AddJob>
              </Box>

              {jobs.map((job, index) => (

                <HStack
                  layerStyle={'base'}
                  height="80px"
                  spacing={6}
                  align="left"
                  justify="left"
                  bg="gray.200"
                  boxShadow='lg'
                >
                  <Box layerStyle={'card_section'} width="200px">{job.companyName}</Box>
                  <Box layerStyle={'card_section'} >{job.jobTitle}</Box>
                  <Box layerStyle={'card_section'} width="150px" borderRight="0px">
                    <Flex gap="4px" >
                      <DeleteJobDialog onDeleteJob={deleteJob} job={job}>Delete job dialog</DeleteJobDialog>
                      <EditJobDialog onEditJob={values => updateJob({ ...values, id: job.id })} job={job}>Edit job modal</EditJobDialog>
                    </Flex>
                  </Box>
                </HStack>
              ))}

            </VStack>

          </GridItem>
        </Grid>
      </Container>
    </ChakraProvider>
  )
}



export default App;
