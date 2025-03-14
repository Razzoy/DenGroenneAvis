import { Splitter } from "../components/Splitter/Splitter";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useGet } from "../hooks/useGet";
import { InputField } from "../components/InputField/InputField";
import style from "./pageStyling/ListingPage.module.scss";

export function ListingPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const { userToken } = useContext(UserContext);
  const { data, isLoading } = useGet("http://localhost:4242/categories");
  const [category, setCategory] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  function handleCategory(e) {
    setCategory(e.target.value);
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleImageUrlChange(e) {
    setImageUrl(e.target.value);
  }
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  const priceAsInt = parseInt(price, 10);
  const selectedCategory = data?.data?.find((item) => item.slug === category);
  const categoryId = selectedCategory ? selectedCategory.id : null;

  function formValidation() {
    if (
      isNaN(priceAsInt) ||
      priceAsInt <= 0 ||
      title.trim().length < 3 ||
      imageUrl.trim() === "" ||
      !imageUrl.startsWith("https://") ||
      description.trim().length < 3 ||
      categoryId === null
    ) {
      return false;
    }

    return true;
  }

  function submitListing(e) {
    e.preventDefault();

    setValidationMessage("");

    if (!formValidation()) {
      setValidationMessage("Alle felter skal være udfyldt korrekt!");
      return;
    }

    const body = {
      name: title,
      image: imageUrl,
      description: description,
      price: priceAsInt,
      category_id: categoryId,
    };

    console.log(body); // For debugging

    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    fetch(`http://localhost:4242/products`, options)
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Record created") {
          setValidationMessage("Annoncen er oprettet!");
        } else {
          setValidationMessage("Noget gik galt, prøv igen");
        }
      })
      .catch((error) => {
        console.log("error", error);
        setValidationMessage("Noget gik galt, prøv igen");
      });
  }

  return (
    <>
      <Splitter />
      <div className={style.listingHeader}>
        <h2>Opret ny annonce</h2>
        <p>Her kan du oprette en ny annonce.</p>
        <p>
          Du har mulighed for at slette dine annoncer igen under “min konto”
          siden
        </p>
      </div>
      <form className={style.listingFormContainer} onSubmit={submitListing}>
        <InputField
          labelText="Titel"
          type="text"
          placeholder="Titel på dit produkt..."
          id="title"
          value={title}
          actionListing={handleTitleChange}
        />
        <select value={category} onChange={handleCategory}>
          <option disabled value={""}>
            vælg kategori
          </option>
          {!isLoading &&
            data?.data?.map((item) => {
              return (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              );
            })}
        </select>
        <label htmlFor="description">Annonce Tekst</label>
        <textarea
          id="description"
          placeholder="Skriv en annonce tekst her der beskriver produktet"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>

        <InputField
          labelText="URL til billede"
          type="text"
          placeholder="Har du et billede som ligger på nettet kan du indsætte en URL her..."
          id="url"
          value={imageUrl}
          actionListing={handleImageUrlChange}
        />
        <InputField
          labelText="Pris"
          type="number"
          placeholder="Vælg en pris..."
          id="price"
          value={price}
          actionListing={handlePriceChange}
        />
        <div className={style.validationSubmitContainer}>
          {validationMessage && (
            <p
              className={
                validationMessage === "Annoncen er oprettet!"
                  ? style.success
                  : style.error
              }
            >
              {validationMessage}
            </p>
          )}
          <button type="submit">Opret</button>
        </div>
      </form>
    </>
  );
}
