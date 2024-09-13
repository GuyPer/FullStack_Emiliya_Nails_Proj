import React, { createContext, useState, useEffect } from "react";

interface LikedProductContextType {
  likedProducts: (id: string) => void;
  likedProductsArray: string[];
  isLiked: boolean;
  resetLikedArr: () => void;
  initializeLikedArray: () => void;
}

export const LikedProductsContext = createContext<
  LikedProductContextType | undefined
>(undefined);

export default function LikedProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = localStorage.getItem("userId");
  const [isLiked, setIsLiked] = useState(false);
  const [likedProductsArray, setLikedProductsArray] = useState<string[]>([]);

  useEffect(() => {
    initializeLikedArray();
  }, [userId]);

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem(`${userId}`, JSON.stringify(likedProductsArray));
    }
  }, [likedProductsArray, userId]);

  const likedProducts = (id: string) => {
    setLikedProductsArray((prevLikedProductsArray) => {
      const updatedArray = prevLikedProductsArray.includes(id)
        ? prevLikedProductsArray.filter((productId) => productId !== id)
        : [...prevLikedProductsArray, id];

      localStorage.setItem("likedProductsArray", JSON.stringify(updatedArray));
      if (!localStorage.getItem(`${userId}`)) {
        localStorage.setItem(`${userId}`, JSON.stringify(updatedArray));
      }
      if (userId !== null) {
        localStorage.setItem(`${userId}`, JSON.stringify(updatedArray));
      }
      setIsLiked(updatedArray.includes(id));
      return updatedArray;
    });
  };

  const resetLikedArr = () => {
    localStorage.removeItem("likedProductsArray");
  };

  const initializeLikedArray = () => {
    const likedArrayOfUser = localStorage.getItem(`${userId}`);
    if (likedArrayOfUser) {
      setLikedProductsArray(JSON.parse(likedArrayOfUser));
    }
  };

  return (
    <LikedProductsContext.Provider
      value={{
        likedProducts,
        likedProductsArray,
        isLiked,
        resetLikedArr,
        initializeLikedArray,
      }}
    >
      {children}
    </LikedProductsContext.Provider>
  );
}
