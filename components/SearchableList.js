import React from 'react';
import {
    ActivityIndicator,
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native';

export const SearchableList = ({
    data = [{ name: '' }],
    onSelection = () => {},
}) => {
    const [itemList, setItemList] = React.useState(data);
    const [filterText, setFilterText] = React.useState('');

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => onSelection(item)}>
                <Text style={{ fontSize: 24 }}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const handleChangeText = (text) => {
        setFilterText(text);
        setItemList(
            data.filter((item) =>
                item.name.toUpperCase().includes(text.toUpperCase())
            )
        );
    };

    return (
        <View style={{ alignItems: 'center' }}>
            <TextInput
                style={{ fontSize: 30 }}
                placeholder="Search"
                value={filterText}
                onChangeText={(text) => handleChangeText(text)}
            />
            {itemList ? (
                <FlatList
                    data={itemList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <ActivityIndicator />
            )}
        </View>
    );
};
