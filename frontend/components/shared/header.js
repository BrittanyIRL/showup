import styled from "styled-components";
import { Navigation } from "./";

const SiteHeader = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  height: 6rem;
  margin: 0;
  padding: 0 1rem 1rem;
  background-color: ${({ theme }) => theme.colors.red};
  display: flex;
  justify-items: space-between;
  flex-wrap: wrap;

  @media only screen and (max-width: 600px) {
    height: 8rem;
    justify-content: flex-start;
    align-items: flex-start;
    h1 {
      width: 100%;
      line-height: 6rem;
    }
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 4rem;
  line-height: 7rem;
  color: ${({ theme }) => theme.colors.blue};
  margin: 0 auto 0 0;
`;

export default function Header() {
  return (
    <SiteHeader>
      <Title>Show Up</Title>
      <Navigation />
    </SiteHeader>
  );
}
