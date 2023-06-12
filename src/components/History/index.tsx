import {
  Box,
  Icon,
  IconButton,
  ScrollView,
  Slide,
  Text,
  View,
} from 'native-base'
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Dimensions, Pressable } from 'react-native'
import { useAppSelector } from '../../store/hooks'

export default function History() {
  const history = useAppSelector((state) => state.history.history)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.log(history)
  }, [history])

  const handlePress = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <IconButton
        shadow={2}
        variant={'solid'}
        h={12}
        bgColor={'#203F6B'}
        onPress={handlePress}
        icon={
          <Icon as={MaterialIcons} name='history' size={7} color={'white'} />
        }
      />

      <Slide in={isOpen} placement='left' duration={300}>
        <View
          bgColor={'#203F6B'}
          w={Dimensions.get('window').width}
          h={'100%'}
          p={4}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text color={'white'} fontSize={'2xl'} fontWeight={'bold'}>
              Histórico
            </Text>

            <IconButton
              variant={'unstyled'}
              h={12}
              w={12}
              onPress={handlePress}
              icon={
                <Icon
                  as={MaterialIcons}
                  name='close'
                  size={8}
                  color={'white'}
                />
              }
            />
          </Box>

          <ScrollView mt={4}>
            {history.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: 150,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  padding: 12,
                  marginVertical: 12,
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <Text fontSize={'xl'}>{item.idiomaOrigem}</Text>

                    <Icon
                      as={FontAwesome5}
                      name='arrow-right'
                      size={4}
                      color={'black'}
                    />

                    <Text fontSize={'xl'}>{item.idiomaDestino}</Text>
                  </Box>

                  <Box>
                    <IconButton
                      variant={'unstyled'}
                      h={12}
                      onPress={() => console.log('clicou')}
                      icon={
                        <Icon
                          as={Ionicons}
                          name='ellipsis-vertical'
                          size={6}
                          color={'black'}
                        />
                      }
                    />
                  </Box>
                </Box>

                <Box>
                  <Text fontSize={'lg'}>{item.textoOrigem}</Text>
                  <Text fontSize={'lg'} color={'gray.500'}>
                    {item.textoDestino}
                  </Text>
                </Box>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Slide>
    </>
  )
}
