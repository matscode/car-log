import {Text, TouchableOpacity, StyleSheet} from "react-native";

export function CustomButton({children:child, style, textStyle = {}, ...props}) {
    return (
        <TouchableOpacity onPress={props.onPress} style={{...s.btn, ...style}} {...props}>
            <Text style={{...textStyle,...s.btnText}}>{child}</Text>
        </TouchableOpacity>
    );
}


const s = StyleSheet.create({
    btn: {
        marginVertical: 8,
        backgroundColor: '#39b',
        borderRadius: 5,
        padding: 12,
    },
    btnText: {
        color: "white",
        fontSize: 16
    }
});