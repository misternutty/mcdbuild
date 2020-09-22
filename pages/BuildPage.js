import React from 'react';
import { ScrollView, Text, Image, StyleSheet, View } from 'react-native';
import { CheckBox, Divider } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';

export const BuildPage = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Melee Weapon</Text>
            <Item />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Armor</Text>
            <Item />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Ranged Weapon</Text>
            <Item />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 1</Text>
            <Item />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 2</Text>
            <Item />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 3</Text>
            <Item />
            <Divider style={styles.divider} />
        </ScrollView>
    );
};

const Item = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <View style={styles.item}>
            <Image
                source={require('../assets/item-default.png')}
                style={styles.itemImage}
            />
            <View style={styles.itemSummary}>
                <Text style={styles.itemName}>Item Name</Text>
                <Text style={styles.itemModifier}>o Modifier 1</Text>
                <Text style={styles.itemModifier}>o Modifier 2</Text>
                <Text style={styles.itemModifier}>o Modifier 3</Text>
                <CheckBox
                    title="Wishlist"
                    uncheckedIcon="plus"
                    checkedIcon="check"
                    checkedColor="green"
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    divider: {
        height: 3,
        marginVertical: 5,
    },
    item: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    itemImage: {
        width: 150,
        height: 150,
        backgroundColor: '#999',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    itemSummary: {
        marginLeft: 15,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemModifier: {
        fontSize: 14,
    },
});
