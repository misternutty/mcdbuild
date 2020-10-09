import React, { useEffect } from 'react';
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
import useStore from '../contexts/StoreContext';
import { baseUrl } from '../shared/baseUrl';
import { SearchableList } from '../components/SearchableList';

export const BuildPage = () => {
    const isComponentMounted = React.useRef(true);
    const [store, setStore] = useStore();

    useEffect(() => {
        if (isComponentMounted.current) { // make sure the component is loaded
            fetchDataList('melee');
            fetchDataList('armor');
            fetchDataList('ranged');
            fetchDataList('artifact');
        }
        return () => {
            isComponentMounted.current = false;
        };
    }, []);

    const fetchDataList = (slot) => {
        (async () => {
            try {
                const response = await fetch(baseUrl + slot);
                const jsonData = await response.json();
                setStore((old) => ({
                    ...old,
                    [slot]: jsonData,
                }));
            } catch (err) {
                throw new Error(err);                
            }
        })();
    }

    const setItem = (slot, item) => {
        setStore((old) => ({
            ...old,
            build: { ...store.build, [slot]: item },
        }));
        console.log(store.build);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Melee Weapon</Text>
            <Item slot="melee" data={store.build.melee} onChange={setItem} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Armor</Text>
            <Item slot="armor" data={store.build.armor} onChange={setItem} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Ranged Weapon</Text>
            <Item slot="ranged" data={store.build.ranged} onChange={setItem} />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 1</Text>
            <Item
                slot="artifactOne"
                data={store.build.artifactOne}
                onChange={setItem}
                isArtifact
            />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 2</Text>
            <Item
                slot="artifactTwo"
                data={store.build.artifactTwo}
                onChange={setItem}
                isArtifact
            />
            <Divider style={styles.divider} />
            <Text style={styles.label}>Artifact 3</Text>
            <Item
                slot="artifactThree"
                data={store.build.artifactThree}
                onChange={setItem}
                isArtifact
            />
        </ScrollView>
    );
};

const Item = ({ slot, data, onChange, isArtifact }) => {
    const [checked, setChecked] = React.useState(false);
    const [overlayVisible, setOverlayVisible] = React.useState(false);
    const [store] = useStore();

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    const setThisItem = (item) => {
        onChange(slot, item);
        toggleOverlay();
    };

    return (
        <View style={styles.item}>
            {store[slot] || (isArtifact && store['artifact']) ? (
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
                    {data.traits && (
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
