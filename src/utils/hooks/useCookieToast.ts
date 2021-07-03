import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const useCookieToast = (): void => {
  const toast = useToast();
  useEffect(() => {
    if (typeof localStorage.getItem('cookies') !== 'string') {
      toast({
        id: 'cookies',
        title: 'Cookies',
        description:
          'Utilizamos cookies para melhorar sua experiência. Ao continuar a utilizar nosso website, você concorda com seu uso.',
        status: 'info',
        duration: null,
        isClosable: true,
        onCloseComplete: () => localStorage.setItem('cookies', 'shown'),
      });
    }
  }, [toast]);
};

export default useCookieToast;
