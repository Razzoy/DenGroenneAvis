
import style from "./pageStyling/FrontPage.module.scss"
import { Card } from "../components/Card/Card";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { Section } from "../components/Section/Section";
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
      <h2 className={style.sectionTitle}>Udvalgte Produkter</h2>
      <GridContainer fraction={"1fr 1fr 1fr 1fr 1fr 1fr"} gap={"1rem"}>
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
                  path={`/products/${product.slug}`}
                />
              );
            })}
      </GridContainer>
      <Splitter />
      <Section
        imagePath={"/Images/banner_image1.webp"}
        isMain={"true"}
        title={"Den Grønne Avis"}
        text={
          "Vi går forest i kampen om klimaet ved at give 2 kr. til klima-venlige formål, hver gang du handler brugt på Den Grønne Avis"
        }
      />
      <Splitter />
      <h2 className={style.sectionTitle}>Populære Kategorier</h2>
      <GridContainer fraction={"1fr 1fr 1fr 1fr 1fr 1fr"} gap={"1rem"}>
        {!catIsLoading &&
          catData?.data?.slice(0, 6).map((cat) => {
            return (
              <Card
                key={cat.id}
                imageSrc={cat.category_image}
                alt={cat.slug}
                title={cat.name}
                top={"true"}
                path={`/products/category/${cat.slug}`}
              />
            );
          })}
      </GridContainer>
      <Splitter />
      <GridContainer fraction={"1fr 1fr"} gap={"2rem"}>
        <Section
          imagePath={"/Images/banner_image2.jpg"}
          title={"Donationer til Dato"}
          text={
            "Sammen med dig har vi siden starten indsamlet:"
          }
        >
          <h4>452.231,50 kr</h4>
          <p>Tak fordi du handler brugt, med omtanke for klimaet</p>
        </Section>
        <Section
          imagePath={"/Images/banner_image3.jpg"}
          title={"Donationer i år"}
          text={
            "Sammen med dig har vi i år indsamlet:"
          }
        >
          <h4>112.452,75 kr</h4>
          <p>Tak fordi du handler brugt, med omtanke for jorden</p>
        </Section>
      </GridContainer>
    </div>
  );
}
