import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Pressable, LogBox } from 'react-native';
LogBox.ignoreAllLogs()

const Categoria = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  var categoria = route.params.categoria

  const getLugares = async () => {
    try {
      const response = await fetch('https://tabapi-andryamagua5-gmailcom.vercel.app/lugares/categoria/' + categoria);
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
      {isLoading ? <ActivityIndicator /> : (data.length == 0) ?
        (
          <Text>No hay lugares que mostrar</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => (
              <View style={{
                backgroundColor: "beige",
                borderWidth: 1,
                padding: 10
              }}>
                <Pressable
                  onPress={() => navigation.navigate('Lugar', { lugar: item })}
                >
                  <Text>{item.titulo}, {item.descripcion}</Text>
                </Pressable>
              </View>
            )}
          />
        )}
    </View>
  );
}

export default Categoria