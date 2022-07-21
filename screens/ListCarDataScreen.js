import { FlatList, StyleSheet, Text, View} from 'react-native';
import {useEffect, useLayoutEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CustomButton} from "../CustomButton";
import {CARS_STORAGE_KEY} from "../const";

export default function ListCarDataScreen({navigation}) {
    const [cars, setCars] = useState([]);

    async function getCardData() {
        let Storage = JSON.parse(await AsyncStorage.getItem(CARS_STORAGE_KEY))

        if (!Storage) Storage = [];

        setCars(Storage);
    }

    async function clearCars() {
        await AsyncStorage.clear();
        setCars([]);

        alert('Storage cleared!!');
    }

    useEffect(() => {
        getCardData();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <CustomButton
                    onPress={clearCars}
                    style={{marginRight: 16}}
                >
                    Clear Cars
                </CustomButton>
            ),
        });
    }, [navigation]);

    function handleDelete(carId) {
        setCars(cars.filter((car) => car.id !== carId));
    }

    return (
        <View style={s.wrapper} key={new Date()}>
            {cars.length ? <FlatList
                style={{flex: 1, width: '100%'}}
                data={cars}
                renderItem={({item: car}) => (
                    <View style={s.car}>
                        <View style={s.carInfo}>
                            <Text style={s.carBrand}>{car.carBrand}</Text>
                            <Text style={s.carModel}>{car.carModel}</Text>
                        </View>

                        <CustomButton onPress={() => handleDelete(car.id)} style={s.btn}>
                            Delete
                        </CustomButton>
                    </View>
                )}
            /> : (<View style={{...s.container, width: '100%'}}>
                <Text style={s.emptyCarRecord}>No car record yet!</Text>
            </View>)}
        </View>
    );
}

const s = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 16,
        flex: 1,
        width: '100%',
    },
    carInfo: {
        flex:1
    },
    car: {
        backgroundColor: 'white',
        padding: 8,
        marginVertical: 8,
        borderRadius: 5,
        width: '100%',
        flexDirection: 'row',
        alignItems: "center",
    },
    carBrand: {
        fontSize: 22,
        color: '#333',
        marginBottom: 4,
    },
    carModel: {
        fontSize: 15,
        color: '#bbb'
    },
    emptyCarRecord: {
        fontSize: 22,
        color: '#aaa',
    },

    btn: {
        backgroundColor: '#f8b6b6',
    },

    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
