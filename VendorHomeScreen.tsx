//Type script and class component
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Image, Animated } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { NavigationProp } from '@react-navigation/native';
import { User as FirebaseUser } from 'firebase/auth';

interface VendorHomeScreenProps {
  navigation: NavigationProp<any>;
}

interface VendorHomeScreenState {
  companyName: string;
  loading: boolean;
  user: FirebaseUser | null;
}

class VendorHomeScreen extends Component<VendorHomeScreenProps, VendorHomeScreenState> {
  state: VendorHomeScreenState = {
    companyName: '',
    loading: true,
    user: auth.currentUser,
  };

  async componentDidMount() {
    await this.fetchCompanyInfo();
  }

  fetchCompanyInfo = async () => {
    const { user } = this.state;
    if (user) {
      try {
        const docRef = doc(db, 'vendors', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.setState({ companyName: docSnap.data().companyName });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching company info:', error);
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  renderItem = ({ item }: { item: { id: string; title: string; icon: any; screen: string } }) => {
    const { navigation } = this.props;
    const { user } = this.state;
    return (
      <AnimatedTouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(item.screen, { vendorId: user?.uid })}
        activeOpacity={0.7}
      >
        {item.icon && <Image source={item.icon} style={styles.icon} />}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      </AnimatedTouchableOpacity>
    );
  };

  render() {
    const { companyName, loading, user } = this.state;
    const { navigation } = this.props;
    const data = [
      { id: '1', title: 'View Bookings', icon: require('../assets/viewbookingicon.jpg'), screen: 'VendorBookings' },
      { id: '2', title: 'New Service', icon: require('../assets/viewbookingicon.jpg'), screen: 'NewService' },
    ];

    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0288D1" />
        ) : (
          <>
            {companyName ? (
              <Text style={styles.companyName}>{companyName}</Text>
            ) : (
              <Text style={styles.noCompany}>No company information available.</Text>
            )}
          </>
        )}
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cardContainer}
        />
        <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('NewService', { vendorId: user?.uid })}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  companyName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0288D1',
  },
  noCompany: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF7F50',
  },
  cardContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333333',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#0288D1',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 36,
    color: '#FFF',
    lineHeight: 40,
  },
});

export default VendorHomeScreen;
