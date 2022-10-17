import styled from "styled-components";
import theme from "styleguide/theme";
import { validateSearch } from "./SearchValidation";
import Hamburger from "components/Hamburger/Hamburger";
import { HamburgerIcon } from "./../Hamburger/Hamburger";
import { useNavigate } from "react-router-dom";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import notificationsActions from 'features/notifications/actions';
import useThunkDispatch from './../../hooks/useThunkDispatch';
import { ValidationError } from "yup";
import Select from '../Common/Select';

const StyledInput = styled(InputBase)`
  background-color: ${theme.palette.background.default};
  border: none;
  width: 100%;
  border-radius: 10px;
  padding: 0 10px;

  &:focus {
    outline: none;
  }

  .MuiInputBase-input {
    color: ${theme.palette.common.white};
    padding: 0 10px;

    &::placeholder {
      text-transform: capitalize;
      color: ${theme.palette.common.white};
    }
  }

  svg {
    opacity: 0.5;
    color: ${theme.palette.common.white};
  }

  ${theme.breakpoints.up("md")} {
    width: 50%;
    height: 50%;
  }
`;

const SearchbarContainer = styled.div`
  position: sticky;
  top: 0;
  grid-area: search;
  background-color: ${theme.palette.common.black};
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  justify-content: center;

  svg {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }

  ${HamburgerIcon} {
    display: none;
  }

  ${theme.breakpoints.down("md")} {
    min-height: 50px;
    gap: 1em;
    padding: 0 15px 0 5px;

    ${HamburgerIcon} {
      display: inline-block;
    }
  }
`;

const Searchbar = () => {
  const placeholder = "search movies, tv shows, persons, etc...";
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const [queryType, setQueryType] = useState<string>('movie');
  const navigate = useNavigate();

  const dispatch = useThunkDispatch()

  const handleSearch = async (ev: any) => {
    if (ev.key === "Enter" && !!searchQuery) {
      try {
        await validateSearch(searchQuery)
        setSearchQuery("");
        navigate(`/search?query=${searchQuery}&queryType=${queryType}`);
      } catch (err) {

        dispatch(notificationsActions.addErrorNotification((err as ValidationError).errors[0], true))
      }
    }
  };

  const selectOptions = [{
    label: 'Movie',
    value: 'movie'
  }, { label: 'Tv Show', value: 'tv' }]

  return (
    <SearchbarContainer>
      <Hamburger />
      <StyledInput
        value={searchQuery}
        startAdornment={<SearchIcon />}
        onKeyDown={handleSearch}
        placeholder={placeholder}
        onChange={(ev) => {
          setSearchQuery(ev.target.value);
        }}
        endAdornment={<Select options={selectOptions} value={queryType} onChange={(ev) => {
          setQueryType(ev.target.value as string)
        }} />}
      />
    </SearchbarContainer>
  );
};

export default Searchbar;
