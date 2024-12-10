import React, {useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import Tasks from './components/Tasks'


export default function App() {
  const [task, setTask] = useState("")
  const [taskitems, settaskitems]= useState([])

  const Handlechange = ()=>{
     Keyboard.dismiss();
     settaskitems([...taskitems, task])
     setTask(null)
  }

  const Compoletetask = (index)=>{
      Alert.alert("Delete","You want to delete this item", [{
        text: 'Cancel',
        onPress: ()=>console.log("Cancelled")
      },{
        text: 'Ok',
        onPress: ()=>{
          let itemCopy = [...taskitems];
          itemCopy.splice(index, 1);
          settaskitems(itemCopy)
        }
      }])

    
  }
  return (
    <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectiontitle}>Today's tasks</Text>
            <View style={styles.items}>
            
            {
              taskitems.map((item, index)=>{
                return(
                  <TouchableOpacity key={index} onPress={()=> Compoletetask()} >
                       <Tasks  text={item}/>
                  </TouchableOpacity>
                 
                )
              })
            }
            
            </View>
        </View>

        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? 'padding' : 'height'}
        style={styles.writetaskWrapper}>

          <TextInput style={styles.input} 
                     placeholder='Write a Task' 
                     value={task}
                     onChangeText={text=>{setTask(text)}}
                     />

          <TouchableOpacity onPress={()=> Handlechange()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
   
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectiontitle:{
      fontSize: 24,
      fontWeight: "bold"
  },
  items:{
    marginTop: 30
  },
  writetaskWrapper:{
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
  },
input:{
    paddingVertical:15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: 'c0c0c0',
    borderWidth:1,


},
addWrapper:{
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'c0c0c0',
    borderWidth:1,

},
addText:{
  fontSize: 35
},
});
