// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   SafeAreaView,
// } from 'react-native';
// import { useTheme } from '../context/ThemeContext';
// import HeaderBar from '../components/HeaderBar';

// export default function SettingsScreen({ navigation }) {
//   const { theme, toggleTheme, useSystemTheme } = useTheme();
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <SafeAreaView
//       style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}
//     >
//       {/* Header Bar */}
//       <HeaderBar onSearch={(text) => console.log(text)} />

//       <View style={styles.content}>
       

//         {/* Button to Open Modal */}
//         <TouchableOpacity
//           style={styles.openModalButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={styles.openModalButtonText}>Change Theme</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Modal for Theme Selection */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View
//             style={[
//               styles.modalContent,
//               theme === 'dark' ? styles.dark : styles.light,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.title,
//                 theme === 'dark' ? styles.darkText : styles.lightText,
//               ]}
//             >
//               Select a Theme
//             </Text>

//             {/* Light Theme */}
//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 theme === 'dark' ? styles.darkButton : styles.lightButton,
//               ]}
//               onPress={() => {
//                 toggleTheme('light');
//                 setModalVisible(false);
//               }}
//             >
//               <Text style={styles.buttonText}>Light Theme</Text>
//             </TouchableOpacity>

//             {/* Dark Theme */}
//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 theme === 'dark' ? styles.darkButton : styles.lightButton,
//               ]}
//               onPress={() => {
//                 toggleTheme('dark');
//                 setModalVisible(false);
//               }}
//             >
//               <Text style={styles.buttonText}>Dark Theme</Text>
//             </TouchableOpacity>

//             {/* System Theme */}
//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 theme === 'dark' ? styles.darkButton : styles.lightButton,
//               ]}
//               onPress={() => {
//                 toggleTheme('system');
//                 setModalVisible(false);
//               }}
//             >
//               <Text style={styles.buttonText}>System Theme</Text>
//             </TouchableOpacity>

//             {/* Close Modal */}
//             <TouchableOpacity
//               style={styles.closeModalButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.closeModalButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 50,
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   light: {
//     backgroundColor: '#fff',
//   },
//   dark: {
//     backgroundColor: '#333',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 10,
//   },
//   info: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   lightText: {
//     color: '#000',
//   },
//   darkText: {
//     color: '#fff',
//   },
//   openModalButton: {
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#007bff',
//   },
//   openModalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   button: {
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   lightButton: {
//     backgroundColor: '#007bff',
//   },
//   darkButton: {
//     backgroundColor: '#444',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   closeModalButton: {
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: 'red',
//     marginTop: 20,
//   },
//   closeModalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme, useSystemTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView
      style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}
    >
      {/* Button to Open Modal */}
      <TouchableOpacity
        style={styles.openModalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.openModalButtonText}>Change Theme</Text>
      </TouchableOpacity>

      {/* Modal for Theme Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              theme === 'dark' ? styles.dark : styles.light,
            ]}
          >
            <Text
              style={[
                styles.title,
                theme === 'dark' ? styles.darkText : styles.lightText,
              ]}
            >
              Select a Theme
            </Text>

            {/* Light Theme */}
            <TouchableOpacity
              style={[
                styles.button,
                theme === 'dark' ? styles.darkButton : styles.lightButton,
              ]}
              onPress={() => {
                toggleTheme('light');
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Light Theme</Text>
            </TouchableOpacity>

            {/* Dark Theme */}
            <TouchableOpacity
              style={[
                styles.button,
                theme === 'dark' ? styles.darkButton : styles.lightButton,
              ]}
              onPress={() => {
                toggleTheme('dark');
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Dark Theme</Text>
            </TouchableOpacity>

            {/* System Theme */}
            <TouchableOpacity
              style={[
                styles.button,
                theme === 'dark' ? styles.darkButton : styles.lightButton,
              ]}
              onPress={() => {
                toggleTheme('system');
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>System Theme</Text>
            </TouchableOpacity>

            {/* Close Modal */}
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    backgroundColor: '#fff',
  },
  dark: {
    backgroundColor: '#333',
  },
  openModalButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#007bff',
  },
  openModalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  lightButton: {
    backgroundColor: '#007bff',
  },
  darkButton: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeModalButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'red',
    marginTop: 20,
  },
  closeModalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

