import { Img, ImgProps } from '@chakra-ui/react';

import GrixAlphaLogoImg from './svgLogs/GrixAlphaLogo.svg';
import GrixLogoImg from './svgLogs/GrixLogoImg.svg';

export const GrixLogo = (props: ImgProps) => <Img src={GrixLogoImg} alt="Logo" w="48px" {...props} />;
export const GrixAlphaLogo = (props: ImgProps) => <Img src={GrixAlphaLogoImg} alt="Logo" w="76px" {...props} />;
