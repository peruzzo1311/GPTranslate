import { MaterialIcons } from '@expo/vector-icons'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import {
  Alert,
  Box,
  Button,
  HStack,
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
import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import * as FileSystem from 'expo-file-system'

import Header from '../../components/Header'
import { Transcription, Translate } from '../../services'
import { useAppSelector } from '../../store/hooks'
import { styles } from './styles'

const RECORDING_OPTIONS = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.AndroidOutputFormat.MPEG_4,
    audioEncoder: Audio.AndroidAudioEncoder.AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    audioQuality: Audio.IOSAudioQuality.HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
}

export default function Home() {
  const [request, setRequest] = useState<string>(null)
  const [result, setResult] = useState<string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState({ show: false, title: '' })
  const toast = useToast()
  const id = 'toast'
  const { onCopy } = useClipboard()
  const language = useAppSelector((state) => state.language.language)
  const targetLanguage = useAppSelector(
    (state) => state.targetLanguage.targetLanguage
  )
  const context = useAppSelector((state) => state.context.context)

  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recording, setRecording] = useState<Audio.Recording | null>(null)

  useEffect(() => {
    Audio.requestPermissionsAsync().then(({ granted }) => {
      if (granted) {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: true,
        })
      }
    })
  }, [])

  const startRecording = async () => {
    try {
      const { granted } = await Audio.getPermissionsAsync()

      if (granted) {
        setIsRecording(true)
        const { recording } = await Audio.Recording.createAsync(
          RECORDING_OPTIONS
        )

        setRecording(recording)
      }
    } catch (err) {
      console.log(err)
      setIsRecording(false)
      setError({ show: true, title: 'Erro ao começar a gravação' })
      setTimeout(() => {
        setError({ show: false, title: '' })
      }, 2000)
    }
  }

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync()
      setIsRecording(false)

      setIsLoading(true)
      const uri = recording.getURI()
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      await Transcription(base64)
        .then((response) => {
          setRequest(response)

          return response
        })
        .then(async (request: string) => {
          await Translate({ request, language, targetLanguage, context })
            .then((response) => {
              if (response) {
                setResult(response.trim())
              } else {
                setError({
                  show: true,
                  title: 'Não foi possível traduzir no momento!',
                })
                setTimeout(() => {
                  setError({ show: false, title: '' })
                }, 2000)
              }
            })
            .catch((err) => {
              setIsLoading(false)

              console.log(err)
            })

          setIsLoading(false)
        })
    } catch (err) {
      console.log(err)
      setIsRecording(false)
      setError({ show: true, title: 'Erro ao capturar a gravação' })
      setTimeout(() => {
        setError({ show: false, title: '' })
      }, 2000)
    } finally {
      setIsRecording(false)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if (!request || request.length == 0) {
      setIsLoading(false)
      setError({ show: true, title: 'Digite um texto para ser traduzido' })
      setTimeout(() => {
        setError({ show: false, title: '' })
      }, 2000)
      return
    }

    await Translate({ request, language, targetLanguage, context })
      .then((response) => {
        if (response) {
          setResult(response.trim())
        } else {
          setError({
            show: true,
            title: 'Não foi possível traduzir no momento!',
          })
          setTimeout(() => {
            setError({ show: false, title: '' })
          }, 2000)
        }
      })
      .catch((err) => {
        setIsLoading(false)

        console.log(err)
      })

    setIsLoading(false)
  }

  return (
    <Pressable style={styles.Container} onPress={() => Keyboard.dismiss()}>
      <PresenceTransition
        visible={error.show}
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
            {error.title}
          </Text>
        </Alert>
      </PresenceTransition>

      <VStack flex={1} space={4}>
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
            <VStack space={4}>
              <Input
                fontSize={'lg'}
                style={styles.textArea}
                shadow={2}
                placeholder='Digite o texto a ser traduzido'
                multiline={true}
                borderRadius={'md'}
                borderWidth={1}
                borderColor={'#203F6B'}
                variant={'filled'}
                _focus={{
                  bgColor: '#eee',
                }}
                value={request}
                onChangeText={(value) => setRequest(value)}
              />

              <HStack
                justifyContent={'center'}
                alignContent={'center'}
                space={4}
              >
                <Button
                  w={'70%'}
                  bgColor={'#203F6B'}
                  shadow={2}
                  h={12}
                  _text={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 'lg',
                  }}
                  leftIcon={
                    <Icon
                      as={MaterialIcons}
                      name='translate'
                      size={6}
                      color='white'
                    />
                  }
                  isLoading={isLoading || isRecording}
                  isLoadingText={isRecording ? 'Gravando...' : 'Traduzindo...'}
                  onPress={handleSubmit}
                >
                  Tradução
                </Button>

                <IconButton
                  shadow={2}
                  variant={'solid'}
                  h={12}
                  bgColor={isRecording ? 'red.500' : '#203F6B'}
                  onPress={isRecording ? stopRecording : startRecording}
                  icon={
                    <Icon
                      as={MaterialIcons}
                      name={'mic'}
                      size={7}
                      color='white'
                    />
                  }
                />
              </HStack>

              <VStack>
                <Input
                  shadow={2}
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
