import { MaterialIcons } from '@expo/vector-icons'
import {
  Alert,
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  PresenceTransition,
  Pressable,
  Text,
  useClipboard,
  useToast,
  VStack,
} from 'native-base'
import React, { useState } from 'react'
import { Keyboard } from 'react-native'

import Header from '../../components/Header'
import { Translate } from '../../services'
import { useAppSelector } from '../../store/hooks'
import { styles } from './styles'

export default function Home() {
  const [request, setRequest] = useState<string>(null)
  const [result, setResult] = useState<string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const toast = useToast()
  const id = 'toast'
  const { onCopy } = useClipboard()
  const language = useAppSelector((state) => state.language.language)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if (!request || request.trim().length == 0) {
      setIsLoading(false)
      setShow(true)

      setTimeout(() => {
        setShow(false)
        return
      }, 2000)

      return
    }

    await Translate(request, language).then((response) => {
      setResult(response.trim())
    })

    setIsLoading(false)
  }

  return (
    <Pressable style={styles.Container} onPress={() => Keyboard.dismiss()}>
      <PresenceTransition
        visible={show}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 250,
          },
        }}
        style={{ width: '100%', position: 'absolute', zIndex: 1000 }}
      >
        <Alert
          w='100%'
          status='error'
          variant='left-accent'
          display='flex'
          flexDirection='row'
          justifyContent='center'
        >
          <Alert.Icon />
          <Text ml={2} fontWeight='bold' fontSize='md'>
            Texto digitado inválido!
          </Text>
        </Alert>
      </PresenceTransition>

      <VStack flex={1} space={8}>
        <PresenceTransition
          visible={true}
          initial={{
            translateX: -1000,
          }}
          animate={{
            translateX: 0,
            transition: {
              type: 'spring',
              mass: 0.8,
            },
          }}
        >
          <Header />
        </PresenceTransition>

        <PresenceTransition
          style={{ flex: 1 }}
          visible={true}
          initial={{
            translateY: 1000,
          }}
          animate={{
            translateY: 0,
            transition: {
              type: 'spring',
              delay: 500,
              mass: 0.5,
              damping: 20,
              stiffness: 100,
              duration: 0.5,
            },
          }}
        >
          <Box
            flex={1}
            bg={'white'}
            borderTopLeftRadius={32}
            borderTopRightRadius={32}
            padding={4}
            zIndex={10}
          >
            <VStack space={8}>
              <Text fontSize='xl' fontWeight={'bold'} textAlign={'center'}>
                Tradutor
              </Text>

              <Input
                h={'250px'}
                fontSize={'lg'}
                style={styles.textArea}
                placeholder='Digite o texto a ser traduzido'
                multiline={true}
                borderRadius={'md'}
                borderWidth={1}
                borderColor={'#203F6B'}
                variant={'filled'}
                onChangeText={(value) => setRequest(value)}
              />

              <Button
                w={'75%'}
                alignSelf={'center'}
                size={'lg'}
                bgColor={'#203F6B'}
                _text={{ color: 'white', fontWeight: 'bold', fontSize: 'md' }}
                leftIcon={
                  <Icon
                    as={MaterialIcons}
                    name='translate'
                    size={6}
                    color='white'
                  />
                }
                isLoading={isLoading}
                onPress={handleSubmit}
              >
                Traduzir
              </Button>

              <VStack>
                <Input
                  h={'250px'}
                  fontSize={'lg'}
                  style={styles.textArea}
                  placeholder='Tradução'
                  isReadOnly={true}
                  multiline={true}
                  borderRadius={'md'}
                  borderWidth={1}
                  borderColor={'#203F6B'}
                  variant={'filled'}
                  value={result}
                  InputRightElement={
                    <IconButton
                      variant={'solid'}
                      bgColor={'#203F6B'}
                      width={12}
                      alignSelf={'flex-end'}
                      onPress={() => {
                        onCopy(result)
                        if (!toast.isActive(id)) {
                          toast.show({
                            id,
                            title:
                              'Texto copiado para a área de transferência!',
                          })
                        }
                      }}
                      icon={
                        <Icon
                          as={MaterialIcons}
                          name='content-copy'
                          size={6}
                          color='white'
                        />
                      }
                    />
                  }
                />
              </VStack>
            </VStack>
          </Box>
        </PresenceTransition>
      </VStack>
    </Pressable>
  )
}
