import { Container, DefaultTitle, WrapperLogo } from './styles';
import { LogoSANVI } from '@assets/svgs/LogoSANVI';


export function GenericHeader() {
  return (
    <Container>
        <DefaultTitle>
            SANVI - Gestão clínica
        </DefaultTitle>
        <WrapperLogo>
            <LogoSANVI
                height='55'
                width='55'
            />
        </WrapperLogo>

    </Container>
  );
}