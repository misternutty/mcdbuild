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
import { useWishlistDispatch } from '../contexts/WishlistStore';
import baseUrl from '../shared/baseUrl';
import { SearchableList } from '../components/SearchableList';

export const BuildPage = () => {
    const build = useBuild();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Melee Weapon</Text>
            <Item slot="melee" itemData={build.melee} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Armor</Text>
            <Item slot="armor" itemData={build.armor} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Ranged Weapon</Text>
            <Item slot="ranged" itemData={build.ranged} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 1</Text>
            <Item
                slot="artifactOne"
                itemData={build.artifactOne}
                isArtifact
            />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 2</Text>
            <Item
                slot="artifactTwo"
                itemData={build.artifactTwo}
                isArtifact
            />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 3</Text>
            <Item
                slot="artifactThree"
                itemData={build.artifactThree}
                isArtifact
            />
        </ScrollView>
    );
};

const Item = ({ slot, itemData, isArtifact }) => {
    // set up local state
    const [checked, setChecked] = React.useState(false);
    const [overlayVisible, setOverlayVisible] = React.useState(false);

    // hook into the game data for populating the list of items
    const gameData = useGameData();

    // hook into build dispatch to update build items
    const dispatchToBuild = useBuildDispatch();

    // hook into the wishlist dispatch to add/delete wishlist items
    const dispatchToWishlist = useWishlistDispatch();

    const setItem = (item) => {
        // dispatch item update when new item is set
        dispatchToBuild({
            type: 'SET_ITEM',
            payload: {
                slot: slot,
                item: item
            }
        });

        // if last item was wishlisted, remove it from the wishlist
        checked && toggleWishlist();
        toggleOverlay();
    };

    // bundle checkbox state toggling with wishlist dispatching
    const toggleWishlist = () => {
        const actionType = checked ? 'DELETE' : 'ADD'
        setChecked(!checked);
        dispatchToWishlist({
            type: actionType,
            payload: itemData
        });
    }
    
    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    return (
        <View style={styles.item}>
            {gameData[slot] || (isArtifact && gameData['artifact']) ? ( // artifacts use the same list
                <>
                    <TouchableOpacity onPress={toggleOverlay}>
                        <Image
                            source={
                                itemData.image
                                    ? { uri: baseUrl + itemData.image }
                                    : require('../assets/item-default.png')
                            }
                            style={styles.itemImage}
                        />
                    </TouchableOpacity>
                    {itemData.traits && ( // only render if the item has traits
                        <View style={styles.itemSummary}>
                            <Text style={styles.itemName}>{itemData.name}</Text>
                            {itemData.traits.map((trait, index) => (
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
                                onPress={toggleWishlist}
                            />
                        </View>
                    )}
                    <Overlay
                        isVisible={overlayVisible}
                        onBackdropPress={toggleOverlay}
                    >
                        <SearchableList
                            data={isArtifact ? gameData['artifact'] : gameData[slot]}
                            onSelection={setItem}
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
