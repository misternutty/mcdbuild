import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    Image,
    Text,
    StyleSheet,
    View,
} from 'react-native';
import { CheckBox, Divider, Overlay } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useGameData } from '../contexts/GameDataStore';
import { useBuild, useBuildDispatch } from '../contexts/BuildStore';
import baseUrl from '../shared/baseUrl';
import { SearchableList } from '../components/SearchableList';

export const BuildPage = () => {
    // hook into the build store and dispatch for updating the build store
    const build = useBuild();
    const dispatch = useBuildDispatch();

    // store the item in the build slot by dispatching the slot and item to the build store
    const setItem = (slot = '', item = {}) => dispatch({
        type: 'SET_ITEM',
        payload: {
            slot: slot,
            item: item
        }
    });

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Melee Weapon</Text>
            <Item slot="melee" data={build.melee} onChange={setItem} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Armor</Text>
            <Item slot="armor" data={build.armor} onChange={setItem} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Ranged Weapon</Text>
            <Item slot="ranged" data={build.ranged} onChange={setItem} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 1</Text>
            <Item
                slot="artifactOne"
                data={build.artifactOne}
                onChange={setItem}
                isArtifact
            />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 2</Text>
            <Item
                slot="artifactTwo"
                data={build.artifactTwo}
                onChange={setItem}
                isArtifact
            />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 3</Text>
            <Item
                slot="artifactThree"
                data={build.artifactThree}
                onChange={setItem}
                isArtifact
            />
        </ScrollView>
    );
};

const Item = ({ slot, data, onChange, isArtifact }) => {
    // set up local state
    const [checked, setChecked] = React.useState(false);
    const [overlayVisible, setOverlayVisible] = React.useState(false);

    // grab the game data for populating the list of items
    const store = useGameData();

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    // wrap the onChange prop function with the overlay toggle
    const setThisItem = (item) => {
        onChange(slot, item);
        toggleOverlay();
    };

    return (
        <View style={styles.item}>
            {store[slot] || (isArtifact && store['artifact']) ? ( // artifacts use the same list
                <>
                    <TouchableOpacity onPress={toggleOverlay}>
                        <Image
                            source={
                                data.image
                                    ? { uri: baseUrl + data.image }
                                    : require('../assets/item-default.png')
                            }
                            style={styles.itemImage}
                        />
                    </TouchableOpacity>
                    {data.traits && ( // only render if the item has traits
                        <View style={styles.itemSummary}>
                            <Text style={styles.itemName}>{data.name}</Text>
                            {data.traits.map((trait, index) => (
                                <Text style={styles.itemModifier} key={index}>
                                    {trait}
                                </Text>
                            ))}
                            <CheckBox
                                title="Wishlist"
                                uncheckedIcon="plus"
                                checkedIcon="check"
                                checkedColor="green"
                                checked={checked}
                                onPress={() => setChecked(!checked)}
                            />
                        </View>
                    )}
                    <Overlay
                        isVisible={overlayVisible}
                        onBackdropPress={toggleOverlay}
                    >
                        <SearchableList
                            data={isArtifact ? store['artifact'] : store[slot]}
                            onSelection={setThisItem}
                        />
                    </Overlay>
                </>
            ) : (
                <ActivityIndicator />
            )}
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
