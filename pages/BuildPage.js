import React from 'react';
import { ScrollView, Image, Text, StyleSheet, View } from 'react-native';
import { CheckBox, Divider, Overlay } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { baseUrl } from '../shared/baseUrl';
import { SearchableList } from '../components/SearchableList';

export const BuildPage = () => {
    const [build, setBuild] = React.useState({
        melee: 'Melee Weapon',
        armor: 'Armor',
        ranged: 'Ranged Weapon',
        artifactOne: 'Artifact 1',
        artifactTwo: 'Artifact 2',
        artifactThree: 'Artifact 3',
    });

    const setItem = (slot, name) => {
        // takes an item slot and the name of the new item
        let newBuild = { ...build, [slot]: name }; // spread the build and replace the item name for the given slot
        setBuild(newBuild);
        console.log(newBuild);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Melee Weapon</Text>
            <Item type="melee" name={build.melee} onChange={setItem} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Armor</Text>
            <Item type="armor" name={build.armor} onChange={setItem} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Ranged Weapon</Text>
            <Item type="ranged" name={build.ranged} onChange={setItem} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 1</Text>
            <Item
                type="artifactOne"
                name={build.artifactOne}
                onChange={setItem}
            />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 2</Text>
            <Item
                type="artifactTwo"
                name={build.artifactTwo}
                onChange={setItem}
            />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 3</Text>
            <Item
                type="artifactThree"
                name={build.artifactThree}
                onChange={setItem}
            />
            <Divider style={styles.divider} />
        </ScrollView>
    );
};

const Item = (props) => {
    const [checked, setChecked] = React.useState(false);
    const [overlayVisible, setOverlayVisible] = React.useState(false);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    const dataArray = [
        { id: 0, name: 'Sword' },
        { id: 1, name: 'Axe' },
        { id: 2, name: 'Spear' },
    ];

    const setThisItem = (item) => {
        props.onChange(props.type, item.name);
        toggleOverlay();
    };

    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={toggleOverlay}>
                <Image
                    source={require('../assets/item-default.png')}
                    style={styles.itemImage}
                />
            </TouchableOpacity>
            <View style={styles.itemSummary}>
                <Text style={styles.itemName}>{props.name}</Text>
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
            <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
                <SearchableList data={dataArray} onSelection={setThisItem} />
            </Overlay>
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
