import { Typography, TypographyProps } from "@mui/material";
import styled from "styled-components";

type SubtitleProps = TypographyProps & {
    subtitle: string;
};

const StyledTypography = styled(Typography)`
  padding-left: 0.5rem;
`;

const Subtitle: React.FC<SubtitleProps> = ({ subtitle, ...props }) => {
    return (
        <StyledTypography variant="h4" {...props}>
            {subtitle}
        </StyledTypography>
    );
};

export default Subtitle;
