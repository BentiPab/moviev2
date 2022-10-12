import styled from "styled-components";
import { Formik, Field } from "formik";
import SearchInput from "./SearchInput";
import theme from "styleguide/theme";
import { searchSchema } from "./SearchValidation";
import Hamburger from "components/Hamburger/Hamburger";
import { HamburgerIcon } from './../Hamburger/Hamburger';

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

    return (
        <SearchbarContainer>
            <Formik
                validateOnChange
                validateOnBlur
                validationSchema={searchSchema}
                onSubmit={() => { }}
                initialValues={{
                    search: "",
                }}
            >
                {() => {
                    return (
                        <>
                            <Hamburger />
                            <Field
                                type="text"
                                maxLength={50}
                                component={SearchInput}
                                name="search"
                                placeholder={placeholder}
                                autoComplete="off"
                            />
                        </>
                    );
                }}
            </Formik>
        </SearchbarContainer>
    );
};

export default Searchbar;
