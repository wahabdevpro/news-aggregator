import { Box, Container } from "@mui/material"

const PageWrapper = ({ children }) => {
    
    return (
        <Box key={"boxwrap"} sx={{ width: "100%", maxWidth: "100%"}}>
            <Container maxWidth={false} sx={{ width: "100%", maxWidth: '1000px' }}>
                {children}
            </Container>
        </Box>
    )

}

export default PageWrapper;