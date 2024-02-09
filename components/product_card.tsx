import { config } from '@gluestack-ui/config';
import { Box, GluestackUIProvider, Text, Image, Link, VStack, Heading } from '@gluestack-ui/themed';
const Card = () => {
    return (   
      <Box
      maxWidth='$64'
      
      borderColor='$borderLight200'
      borderRadius='$lg'
      borderWidth='$1'
      my="$4"
      overflow="hidden"
      $base-mx="$5"
      $dark-bg="$backgroundDark900"
      $dark-borderColor="$borderDark800"
    >
      <Box>
        <Image
          h={150}
           width="100%"
          source={{
            uri: 'https://images.unsplash.com/photo-1549888834-3ec93abae044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
          }}        
        />
      </Box>
      <VStack px='$6' pt='$4' pb='$6'>
        <Text $dark-color="$textLight200" fontSize='$sm'  my='$1.5'>
        August 16, 2023
        </Text>
        <Heading $dark-color="$textLight200" size='sm'>
        Fresh Orange 
        </Heading>
        <Text my='$1.5' $dark-color="$textLight200" fontSize='$xs'>
          Oranges are a great source of vitamin C, which is essential for a healthy immune system. Oranges are a great source of vitamin C,
          which is important for maintaining a healthy immune system.
        </Text>
        <Text $dark-color="$textLight200" my='$1.5' fontSize='$xs' isTruncated="true">
        Vitamin C also helps with the absorption of iron and the production of collagen, which supports healthy skin, teeth, and bones.
        </Text>   
        <Link href="https://gluestack.io/" isExternal>
          <Text fontSize='$sm' color='$pink600'>
          Find out more
          </Text>
        </Link>
      </VStack>
    </Box>    
        ) 
  }