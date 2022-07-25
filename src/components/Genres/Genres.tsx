import { Chip } from "@mui/material";
import { Genre } from "model/models";
import styled from "styled-components";

type Props = {
    genres: Genre[];
};

const GenresContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GenreChip = styled(Chip)`
  margin-right: 1em;
`;

const Genres: React.FC<Props> = ({ genres }) => {
    return (
        <div>
            <GenresContainer>
                {genres.map((genre) => (
                    <GenreChip
                        label={genre.name}
                        key={genre.id}
                        variant="filled"
                        color="info"
                    />
                ))}
            </GenresContainer>
        </div>
    );
};

export default Genres;
