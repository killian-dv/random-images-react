import { useEffect, useState } from "react";
import s from "./App.module.css";
import { ImageList } from "./components/ImageList/ImageList";
import { useScrollPosition } from "./hooks/useScrollPosition";
import axios from "axios";

export function App() {
  const [imageList, setImageList] = useState([]);
  const { isBottom } = useScrollPosition();
  const [pageToFetch, setPageToFetch] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchImagesByPage(pageToFetch);
  }, [pageToFetch]);

  useEffect(() => {
    if (isBottom) {
      console.log("On est en bas, increment de la page !");

      incrementPage();
    }
  }, [isBottom]);
  async function fetchImagesByPage(page) {
    setIsLoading(true);
    const { data } = await axios(
      `https://picsum.photos/v2/list?page=${page}&limit=5`
    );
    setImageList([...imageList, ...data]);
    setIsLoading(false);
  }

  function incrementPage() {
    setPageToFetch(pageToFetch + 1);
  }

  return (
    <div className={s.root}>
      <h1>Rand'images</h1>
      <h2>Télécharge des images open sources aléatoires</h2>
      <ImageList imgList={imageList} />
      {isLoading && <div className="spinner-border" role="status" />}
    </div>
  );
}
