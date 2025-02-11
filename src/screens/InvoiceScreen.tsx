import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {sampleInvoiceData} from '../utils/sampleData';
import InvoicePDF from '../components/InvoicePDF';
import Share from 'react-native-share';
import {Linking} from 'react-native';

const InvoiceScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numbers, setNumbers] = useState<string[]>([]);

  const addNumber = () => {
    if (phoneNumber.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid phone number');
      return;
    }

    // Clean the number and add country code if not present
    let cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanNumber.startsWith('91')) {
      cleanNumber = '91' + cleanNumber;
    }

    if (numbers.includes(cleanNumber)) {
      Alert.alert('Duplicate', 'This number is already added');
      return;
    }

    setNumbers([...numbers, cleanNumber]);
    setPhoneNumber(''); // Clear input
  };

  const removeNumber = (numberToRemove: string) => {
    setNumbers(numbers.filter(num => num !== numberToRemove));
  };

  const generateAndSharePDF = async () => {
    if (numbers.length === 0) {
      Alert.alert('No Numbers', 'Please add at least one WhatsApp number');
      return;
    }

    try {
      const file = await InvoicePDF(sampleInvoiceData);
      
      if (file.filePath) {
        // Share to each number sequentially
        for (const number of numbers) {
          try {
            await Share.shareSingle({
              title: 'Invoice',
              url: `file://${file.filePath}`,
              type: 'application/pdf',
              social: Share.Social.WHATSAPP,
              whatsAppNumber: number,
            });
            // Small delay between shares
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (whatsappError) {
            // Fallback to WhatsApp Web
            const webWhatsappUrl = `https://wa.me/${number}`;
            await Linking.openURL(webWhatsappUrl);
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to generate or share PDF');
    }
  };

  const renderNumberItem = ({item}: {item: string}) => (
    <View style={styles.numberItem}>
      <Text style={styles.numberText}>+{item}</Text>
      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={() => removeNumber(item)}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter WhatsApp number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={12}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNumber}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={numbers}
        renderItem={renderNumberItem}
        keyExtractor={item => item}
        style={styles.numbersList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No numbers added yet</Text>
        }
      />

      <Button 
        title={`Share to ${numbers.length} Contact${numbers.length !== 1 ? 's' : ''}`}
        onPress={generateAndSharePDF}
        disabled={numbers.length === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  numbersList: {
    flex: 1,
    marginBottom: 20,
  },
  numberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  numberText: {
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default InvoiceScreen;
