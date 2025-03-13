import { MarginContainer } from "../components/MarginContainer/MarginContainer";
import { Splitter } from "../components/Splitter/Splitter";

export function ProductPage() {
  return (
    <>
      <Splitter />
      <MarginContainer>
        <h2>PRODUCT HERE</h2>
      </MarginContainer>
      <Splitter />
      <MarginContainer>
        <h2>CONTACT SELLER HERE</h2>
      </MarginContainer>
    </>
  );
}
