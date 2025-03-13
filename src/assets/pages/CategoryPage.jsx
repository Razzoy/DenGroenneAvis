import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { ProductsByCategory } from "../components/ProductsByCategory/ProductsByCategory";
import { Splitter } from "../components/Splitter/Splitter";
import { MarginContainer } from "../components/MarginContainer/MarginContainer";

export function CategoryPage() {
  const { slug } = useParams();
  const { isLoading, data, error } = useGet(
    `http://localhost:4242/products/category/${slug}`
  );

  return (
    <>
      <Splitter />
      <MarginContainer>
        <GridContainer fraction={"1fr 1fr 1fr"} gap={"1rem"}>
          {!isLoading &&
            data?.data.map((product) => {
              return (
                <ProductsByCategory
                  key={product?.id}
                  img={product?.image}
                  price={product?.price}
                  name={product?.name}
                  description={product?.description}
                  link={`/products/${product?.slug}`}
                />
              );
            })}
        </GridContainer>
      </MarginContainer>
    </>
  );
}
