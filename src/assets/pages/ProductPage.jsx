import { useParams } from "react-router-dom";
import { MarginContainer } from "../components/MarginContainer/MarginContainer";
import { SingleProductCard } from "../components/SingleProductCard/SingleProductCard";
import { Splitter } from "../components/Splitter/Splitter";
import { useGet } from "../hooks/useGet";
import { CategoryList } from "../components/CategoryList/CategoryList";
import { CommentSection } from "../components/CommentSection/CommentSection";
import { useContext, useState } from "react";
import { Comments } from "../components/Comments/Comments";
import { UserContext } from "../context/UserContext";

export function ProductPage() {
  const { userToken } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const { slug } = useParams();
  const { isLoading, data, error } = useGet(
    `http://localhost:4242/products/${slug}`
  );
  const productID = data?.data?.id;


  function submitComment() {
    const body = new URLSearchParams();
    body.append("comment", newComment);

    const options = {
      method: "POST",
      body: body,
      headers: { Authorization: `Bearer ${userToken}` },
    };

    fetch(`http://localhost:4242/comment/${productID}`, options)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  //Jeg har lavet funktionaliteten, men har ikke nået at inkludere den ordenligt.
  function deleteComment(id) {
    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${userToken}` },
    };

    fetch(`http://localhost:4242/comment/${id}`, options)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `d. ${day}/${month} kl. ${hours}:${minutes}`;
  }

  return (
    <>
      <Splitter />
      <MarginContainer>
        <CategoryList urlSlug={slug} />
        {data && (
          <SingleProductCard
            img={data?.data.image}
            title={data?.data.name}
            text={data?.data.description}
            price={data?.data.price}
          />
        )}
      </MarginContainer>
      <Splitter />
      <MarginContainer>
        <CommentSection
          name={"comment"}
          action={setNewComment}
          placeholder={"Skriv en besked til sælger..."}
          id={"commentInput"}
        >
          <button onClick={() => submitComment()}>send</button>
          {!isLoading &&
            data?.data?.comments?.map((item) => {
              return (
                <>
                  <Comments
                    user={`${item.user?.firstname} ${formatDate(
                      item.createdAt
                    )}`}
                    comment={item.comment}
                    onDelete={() => deleteComment()}
                    // buttonTitle={'Slet kommentar'} 
                  />
                </>
              );
            })}
        </CommentSection>
      </MarginContainer>
    </>
  );
}
