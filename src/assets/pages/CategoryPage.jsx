import { useParams } from "react-router-dom"
import { useGet } from "../hooks/useGet";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { ProductsCategory } from "../components/ProductsCategory/ProductsCategory";

export function CategoryPage() {

  const { slug } = useParams();
  const {isLoading, data, error} = useGet(`http://localhost:4242/products/category/${slug}`)
  

  return (
    <GridContainer fraction={'1fr 1fr 1fr'}>
      {!isLoading && data?.data.map((product) => {
        return(
          <ProductsCategory
          key={product?.id}
          img={product?.image}
          price={product?.price}
          name={product?.name}
          description={product?.description}
          link={`/products/${product?.slug}`}
           />
        )
      })}
    </GridContainer>
  )
}
