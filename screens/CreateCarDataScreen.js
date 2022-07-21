import { StyleSheet, TextInput, View} from 'react-native';
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CustomButton} from "../CustomButton";
import {CARS_STORAGE_KEY} from "../const";

export default function CreateCarDataScreen() {
    const [carBrand, setCarBrand] = useState('')
    const [carModel, setCarModel] = useState('')

    async function handleSaveData() {
        if(!(carModel && carBrand)) return;

        let Storage = JSON.parse(await AsyncStorage.getItem(CARS_STORAGE_KEY))

        if(!Storage) Storage = [];

        Storage.push({
            id: new Date().getTime(),
            carBrand,
            carModel,
        });

        await AsyncStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(Storage));

        alert('Car information saves successfully');

        // Clear input data
        setCarBrand('');
        setCarModel('');
    }

    return (
        <View style={s.wrapper}>
            <TextInput placeholder={'Car brand'}
                       style={s.input}
                       value={carBrand}
                       onChangeText={(value) => setCarBrand(value)}
            />

            <TextInput
                placeholder={'Model'}
                style={s.input}
                value={carModel}
                onChangeText={(value) => setCarModel(value)}
            />

            <CustomButton onPress={handleSaveData}>
                Save car data
            </CustomButton>
        </View>
    );
}

const s = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: 16,
        flex: 1,
        width: '100%',
    },

    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#bbb',
        fontSize: 18,
        width: '100%',
        marginVertical: 8,
        padding: 8,
    },

    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
