import { ReactNode } from 'react';
import Image from 'next/image';
import { AuthWrapper, StyledHeader, FlexImage } from './StyledAuth';
import { useRouter } from 'next/router';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const router = useRouter();
    return (
        <AuthWrapper>
            <StyledHeader >
                <FlexImage>
                    <Image src="/tachVaultlogo.png" alt="logo" width={130} height={50} onClick={()=>{router.push("/")}}/>
                </FlexImage>
            </StyledHeader>
             {children}
        </AuthWrapper>
    );
}

export default AuthLayout;
