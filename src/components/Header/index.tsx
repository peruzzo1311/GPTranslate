import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Slide,
  VStack,
  Text,
} from 'native-base'
import React from 'react'

import { languages } from '../../Languages'
import { setContext } from '../../store/context/slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setLanguage } from '../../store/language/slice'
import { setTargetLanguage } from '../../store/targetLanguage/slice'

export default function Header() {
  const language = useAppSelector((state) => state.language.language)
  const targetLanguage = useAppSelector(
    (state) => state.targetLanguage.targetLanguage
  )
  const context = useAppSelector((state) => state.context.context)
  const dispatch = useAppDispatch()

  return (
    <VStack m={4} space={4}>
      <HStack>
        <Box w={'100%'}>
          <Button
            ml={-12}
            variant={'Unstyled'}
            _text={{ color: 'white', fontWeight: 'bold', fontSize: '3xl' }}
            leftIcon={
              <Icon
                as={MaterialIcons}
                name='translate'
                size={8}
                color='white'
              />
            }
          >
            GPTranslate
          </Button>
        </Box>
      </HStack>
      <HStack space={4} justifyContent={'center'} alignContent={'center'}>
        <Box width={'40%'}>
          <Select
            shadow={3}
            placeholder='Idioma de origem'
            backgroundColor={'white'}
            fontSize={'md'}
            _selectedItem={{
              bg: '#eee',
              disabled: true,
            }}
            selectedValue={language}
            onValueChange={(value) => dispatch(setLanguage(value))}
          >
            {languages.map((language) => (
              <Select.Item key={language} label={language} value={language} />
            ))}
          </Select>
        </Box>

        <Box alignContent={'center'}>
          <IconButton
            variant={'solid'}
            borderRadius='full'
            bgColor={'white'}
            icon={
              <Icon
                as={Ionicons}
                name='swap-horizontal'
                size={6}
                color={'black'}
              />
            }
            onPress={() => {
              dispatch(setLanguage(targetLanguage))
              dispatch(setTargetLanguage(language))
            }}
          />
        </Box>

        <Box width={'40%'}>
          <Select
            shadow={3}
            placeholder='Idioma de destino'
            backgroundColor={'white'}
            fontSize={'md'}
            _selectedItem={{
              bg: '#eee',
              disabled: true,
            }}
            selectedValue={targetLanguage}
            onValueChange={(value) => dispatch(setTargetLanguage(value))}
          >
            {languages.map((language) => (
              <Select.Item key={language} label={language} value={language} />
            ))}
          </Select>
        </Box>
      </HStack>

      <HStack>
        <Box w={'100%'}>
          <Input
            variant={'filled'}
            placeholder='Insira um contexto para tradução'
            fontSize={'lg'}
            shadow={3}
            _focus={{
              bgColor: '#eee',
            }}
            value={context}
            onChangeText={(value) => dispatch(setContext(value))}
          />
        </Box>
      </HStack>
    </VStack>
  )
}
