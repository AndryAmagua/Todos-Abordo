import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const Categoria = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getLugares = async () => {
    try {
      const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/lugares/categoria/' + props.route.name);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getLugares();
  }, []);

  return (
    <View style={{ padding: 24 }}>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item }) => (
            <View style={{
              backgroundColor: "beige",
              borderWidth: 1,
              padding: 10 }}>
              <Text>{item.titulo}, {item.descripcion}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

export default Categoria