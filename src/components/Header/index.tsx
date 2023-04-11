import { HStack, Select, Text, View, VStack } from 'native-base'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { languages } from '../../Languages'
import { setLanguage } from '../../store/language/slice'
import { styles } from './styles'
import React from 'react'

export default function Header() {
  const language = useAppSelector((state) => state.language.language)
  const dispatch = useAppDispatch()

  return (
    <View>
      <HStack justifyContent={'center'} mt={4}>
        <VStack w={'90%'} space={4}>
          <Text style={styles.Text} fontSize='xl'>
            Escolha o idioma
          </Text>
          <Select
            shadow={3}
            placeholder='Selecione o idioma'
            w={'90%'}
            alignSelf={'center'}
            backgroundColor={'white'}
            fontSize={'md'}
            _selectedItem={{
              bg: '#ddd',
            }}
            selectedValue={language}
            onValueChange={(value) => dispatch(setLanguage(value))}
          >
            {languages.map((language) => (
              <Select.Item key={language} label={language} value={language} />
            ))}
          </Select>
        </VStack>
      </HStack>
    </View>
  )
}
