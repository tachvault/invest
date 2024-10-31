// Import neccessary modules
import { ReactNode } from 'react';
import Image from 'next/image';

// Import styled components for layout and styling
import { AuthWrapper, StyledHeader, FlexImage } from './StyledAuth';

// Import the router hook for navigation
import { useRouter } from 'next/router';

// Define the interface for the AuthLayout component's props
interface AuthLayoutProps {
    children: ReactNode; // Children prop to render the main content
}

// Define the AuthLayout component as a functional component
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    // Get the router instance for navigation
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
