import { Card } from "../components/Card/Card";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { Splitter } from "../components/Splitter/Splitter";
import { useGet } from "../hooks/UseGet";

export function FrontPage() {
  //fetch products
  const { data: pData, isLoading: pIsLoading } = useGet(
    "http://localhost:4242/products"
  );
  //fetch categories
  const { data: catData, isLoading: catIsLoading } = useGet(
    "http://localhost:4242/categories"
  );

  return (
    <div>
      <Splitter />
      <GridContainer fraction={'1fr 1fr 1fr 1fr 1fr 1fr'} gap={'1rem'}>
        {!pIsLoading &&
          pData?.data
            ?.sort(() => Math.random() - 0.5)
            .slice(0, 6)
            .map((product) => {
              return (
                <Card
                  key={product.id}
                  imageSrc={product.image}
                  alt={product.slug}
                  title={product.name}
                />
              );
            })}
      </GridContainer>
      <Splitter />
      Section 1
      <Splitter />
      <GridContainer fraction={'1fr 1fr 1fr 1fr 1fr 1fr'} gap={'1rem'}>
      {!catIsLoading &&
        catData?.data?.slice(0, 6).map((cat) => {
          return (
            <Card
              key={cat.id}
              imageSrc={cat.category_image}
              alt={cat.slug}
              title={cat.name}
            />
          );
        })}
        </GridContainer>
      <Splitter />
       Section 2
    </div>
  );
}
