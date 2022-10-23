import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppleHealthKit from 'react-native-health'



export default function App() {
  const [stepCount, setStepCount] = useState(0);

  /* Permission options */
  const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.HeartRate, AppleHealthKit.Constants.Permissions.StepCount],
      write: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount],
    },
  }

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error) => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!')
      }

      /* Can now read or write to HealthKit */

      const options = {
        startDate: new Date(2020, 1, 1).toISOString(),
      }

      AppleHealthKit.getHeartRateSamples(
        options,
        (callbackError, results) => {
          /* Samples are now collected from HealthKit */
        },
      )
    })

  }, [])


  useEffect(() => {
    AppleHealthKit.getStepCount(null, (err, results) => {
      if (err) {
        console.log('error getting latest height: ', err)
        return
      }
      setStepCount(results.value);
      console.log(results)
    })
    
    // AppleHealthKit.getAuthStatus(permissions, (err, results) => {
    //   const {permissions: { read, write }} = results;
    //   if(read[0] === 2) {
    //     console.log("SharingAuthorized TO READ");
    //   }
    //   if(write[0] === 2) {
    //     console.log("SharingAuthorized TO WRITE");
    //   }
    //   // console.log(err, results)
    // });

  }, [])

  
  

  return (
    <View style={styles.container}>
      <Text>You have {stepCount} steps!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
